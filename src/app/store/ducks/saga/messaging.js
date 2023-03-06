import {call, put, select} from "redux-saga/effects";
import jwtDecode from 'jwt-decode';
import axios from "axios";
import moment from "moment";

const sendMessage = ({ roomID, clientID,nurseID, content, contentType }) => {
    console.log('obj',{ roomID,clientID,nurseID, content, type: 'text' });
    window.socket.emit('message', { roomID,clientID,nurseID, content, type: 'text' });
};

// worker saga: makes the api call when watcher saga sees the action
export function* sendMessageSaga(action) {
    yield call(sendMessage, action);
}

// export function* sendImageSaga(action) {
//     // const {image} = yield select(state => state.images[action.ref]);
//     const user = yield select(state => state.user);

//     yield put({type: 'SEND_MESSAGE', roomID: action.target, authorID: user.id, content: image.shieldedID, contentType: 'image'});
//     yield put({type: 'ADD_MESSAGE', message: {
//             _id: Math.random(), author: {...user, _id: user.id}, content: image.shieldedID, type: 'image', date: moment()
//         }});
// }
