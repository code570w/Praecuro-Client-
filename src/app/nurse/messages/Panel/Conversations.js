import React, {useEffect, useRef, useState} from 'react';
import { call, put } from "redux-saga/effects";
import {useDispatch, useSelector,connect} from "react-redux";
import Room from "./components/Room";
// import Actions from "../../variables/actions/Actions";
import io from 'socket.io-client'
import {useHistory} from 'react-router-dom'
// import SkeletonLoader from "tiny-skeleton-loader-react";


const Conversations = ({match,defaultRooms}) => {

    
    const dispatch = useDispatch();
    // console.log('dispatch',dispatch);
    // const rooms = useSelector(state => state.room?.rooms);
    // const roomsNumber = useSelector(state => state.room?.rooms?.length);
    // const favorites = useSelector(state => state.user.favorites);
    // const firstRoomID = useSelector(state => state.room?.rooms?.length > 0 ? state.room?.rooms[state.room?.rooms.length - 1].lastUpdate : null);
    // console.log('- converstaion page -')
    // console.log('rooms',rooms)
    const scrollContainer = useRef(null);
    let [rooms,setRooms] = useState(defaultRooms)
    let [roomsNumber,setRoomsNumber] = useState(0)
    let [firstRoomID,setFirstRoomID] = useState(null)
    let [loading,setLoading] = useState(true)
    const [scrollHeight, setScrollHeight] = useState(0);
    const [tab, setTab] = useState(0);

    console.log('rooms-rooms',rooms)

    // const socket = io('http://localhost:4000');
    // socket = socket;

    //         let token = localStorage.getItem('token')
    //             console.log('tokrn',socket);
    //             socket.on('connect', () => {
    //             console.log('connect');
    //             socket.emit('authenticate', {token});
    //         })



     const socket = io('https://nurse-job.herokuapp.com/',{
         timeout:3000,
         autoConnect:true
     });
    let token = localStorage.getItem('token')
    socket.on('connect', () => {
        socket.emit('authenticate', {token});
    })
    console.log('socket',socket);
    window.socket = socket
    console.log('this is match');
    useEffect(() => {
        console.log('this is room111');
        setTimeout(()=>{
            
        socket.emit('list-rooms', {limit:10});
        socket.on('list-rooms', (data)=>{
            console.log(data,'this is room',data.rooms?.length);
            if(data.rooms?.length!==0){
                socket.emit('join-room',{roomID:data.rooms[data.rooms.length-1]?._id})
                socket.on('join-room',(data)=>{
                    console.log('gii',data);
                    dispatch({ type: 'JOIN_ROOM_RESULT', data })
                })
            }
            setRooms(data.rooms)
            setRoomsNumber(data.rooms.length)
            setFirstRoomID(data.rooms?.length > 0 ? data.rooms[data.rooms.length - 1].lastUpdate : null)
            setLoading(false)
        });

    },1000);
       

        if (scrollContainer.current?.scrollTop === 0) scrollContainer.current.scrollTop = scrollHeight
        // console.log(data,'this is room111');
    }, []);

    const onScroll = () => {
        setScrollHeight(scrollContainer.current.scrollHeight);
        if (scrollContainer.current.scrollTop >= (scrollContainer.current.scrollHeight - scrollContainer.current.offsetHeight))
            dispatch({type: 'MORE_ROOMS', roomID: firstRoomID});
    };

    const Rooms = rooms?.map(room => {
        return <Room room={room} socket={socket} key={room._id} /> 
    });

    const Notice = () => {
        if (!tab && rooms?.length === 0) return (
            <div className="notice-text">
                There are no rooms.<br/>Search for someone to start a conversation!
            </div>
        );
        // if (tab && favorites.length === 0) return (
        //     <div className="notice-text">
        //         You have no favorites.<br/>Add rooms or people to favorites to find them faster!
        //     </div>
        // );
        return null;
    };

//    console.log('loading',loading)

    // if(loading){
    //     return <div style={{color:'white',fontSize:'15px'}}><div className="loader"></div></div>
    // }
    return (
       
        
        <div className="list-wrapper">
            {/* <ul className="uk-tab-bottom panel-tabs" data-uk-tab={true}>
                <li className="uk-active" onClick={() => setTab(0)}><a href="#">Rooms</a></li>
                <li onClick={() => setTab(1)}><a href="#">Favorites</a></li>
            </ul> */}
            <Notice/>
            <div className="list" ref={scrollContainer} onScroll={onScroll} >
                {Rooms}
            </div>
        </div>
    
    );
};
const mapStateToProps = (state) => (()=>{
    console.log(state,'this is conversation ');
    return{
    defaultRooms:state?.rooms
}})
export default connect(
    mapStateToProps
  )(Conversations)

