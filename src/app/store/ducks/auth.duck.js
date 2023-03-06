import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import { getUserByToken } from "../../crud/auth.crud";
import * as routerHelpers from "../../router/RouterHelpers";
import * as UIkit from "uikit";
import io from 'socket.io-client';
import { all, takeEvery } from "redux-saga/effects";
import { ioSaga } from './saga/io';

export const actionTypes = {
  Login: "[Login] Action",
  UserLogin: "[UserLogin] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UpdateRealUser:"[UpdateRealUser] Action",
  PaymentinfoUpdate:"PaymentinfoUpdate",
  PassUpdate:"[PassUpdate] Action",
  UserLoaded: "[Load User] Auth API"  ,
  GetCharges:'GetCharges',
  GetPayments:'GetPayments'
};

const initialAuthState = {
  user: undefined,
  token: undefined,
  role: undefined,
  charges:[],
  payments:[]
};
// export const reducer = persistReducer(
//     { storage, key: "demo1-auth", whitelist: ["user", "authToken"] },
//     (state = initialAuthState, action) => {
//       switch (action.type) {
//         case actionTypes.Login: {
//           const { authToken } = action.payload;

//           return { authToken, user: undefined };
//         }

//         case actionTypes.Register: {
//           const { authToken } = action.payload;

//           return { authToken, user: undefined };
//         }

//         case actionTypes.Logout: {
//           routerHelpers.forgotLastLocation();
//           return initialAuthState;
//         }

//         case actionTypes.UserLoaded: {
//           const { user } = action.payload;

//           return { ...state, user };
//         }

//         default:
//           return state;
//       }
//     }
// );
export const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case actionTypes.Login: {
      console.log('Login payoload')
      console.log(action.payload)
        const { user, token, role } = action.payload;
      return {...state,user, token, role};
    }
    case actionTypes.UserLogin: {
      console.log('UserLogin payoload')
      console.log(action.payload)
        const { user, token, role } = action.payload;
      
        localStorage.setItem('token', token)
      return {...state,user, token, role};
    }
    case actionTypes.Register: {
      const { user, token, role } = action.payload;
      return {user, token, role};
    }
    case actionTypes.UpdateRealUser: {
      const user = action.payload;
      return {...state, user:user};
    }
    case actionTypes.PaymentinfoUpdate: {
      const user = action.payload;
      return {...state, user:user};
    }
    case actionTypes.GetCharges: {
      const charges = action.payload;
      return {...state, charges:charges};
    }
    case actionTypes.GetPayments: {
      const payments = action.payload;
      return {...state, payments:payments};
    }
    case actionTypes.Logout: {
      routerHelpers.forgotLastLocation();
      localStorage.removeItem("isDashboardFirstRender");
      return initialAuthState;
    }
    case actionTypes.UserLoaded: {
      const { user } = action.payload;

      return { ...state, user };
    }
    case actionTypes.PassUpdate:{
      const user = action.payload;
      return {...state, user:user};
    }
    default:
      return state;
  }
}


export const actions = {
  login: userData => ({ type: actionTypes.Login, payload: userData }),
  userlogin: userData => ({ type: actionTypes.UserLogin, payload: userData }),

  updateRealUser:userData=>({type:actionTypes.UpdateRealUser, payload:userData}),
  paymentinfoUpdate:userData=>({type:actionTypes.PaymentinfoUpdate, payload:userData}),
  getCharges:userData=>({type:actionTypes.GetCharges, payload:userData}),
  getPayments:userData=>({type:actionTypes.GetPayments, payload:userData}),
  register: user => ({
    type: actionTypes.Register,
    payload: { user }
  }),
  passUpdate:userData=>({type:actionTypes.PassUpdate, payload:userData}),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: user => ({ type: actionTypes.UserRequested, payload: { user } }),
  fulfillUser: user => ({ type: actionTypes.UserLoaded, payload: { user } })
};

export function* saga() {
  yield takeLatest(actionTypes.UserLogin, function* loginSaga(action) {
    console.log('saga login')
    console.log('action',action)
    const { user, token, role } = action.payload;
    ioSaga(action)
  console.log('this is call');
    yield put({ type: 'USER_LOGIN_SUCCESS', user, token});
  });

  // yield takeLatest(actionTypes.Register, function* registerSaga() {
  //   yield put(actions.requestUser());
  // });

  // yield takeLatest(actionTypes.UserRequested, function* userRequested() {
  //   const { data: user } = yield getUserByToken();

  //   yield put(actions.fulfillUser(user));
  // });
  yield all([
    // takeEvery('CREATE_ROOM', createRoomSaga),
    // takeEvery('JOIN_ROOM', joinRoomSaga),
    // takeEvery('LIST_ROOMS', listRoomSaga),
    // takeEvery('SEND_MESSAGE', sendMessageSaga),
    // takeEvery(Actions.SEARCH, searchSaga),
    // takeEvery('MORE_MESSAGES', moreMessagesSaga),
    // takeEvery('MORE_ROOMS', moreRoomsSaga),
    takeEvery('USER_LOGIN_SUCCESS', ioSaga),
    // takeEvery('ADMIN_USER_CREATE', createSaga),
    // takeEvery('ADMIN_USER_UPDATE', updateSaga),
    // takeEvery('ADMIN_USER_DELETE', deleteSaga),
  ]);
}
