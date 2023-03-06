import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import * as routerHelpers from "../../router/RouterHelpers";

export const actionTypes = {
  Add: "[Add] Action",
  Update: "[Update] Action",
  Delete: "[Delete] Action",
  GetAll: "[GetAll] Action",
  // Logout: "[Logout] Action",
  // Register: "[Register] Action",
  // UserRequested: "[Request User] Action",
  // UserLoaded: "[Load User] Auth API"
};

const initialCategoryState = {
  allcategories:[]
};

export const categoryReducer = (state = initialCategoryState, action) => {
  switch (action.type) {
    case actionTypes.Add: {
      console.log('allcategories Add payoload')
      console.log(action.payload)
      const  allcategories  = action.payload;
      return {...state, allcategories: allcategories};
    }
    case actionTypes.Update: {
      console.log('allcategories Update payoload')
      console.log(action.payload)
      const  allcategories  = action.payload;
      return {allcategories: allcategories};
    }
    case actionTypes.Delete: {
      console.log('allcategories Delete payoload')
      console.log(action.payload)
      const  allcategories  = action.payload;
      return {allcategories: allcategories};
    }
    case actionTypes.GetAll: {
      console.log('allcategories GetAll payoload')
      console.log(action.payload)
      const  allcategories  = action.payload;
      return {allcategories: allcategories};
    }
    // case actionTypes.Register: {
    //   const { user, token, role } = action.payload;
    //   return {user, token, role};
    // }
    // case actionTypes.UpdateRealUser: {
    //   const { user } = action.payload;
    //   return {...state, user};
    // }
    // case actionTypes.Logout: {
    //   routerHelpers.forgotLastLocation();
    //   localStorage.removeItem("isDashboardFirstRender");
    //   return initialAuthState;
    // }
    // case actionTypes.UserLoaded: {
    //   const { user } = action.payload;

    //   return { ...state, user };
    // }

    default:
      return state;
  }
}


export const actions = {
  addCategory: allcategories => ({ type: actionTypes.Add, payload: allcategories }),
  updateCategory: allcategories => ({ type: actionTypes.Update, payload: allcategories }),
  deleteCategory: allcategories => ({ type: actionTypes.Delete, payload: allcategories }),
  allCategories: allcategories => ({ type: actionTypes.GetAll, payload: allcategories }),
  // register: user => ({
  //   type: actionTypes.Register,
  //   payload: { user }
  // }),
  // logout: () => ({ type: actionTypes.Logout }),
  // requestUser: user => ({ type: actionTypes.UserRequested, payload: { user } }),
  // fulfillUser: user => ({ type: actionTypes.UserLoaded, payload: { user } })
};

export function* saga() {
  // yield takeLatest(actionTypes.Login, function* loginSaga() {
  //   yield put(actions.requestUser());
  // });

  // yield takeLatest(actionTypes.Register, function* registerSaga() {
  //   yield put(actions.requestUser());
  // });

  // yield takeLatest(actionTypes.UserRequested, function* userRequested() {
  //   const { data: user } = yield getUserByToken();

  //   yield put(actions.fulfillUser(user));
  // });
}
