import {createRoomSaga, joinRoomSaga, listRoomSaga, moreMessagesSaga,   moreRoomsSaga} from "./saga/room";
import {sendMessageSaga} from "./saga/messaging";
import xss from "xss";
import { all, takeEvery } from "redux-saga/effects";
export const actionTypes = {
    CREATE_ROOM_RESULT : "CREATE_ROOM_RESULT",
    JOIN_ROOM_RESULT : "JOIN_ROOM_RESULT",
    ADD_MESSAGE : "ADD_MESSAGE",
    MORE_MESSAGES_RESULT : "MORE_MESSAGES_RESULT",
    MORE_IMAGES_RESULT:'ADD_ROOM',

    LIST_ROOMS_RESULT:'LIST_ROOMS_RESULT',
    MORE_ROOMS_RESULT:'MORE_ROOMS_RESULT'
  };
  
  const initialRoomState = {
    rooms: [],
    messages: [],
    firstMessageID: null,
    lastMessageID: null,
    // messages:[],
    // rooms:[],
    // typist:null,
    // joined:false,
  };



  
  
  export const roomReducer = (state = initialRoomState, action) => {

   
      switch (action.type) {
        case actionTypes.CREATE_ROOM_RESULT:
        case actionTypes.JOIN_ROOM_RESULT:
                return {
                    ...state,
                    ...action.data.room,
                    firstMessageID: action.data.room.messages.length > 0 ? action.data.room.messages[0]._id : state.firstMessageID,
                    lastMessageID: action.data.room.messages.length > 0 ? action.data.room.messages[action.data.room.messages.length - 1]._id : state.lastMessageID,
                };
        case actionTypes.ADD_MESSAGE:
            let message = action.message;
            message.content = xss(message.content);
            console.log('actionsssssaa',action) 
            return {
                ...state,
                messages: [...state.messages, message],
                lastMessageID: action.message._id,
            };
        case actionTypes.MORE_MESSAGES_RESULT:
            return {
                ...state,
                messages: [...action.data.messages, ...state.messages],
                firstMessageID: action.data.messages.length > 0 ? action.data.messages[0]._id : state.firstMessageID,
            };

        
        case actionTypes.LIST_ROOMS_RESULT:
            console.log('reducer ->List room Result')
            console.log(action)
            return {
                ...state, rooms: action.data.rooms
            };
        case actionTypes.MORE_ROOMS_RESULT:
            return {
                ...state,
                rooms: [...state.rooms, ...action.data.rooms],
            };
        case 'USER_LOGOUT':
            return initialRoomState;
        default:
            return state;
      }
  }
  
  export const actions = {

    logout: () => ({ type: 'USER_LOGOUT' }), // logout: () => ({ type: actionTypes.Logout }),
  };
  
  export function* saga() {
    // yield takeLatest(actionTypes.AllLedgers, function* allLedgersSaga() {
    //   yield put(actions.allLedgers());
    // });
  
    // yield takeLatest(actionTypes.AddLedger, function* addLedgerSaga() {
    //   yield put(actions.addLedger());
    // });

    // console.log('createRoomSagaddddd',createRoomSaga);
    yield all([
       
        takeEvery('JOIN_ROOM', joinRoomSaga),
        takeEvery('CREATE_ROOM', createRoomSaga),
        takeEvery('LIST_ROOMS', listRoomSaga),
        takeEvery('SEND_MESSAGE', sendMessageSaga),
        // takeEvery(Actions.SEARCH, searchSaga),
        takeEvery('MORE_MESSAGES', moreMessagesSaga),
        takeEvery('MORE_ROOMS', moreRoomsSaga),
      ]);
  }
  