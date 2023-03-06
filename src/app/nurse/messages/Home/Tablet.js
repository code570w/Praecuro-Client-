import React from 'react';
import './Desktop.sass';
import './Tablet.sass';
import Nav from '../Nav/Nav';
import Panel from '../Panel/Panel';
import Details from '../Details/Details';
import Info from '../Details/Info';
import Header from '../Main/Header';
import Chat from '../Main/Chat';
import Home from '../Main/Home';
import Session from '../Main/Session';
import Bar from '../Main/Bar';
import {useSelector} from "react-redux";
// import Views from "../../variables/Views";
import Ringing from "../Main/Ringing";

const Desktop = () => {
    const main = useSelector(state => state.view.main);

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

    const Incoming = () => (
        <div className="main">
            <Ringing direction="incoming" />
        </div>
    );

    const Outgoing = () => (
        <div className="main">
            <Ringing direction="outgoing" />
        </div>
    );

    const getMain = () => {
        switch (main) {
            case 'OUTGOING':
                return <Outgoing/>;
            case 'INCOMING':
                return <Incoming/>;
            case 'SESSION':
                return <Session/>;
            case 'DETAILS':
                return <Details/>;
            case 'ROOM':
                return <Conversation/>;
            default:
                return <Welcome/>;
        }
    };

    const getDetails = () => {
        switch (main) {
            case 'SESSION':
                return null;
            case 'ROOM':
                return <Details/>;
            default:
                return <Info/>;
        }
    };

    return (
        <div className="container">
            <Nav/>
            <Panel/>
            {getMain()}
        </div>
    );
};

export default Desktop;
