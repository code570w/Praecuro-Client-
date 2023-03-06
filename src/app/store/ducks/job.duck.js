import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import * as routerHelpers from "../../router/RouterHelpers";

export const actionTypes = {
  AllJobs : "[AllJobs] Action",
  AllReviews : "AllReviews",
  AddJob : "[AddJob] Action",
  AddReview : "AddReview",
  UpdateJob : "[UpdateJob] Action",
  DeleteJob : "[DeleteJob] Action",
  SetCurJob:'[SetCurJob] Action',
  SetCurReview:'SetCurReview',
};

const initialJobState = {
  jobs: [],
  curjob:{},
  reviews:[],
  curreview:{}
};


export const jobReducer = (state = initialJobState, action) => {
    switch (action.type) {
      case actionTypes.AllJobs: {
        const { allJobs } = action.payload;
        return { ...state, jobs: allJobs };
      }
      case actionTypes.AddJob: {
        const { allJobs } = action.payload;
        return { ...state, jobs: allJobs };
      }
      case actionTypes.AllReviews: {
        const { allReviews } = action.payload;
        return { ...state, reviews: allReviews };
      }
      case actionTypes.AddReview: {
        const { allReviews } = action.payload;
        return { ...state, reviews: allReviews };
      }
      case actionTypes.UpdateJob: {
        const { allJobs } = action.payload;
        return { ...state, jobs: allJobs };
      }
      case actionTypes.DeleteJob: {
        const { allJobs } = action.payload;
        return { ...state, jobs: allJobs };
      }
      case actionTypes.SetCurJob: {
        const curjob = action.payload;
        return { ...state, curjob: curjob };
      }
      default:
        return state;
    }
  }
// );

export const actions = {
  allJobs: allJobs => ({
       type: actionTypes.AllJobs,
       payload: { allJobs }
     }),

  allReviews: allReviews => ({ type: actionTypes.AllReviews, payload: { allReviews } }),
  addJob: allJobs => ({ type: actionTypes.AddJob, payload: { allJobs } }),
  addReview: allReviews => ({ type: actionTypes.AddReview, payload: { allReviews } }),
  updateJob: allJobs => ({ type: actionTypes.UpdateJob, payload: { allJobs } }),
  deleteJob: allJobs => ({ type: actionTypes.DeleteJob, payload: { allJobs } }),
  setCurJob: curjob=>({type:actionTypes.SetCurJob, payload:curjob}),
};

export function* saga() {
  // yield takeLatest(actionTypes.AllJobs, function* allJobsSaga() {
  //   yield put(actions.allJobs());
  // });

  // yield takeLatest(actionTypes.AddJob, function* addJobSaga() {
  //   yield put(actions.addJob());
  // });
}
