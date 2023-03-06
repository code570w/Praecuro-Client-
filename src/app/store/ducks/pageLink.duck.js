import * as routerHelpers from "../../router/RouterHelpers";

export const actionTypes = {
  AllPageLinks : "[AllPageLinks] Action",
  Logout : "[Logout] Action",
};

const initialPageLinkState = {
  banner: undefined,
  terms: undefined,
  privacy: undefined,
  contact: undefined,
};

export const pageLinkReducer = (state = initialPageLinkState, action) => {
    switch (action.type) {
      case actionTypes.AllPageLinks: {
        const {banner, terms, privacy, contact} = action.payload;
        return { ...state, banner: banner, terms: terms, privacy: privacy, contact: contact };
      }

      case actionTypes.Logout: {
        return initialPageLinkState;
      }

      default:
        return state;
    }
  }
// );

export const actions = {
  allPageLinks: pageLinks => ({ type: actionTypes.AllPageLinks, payload: pageLinks }),
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
