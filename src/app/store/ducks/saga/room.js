import { call, put } from "redux-saga/effects";
import jwtDecode from 'jwt-decode';
// import User from "../variables/actions/User";
import io from 'socket.io-client'

import axios from "axios";
// const socket = io('https://nurse-105.herokuapp.com/');
 const socket = io('https://nurse-job.herokuapp.com/',{autoConnect:true});
//  const socket = io('https://nurse-job.herokuapp.com/');



let token = localStorage.getItem('token')
console.log('tokrn',socket);
socket.on('connect', () => {
    console.log('connect');
    socket.emit('authenticate', {token});
})
// window.socket = socket

socket.on('offline', (error) => {
      // redirect user to login page perhaps?
      console.log('User offline');

  });
const createRoom = counterpart => {
    
    socket.emit('create-room', { counterpart });
     // console.log('create-room',counterpart)
     console.log('---krishna--')
    //  alert(`hiii3 ${counterpart}`);
     // this.socket = io.connect();
    //  console.log('krishna',socket);
  
};

export function* createRoomSaga(action) {
    console.log('-createroom saga--')
    console.log('carrrr',action)
    // alert(`hiii2 ${action.counterpart}`);
  
    yield call(createRoom, action.counterpart);
}

const joinRoom = roomID => {
    console.log('joinroom',roomID)

    window.socket.emit('join-room', { roomID });
};

const listRooms = () => {
   
    console.log('-- saga list rooms --')
    socket.emit('list-rooms', {});
};

const moreMessages = (roomID, messageID) => {
  
    window.socket.emit('more-messages', { roomID, messageID });
};

const moreImages = (roomID, messageID) => {
    window.socket.emit('more-images', { roomID, messageID });
};

const createGroup = (people, title, picture) => {
    window.socket.emit('create-group', { people, title, picture });
};

const moreRooms = roomID => {
    window.socket.emit('more-rooms', { roomID });

};

// worker saga: makes the api call when watcher saga sees the action


export function* joinRoomSaga(action) {
 
    yield call(joinRoom, action.roomID);
}

export function* listRoomSaga(action) {
    console.log('hii list room2021');
    yield call(listRooms);
}

export function* moreMessagesSaga(action) {
    yield call(moreMessages, action.roomID, action.messageID);
}

export function* moreImagesSaga(action) {
    yield call(moreImages, action.roomID, action.messageID);
}

export function* createGroupSaga(action) {
    yield call(createGroup, action.people, action.title, action.picture );
}

export function* moreRoomsSaga(action) {
    yield call(moreRooms, action.roomID);
}


