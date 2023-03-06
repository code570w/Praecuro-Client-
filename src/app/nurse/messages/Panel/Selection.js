import React, {useRef, useState} from 'react';
import './Panel.sass';
import {useDispatch, useSelector} from "react-redux";
import {
    FiPhoneCall,
    FiPhoneOff,
    FiPlusCircle,
    FiMinusCircle,
} from "react-icons/fi";
// import Views from "../../variables/Views";
// import View from "../../variables/actions/View";
// import Actions from "../../variables/actions/Actions";
// import {setupListenersSaga} from "../../sagas/rtc";
// import Config from "../../config";

const Selection = ({type}) => {
    const dispatch = useDispatch();

    const id = useSelector(state => state.user.id);
    const search = useSelector(state => state.search);
    const favorites = useSelector(state => state.user.favorites);
    const peers = useSelector(state => state.rtc.peers);
    const online = useSelector(state => state.status.online);
    const away = useSelector(state => state.status.away);

    const isPeer = (user) => {
        let result = false;
        for (let el of peers) {
            if (el === user._id) result = true;
        }
        return result;
    };

    const isAvailable = (user) => {
        let result = false;
        for (let el of online) {
            if (el === user._id) result = true;
        }
        for (let el of away) {
            if (el === user._id) result = true;
        }
        return result;
    };

    const [selection, setSelection] = useState([]);
    const [selectionArray, setSelectionArray] = useState([]);
    const [tab, setTab] = useState(0);
    const [error, setError] = useState(false);

    let list;
    let favoriteUsers = [];

    const Picture = ({user}) => {
        // if (user.picture)
        //     return <img src={`${Config.url || ''}/api/images/${user.picture.shieldedID}/256`} alt="Picture" />;
        // else
            return <div className="img">{user.firstName.substr(0,1)}{user.lastName.substr(0,1)}</div>;
    };

    const removeFromArray = (array, element) => {
        let result = [...array];
        result.splice(result.indexOf(element), 1);
        return result;
    };

    const removeFromSelectionArray = (array, element) => {
        let result = [...array];
        let i = 0;
        let found = false;
        while (i < result.length && !found) {
            if (element === array[i]._id) {
                result.splice(i, 1);
                found = true;
            }
            i++;
        }
        return result;
    };

    if (tab) {
        favorites.forEach(favorite => {
            if (!favorite.isGroup) {
                favorite.people.forEach(person => person._id !== id && favoriteUsers.push(person));
            }
        })
    }

    const getIcon = (selected, user) => {
        if (type === 'RTC_ADD_USERS') {
            if (isPeer(user)) return <FiPhoneCall style={{color: 'gray'}} />;
            if (!isAvailable(user)) return <FiPhoneOff style={{color: 'gray'}} />
        }
        return selected ? <FiMinusCircle/> : <FiPlusCircle/>;
    };

    const select = (user, selected) => {
        if (type === 'RTC_ADD_USERS' && (isPeer(user) || !isAvailable(user))) return;
        setSelection(selected ? removeFromArray(selection, user._id) : [...selection, user._id]);
        setSelectionArray(selected ? removeFromSelectionArray(selection, user._id) : [...selection, user])
    };

    if (tab || typeof search.users === 'object') {
        list = (tab ? favoriteUsers : search.users).map(user => {
            const selected = selection.includes(user._id);
            return (
                <div key={user._id} className="group-entry" onClick={() => select(user, selected)}>
                    <div className="picture">
                        <Picture user={user} />
                    </div>
                    <div className="text">
                        <div className="title">{user.firstName} {user.lastName}</div>
                        <div className="message">@{user.username}</div>
                    </div>
                    <div className={`indicator ${selected ? 'active' : 'inactive'}`}>
                        {getIcon(selected, user)}
                    </div>
                </div>
            )
        })
    }

    const createGroup = e => {
        e.preventDefault();
        if (selection.length === 0) return setError(true);
        setError(null);
        dispatch({ type: 'SELECTION_SET_PEOPLE', people: selection });
        dispatch({ type: 'NAVIGATE', nav: 'CREATE_GROUP_2' });
    };

    const rtcAddUsers = e => {
        e.preventDefault();
        dispatch({ type: 'RTC_ADD_SELECTED', users: selectionArray });
        dispatch({ type: 'NAVIGATE', nav: 'CHAT' });
    };

    const getTitle = () => {
        if (type === 'RTC_ADD_USERS') return 'Add To Call';
        return 'Create Group';
    };

    return (
        <div className="list-wrapper">
            <ul className="uk-tab-bottom panel-tabs" data-uk-tab={true}>
                <li className="uk-active" onClick={() => setTab(0)}><a href="#">All</a></li>
                <li onClick={() => setTab(1)}><a href="#">Favorites</a></li>
            </ul>
            <div className="list">
                {list}
            </div>
            <div className="selection-text error" hidden={selection.length !== 0 || !error}>
                You must select some people!
            </div>
            <div className="selection-text" hidden={selection.length === 0}>
                {selection.length} selected - <a onClick={() => setSelection([])}>Clear</a>
            </div>
            <button className="uk-margin-remove uk-button uk-button-large uk-button-primary" onClick={type === 'RTC_ADD_USERS' ? rtcAddUsers : createGroup}>{getTitle()}</button>
        </div>
    );
};

export default Selection;
