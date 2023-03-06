import React from 'react';
import './Panel.sass';
import {useDispatch, useSelector} from "react-redux";
// import Actions from "../../variables/actions/Actions";
// import Config from "../../config";

const Panel = () => {
    const dispatch = useDispatch();

    const search = useSelector(state => state.search);

    let list;

    const Picture = ({user}) => {
        // if (user.picture)
        //     return <img src={`${Config.url || ''}/api/images/${user.picture.shieldedID}/256`} alt="Picture" />;
        // else
            return <div className="img">{user.firstName.substr(0,1)}{user.lastName.substr(0,1)}</div>;
    };

    const notice = () => {
        if (typeof search.users !== 'object' || search.users.length === 0) return (
            <div className="notice-text">
                There are no results matching {search.text}.
            </div>
        );
        else return null;
    };

    if (typeof search.users === 'object') {
        list = search.users.map(user => {
            return (
                <div key={user._id} className="entry" onClick={() => dispatch({type: 'CREATE_ROOM', counterpart: user._id})}>
                    <div className="picture">
                        <Picture user={user} />
                    </div>
                    <div className="text">
                        <div className="title">{user.firstName} {user.lastName}</div>
                        <div className="message">@{user.username}</div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="list-wrapper">
            <div className="list">
                {list}
                {notice()}
            </div>
        </div>
    );
};

export default Panel;
