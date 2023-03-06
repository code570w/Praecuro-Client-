import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import * as routerHelpers from "../../router/RouterHelpers";

export const actionTypes = {
  AllBids : "[AllBids] Action",
  AddBid : "[AddBid] Action",
  UpdateBid : "[UpdateBid] Action",
  DeleteBid : "[DeleteBid] Action",
  SetCurBid:'[SetCurBid] Action',
};

const initialBidState = {
  bids: [],
  curbid:{}
};

// export const reducer = persistReducer(
//   { storage, key: "personal-user", whitelist: ["jobs"] },
//   (state = initialBidState, action) => {
export const bidReducer = (state = initialBidState, action) => {
    switch (action.type) {
      case actionTypes.AllBids: {
        const { allBids } = action.payload;
        return { ...state, bids: allBids };
      }
      case actionTypes.AddBid: {
        const { allBids } = action.payload;
        return { ...state, bids: allBids };
      }
      case actionTypes.UpdateBid: {
        const { allBids } = action.payload;
        return { ...state, bids: allBids };
      }
      case actionTypes.DeleteBid: {
        const { allBids } = action.payload;
        return { ...state, bids: allBids };
      }
      case actionTypes.SetCurBid: {
        const curbid = action.payload;
        return { ...state, curbid: curbid };
      }
      default:
        return state;
    }
  }
// );

export const actions = {
  allBids: allBids => ({ type: actionTypes.AllBids, payload: { allBids } }),
  addBid: allBids => ({ type: actionTypes.AddBid, payload: { allBids } }),
  updateBid: allBids => ({ type: actionTypes.UpdateBid, payload: { allBids } }),
  deleteBid: allBids => ({ type: actionTypes.DeleteBid, payload: { allBids } }),
  setCurBid: curbid=>({type:actionTypes.SetCurBid, payload:curbid}),
};

export function* saga() {
  // yield takeLatest(actionTypes.AllJobs, function* allJobsSaga() {
  //   yield put(actions.allJobs());
  // });

  // yield takeLatest(actionTypes.AddJob, function* addJobSaga() {
  //   yield put(actions.addJob());
  // });
}
