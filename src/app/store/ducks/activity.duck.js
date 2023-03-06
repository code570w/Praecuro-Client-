import * as routerHelpers from "../../router/RouterHelpers";

export const actionTypes = {
  AllActivities : "[AllActivities] Action",
  Logout : "[Logout] Action",
};

const initialActivityState = {
  activities: [],
};

export const activityReducer = (state = initialActivityState, action) => {
    switch (action.type) {
      case actionTypes.AllActivities: {
        const activities = action.payload;
        return { ...state, activities: activities };
      }

      case actionTypes.Logout: {
        return initialActivityState;
      }

      default:
        return state;
    }
  }
// );

export const actions = {
  allActivities: activities => ({ type: actionTypes.AllActivities, payload: activities }),
  logout: () => ({ type: actionTypes.Logout }),
};

export function* saga() {
  // yield takeLatest(actionTypes.AllUsers, function* allUsersSaga() {
  //   yield put(actions.allUsers());
  // });

  // yield takeLatest(actionTypes.AddUser, function* addUserSaga() {
  //   yield put(actions.addUser());
  // });
}
