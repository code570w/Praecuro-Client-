import { eventChannel } from 'redux-saga';
import { call, put, take } from "redux-saga/effects";
import io from 'socket.io-client';
// import Actions from "../variables/actions/Actions";
import moment from "moment";
// import View from "../variables/actions/View";
// import Views from "../variables/Views";
import * as UIkit from "uikit";
// import Config from "../config";
console.log('-- file is calling --')

const socket = io('https://nurse-job.herokuapp.com/',{
  autoConnect:true,
  timeout:3000
});
// const socket = io('https://nurse-job.herokuapp.com/');
const ioConnect = token => {
  console.log('-- ioConect --')
  // const socket = io((Config.url || '') + '/');
  console.log(token,'this is token');

  // const socket = io('https://nurse-105.herokuapp.com/');
  window.socket = socket;
  return new Promise(resolve => {
    socket.on('connect', () => {
      console.log('connect io connect ')
      socket.emit('authenticate', {token});
      console.log('emit authenticate')
      resolve(socket);
    });
  });
};

function ioSubscribe(socket) {
  console.log('-- ioSubscribe --')
  return eventChannel(emit => {
    
    socket.on('authenticated', () => {
      console.log('io subscribe authenticated')
      socket.emit('list-rooms', {});
      socket.emit('list-favorites', {});
      socket.emit('list-status');
      socket.emit('online');
      console.log('hii list room202222');
      // if (!window.firstSearch) {
      //   window.firstSearch = true;
      //   window.socket.emit('search', { search: '' });
      // }
      // if (!window.isMobile) window.socket.emit('available');
      socket.emit('available');
      if (window.disconnected) {
        window.disconnected = false;
        UIkit.notification('Reconnected to server.', {status: 'success'});
      }
    });
    socket.on('disconnect', () => {
      console.log('-> socket disconnect <-')
      if (window.logout) {
        window.logout = false;
      }
      else {
        window.disconnected = true;
        UIkit.notification('Connection lost. Trying to reconnect...', {status: 'danger'});
      }
    });
    // socket.on('search', data => {
    //   console.log('io -> search ')
    //   emit({ type: 'SEARCH_RESULT, data });
    // });

    socket.on('create-room', data => {
      emit({ type: 'CREATE_ROOM_RESULT', data });
      console.log('create-room', data);
    });

    socket.on('list-rooms', data => {
      emit({ type: 'LIST_ROOMS_RESULT', data });
      console.log('list-rooms', data);
    });
   
    socket.on('join-room', data => {
      console.log('join-room', data);
      emit({ type: 'JOIN_ROOM_RESULT', data });
    });
    socket.on('message-in', data => {
      console.log('message-in', data);
      emit({ type: 'ADD_MESSAGE', message: data.message });
      emit({ type: 'SOUNDS_MESSAGE' });
      socket.emit('list-rooms', {});
    });
    socket.on('message-out', data => {
      console.log('message-out', data);
      socket.emit('list-rooms', {});
    });
    socket.on('more-messages', data => {
      console.log('more-messages', data);
      emit({ type: 'MORE_MESSAGES_RESULT', data });
    });
    socket.on('more-rooms', data => {
      console.log('more-rooms', data);
      emit({ type: 'MORE_ROOMS_RESULT', data });
    });
    socket.on('get-user', data => {
      console.log('get-user', data);
      emit({ type: 'RTC_GET_USER_RESULT', data });
    });
    socket.on('list-status', data => {
      console.log('list-status', data);
      emit({ type: 'STATUS_LIST', data });
    });
    socket.on('online', data => {
      console.log('online', data);
      emit({ type: 'STATUS_ONLINE', data });
    });
    socket.on('offline', data => {
      console.log('offline', data);
      emit({ type: 'STATUS_OFFLINE', data });
    });
    socket.on('busy', data => {
      console.log('busy', data);
      emit({ type: 'STATUS_BUSY', data });
    });
    socket.on('away', data => {
      console.log('away', data);
      emit({ type: 'STATUS_AWAY', data });
    });
    socket.on('available', data => {
      console.log('available', data);
      emit({ type: 'STATUS_AVAILABLE', data });
    });
    socket.on('create-group', data => {
      console.log('create-group', data);
      emit({type: 'NAVIGATE', nav: 'CHAT'});
      emit({type: 'SEND_MESSAGE', roomID: data.room._id, authorID: data.user, content: `New group created: ${data.room.title}`, contentType: 'info'});
      emit({type: 'LIST_ROOMS'});
      emit({type: 'JOIN_ROOM', roomID: data.room._id});
    });
    return () => {};
  });
}

// worker saga: makes the api call when watcher saga sees the action
export function* ioSaga(action) {
  console.log('-- i oioSaga --', action)
  const socket = yield call(ioConnect, action.token);

  const channel = yield call(ioSubscribe, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}
