import React from 'react';
import './Home.sass';
// import Config from "../../config";
import {useDispatch, useSelector} from "react-redux";
import combine from 'classnames';
import {
    FiMessageCircle
} from "react-icons/fi";

const Home = () => {
    const dispatch = useDispatch();
    const view = useSelector(state => state.view.nav);
    const mobileView = useSelector(state => state.view.mobile);
    const navigate = view => dispatch({ type: 'NAVIGATE', nav: view, panel: view });
    const user = useSelector(state => state.auth.user);
    console.log('--- Home Page ----')
    console.log(user)
    const Picture = () => {
        if (user.profilePhoto)
        return <img src={user.profilePhoto} alt="Picture" className="picture"/>;
        else
            return <div className="img">{user.firstName.substr(0,1)}{user.lastName.substr(0,1)}</div>;
    };
    return (
        <div className="home">
            <div className="overlay"/>
            <div className="welcome-text">
                Welcome, {user.firstName}
            </div>
            <div className="profile">
                <Picture/>
            </div>
            <div className="text">
                Search for someone to start a conversation,<br/>Add contacts to your favorites to reach them faster
            </div>
            <div className={combine('button first', { active: view === 'CHAT' && (mobileView !== 'WELCOME') })} onClick={() => navigate('CHAT')}>
                    <FiMessageCircle/>
            </div>
        </div>
    );
};

export default Home;
