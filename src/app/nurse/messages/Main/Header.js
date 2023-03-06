import React from 'react';
import './Main.sass';
import {useDispatch, useSelector} from "react-redux";
// import Actions from "../../variables/actions/Actions"
import combine from 'classnames';
import {
    FiMessageCircle
} from "react-icons/fi";
// import Config from '../../config';
// import * as UIkit from "uikit";
// import View from "../../variables/actions/View";
// import Views from "../../variables/Views";

const Header = ({mobile}) => {
    const dispatch = useDispatch();
    
   
    const view = useSelector(state => state.view.nav);
    

    const mobileView = useSelector(state => state.view.mobile);
    

    const navigate = view => dispatch({ type: 'NAVIGATE', nav: view, panel: view });
    
    const room = useSelector(state => state.room);

    const user = useSelector(state => state.user);
    
    const status = useSelector(state => state.status);
    const role = useSelector(state =>state.auth.role);
    
    
    let other = {};
    // if (!other) {
    //     other = { ...other, firstName: 'Deleted1111', lastName: 'User' };
    // }

    // if (!room.isGroup && room.people) {
    //     if (room.people) {
    //     room.people.forEach(person => {
    //         if (person._id !== user.id) other = person;
    //     });
    // }
    // console.log('roleeee',role)
    if(role == 1){
        other = room.peopleNurse;
    }else{
        other = room.peopleClient;
    }

   if (!other) {
        other = { ...other, firstName: 'Deleted11', lastName: 'User' };
    }


    
    let isFavorite = false;

    user.favorites && user.favorites.forEach(favorite => {
        if (favorite._id === room._id) isFavorite = true;
    });

    const getStatus = () => {
        if (status.online.includes(other._id)) return 'online';
        if (status.away.includes(other._id)) return 'away';
        if (status.busy.includes(other._id)) return 'busy';
        return 'offline';
    };

    const getClass = () => {
        if (status.online.includes(other._id)) return 'green';
        if (status.away.includes(other._id)) return 'orange';
        if (status.busy.includes(other._id)) return 'red';
        return 'gray';
    };

    // const call = () => {
    //     // status.available.includes(other._id) &&
    //     // status.available.includes(other._id) &&
    //     // if (room.isGroup)
    //         // return dispatch({type: Actions.RTC_ROOM_CREATE, group: room, users: [...room.people], video: false, audio: true});
    //     // if ((status.online.includes(other._id) || status.away.includes(other._id)))
    //         return dispatch({type: Actions.RTC_ROOM_CREATE, users: [other], video: false, audio: true});
    //     // if (status.busy.includes(other._id))
    //         // return UIkit.notification('User is busy.', {status: 'danger'});
    //     if (!status.busy.includes(other._id) && !status.away.includes(other._id) && !status.online.includes(other._id))
    //         return UIkit.notification('User is offline.', {status: 'danger'});
    //     UIkit.notification('User can not receive calls.', {status: 'danger'});
    // };

    // const videoCall = () => {
    //     if (room.isGroup)
    //         return dispatch({type: Actions.RTC_ROOM_CREATE, group: room, users: [...room.people], video: true, audio: true});
    //     if ((status.online.includes(other._id) || status.away.includes(other._id)))
    //         return dispatch({type: Actions.RTC_ROOM_CREATE, users: [other], video: true, audio: true});
    //     if (status.busy.includes(other._id))
    //         return UIkit.notification('User is busy.', {status: 'danger'});
    //     if (!status.busy.includes(other._id) && !status.away.includes(other._id) && !status.online.includes(other._id))
    //         return UIkit.notification('User is offline.', {status: 'danger'});
    //     UIkit.notification('User can not receive calls.', {status: 'danger'});
    // };

    let online = 0;
    let away = 0;
    let busy = 0;

    // if (room.isGroup) room.people.forEach(person => {
    //     if (status.online.includes(person._id)) online++;
    //     if (status.away.includes(person._id)) away++;
    //     if (status.busy.includes(person._id)) busy++;
    // });

    return (
        <div className="header header-main">
            <div className="left">
                <div className="name">
                    {`${other.firstName} ${other.lastName}`}
                </div>
                <div className="status-dot">
                    <div className={`dot ${getClass()}`} hidden={false} />
                    <div className="status" hidden={false}>{getStatus()}</div>
                    {/* <div className="status" hidden={true}>{room.people.length} members</div>
                    <div className="status group" hidden={false}>{online} online</div>
                    <div className="status group" hidden={false}>{away} away</div>
                    <div className="status group" hidden={true}>{busy} busy</div> */}
                </div>
            </div>
            <div className="right">
                <div className={combine('button first', { active: view === 'CHAT' && (mobileView !== 'WELCOME' || !mobile) })} onClick={() => navigate('CHAT')}>
                    <FiMessageCircle/>
                </div>
            </div>
        </div>
    );
};

export default Header;
