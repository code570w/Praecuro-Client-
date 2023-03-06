import React from 'react';
import './Desktop.sass';
// import Nav from '../Nav/Nav';
import Panel from '../Panel/Panel';
import Header from '../Main/Header';
import Chat from '../Main/Chat';
import Home from '../Main/Home';
import Bar from '../Main/Bar';
import {useSelector} from "react-redux";
// import Views from "../../variables/Views";

const Desktop = () => {
    const main = useSelector(state => state.view.main);

    console.log('main',main);

    const Conversation = () => (
        <div className="main">
            <Header/>
            <Chat/>
            <Bar/>
        </div>
    );

    const Welcome = () => (
        <div className="main">
            <Home/>
        </div>
    );

    // const Incoming = () => (
    //     <div className="main">
    //         <Ringing direction="incoming" />
    //     </div>
    // );

    // const Outgoing = () => (
    //     <div className="main">
    //         <Ringing direction="outgoing" />
    //     </div>
    // );

    const getMain = () => {
        switch (main) {
            case 'ROOM':
                return <Conversation/>;
            default:
                return <Welcome/>;
        }
    };

    // const getDetails = () => {
    //     switch (main) {
    //         case Views.ROOM:
    //             return <Details/>;
    //         default:
    //             return <Info/>;
    //     }
    // };

    return (
        <div className="container">
            {/* <Nav/> */}
            <Panel />
            {getMain()}
            {/* {getDetails()} */}
        </div>
    );


};

export default Desktop;
