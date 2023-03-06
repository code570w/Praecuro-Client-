import React from 'react';
import './Desktop.sass';
import './Phone.sass';
import Panel from '../Panel/Panel';
import Header from '../Main/Header';
import Chat from '../Main/Chat';
import Home from '../Main/Home';
import Bar from '../Main/Bar';
import {useSelector} from "react-redux";
// import Views from "../../variables/Views";

const Desktop = () => {
    const view = useSelector(state => state.view.mobile);

    const Conversation = () => (
        <div className="main">
            <Header mobile={true} />
            <Chat/>
            <Bar/>
        </div>
    );

    const Welcome = () => (
        <div className="main">
            <Home/>
        </div>
    );
    const getMain = () => {
        switch (view) {
            case 'PANEL':
                return <Panel/>;
            case 'ROOM':
                return <Conversation/>;
            default:
                return <Welcome/>;
        }
    };
    return (
        <div className="container">
            {getMain()}
        </div>
    );
};

export default Desktop;
