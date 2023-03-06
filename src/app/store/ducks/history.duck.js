import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import * as routerHelpers from "../../router/RouterHelpers";

export const actionTypes = {
  AllHistorys : "[AllHistorys] Action",
  AddHistory : "[AddHistory] Action",
  UpdateHistory : "[UpdateHistory] Action",
  DeleteHistory : "[DeleteHistory] Action",
  SetCurHistory:'[SetCurHistory] Action',
};

const initialHistoryState = {
  historys: [],
  curhistory:{}
};

// export const reducer = persistReducer(
//   { storage, key: "personal-user", whitelist: ["historys"] },
//   (state = initialHistoryState, action) => {
export const historyReducer = (state = initialHistoryState, action) => {
    switch (action.type) {
      case actionTypes.AllHistorys: {
        const { allHistorys } = action.payload;
        return { ...state, historys: allHistorys };
      }
      case actionTypes.AddHistory: {
        const { allHistorys } = action.payload;
        return { ...state, historys: allHistorys };
      }
      case actionTypes.UpdateHistory: {
        const { allHistorys } = action.payload;
        return { ...state, historys: allHistorys };
      }
      case actionTypes.DeleteHistory: {
        const { allHistorys } = action.payload;
        return { ...state, historys: allHistorys };
      }
      case actionTypes.SetCurHistory: {
        const curhistory = action.payload;
        return { ...state, curhistory: curhistory };
      }
      default:
        return state;
    }
  }
// );

export const actions = {
  allHistorys: allHistorys => ({ type: actionTypes.AllHistorys, payload: { allHistorys } }),
  addHistory: allHistorys => ({ type: actionTypes.AddHistory, payload: { allHistorys } }),
  updateHistory: allHistorys => ({ type: actionTypes.UpdateHistory, payload: { allHistorys } }),
  deleteHistory: allHistorys => ({ type: actionTypes.DeleteHistory, payload: { allHistorys } }),
  setCurHistory: curhistory=>({type:actionTypes.SetCurHistory, payload:curhistory}),
};

export function* saga() {
  // yield takeLatest(actionTypes.AllHistorys, function* allHistorysSaga() {
  //   yield put(actions.allHistorys());
  // });

  // yield takeLatest(actionTypes.AddHistory, function* addHistorySaga() {
  //   yield put(actions.addHistory());
  // });
}
