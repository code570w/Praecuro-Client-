import * as routerHelpers from "../../router/RouterHelpers";

export const actionTypes = {
  AllCurrentStates : "[AllCurrentStates] Action",
  Logout : "[Logout] Action",
  SetSortStatus: "[SetSortStatus] Action",
  SetSelectedTabKey: "[SetSelectedTabKey] Action",
  SetManagementTabIndex: "[SetManagementTabIndex] Action",
};

const initialCurrentStateState = {
  pageIndex: 0,
  isLinkShow: true,
  sortStatus: {columnIndex: 0, status: true},     //columnIndex -> 0:Created Date, 1:Company Name, 2:Full Name, ..., 8: Company Status  // status -> true: asc, false: desc
  selectedTabKey: 4,                              
  managementTabIndex: 0,    // 0: default, 1: all companies, 2: new users, 3: Account, 6: Expensive
};

export const currentStateReducer = (state = initialCurrentStateState, action) => {
    switch (action.type) {
      case actionTypes.AllCurrentStates: {
        const { pageIndex, isLinkShow, managementTabIndex } = action.payload;
        return { ...state, pageIndex, isLinkShow, managementTabIndex };
      }

      case actionTypes.SetSortStatus: {
        return {...state, sortStatus: action.payload};
      }

      case actionTypes.SetSelectedTabKey: {
        return {...state, selectedTabKey: action.payload};
      }

      case actionTypes.SetManagementTabIndex: {
        return {...state, managementTabIndex: action.payload}
      }
      
      case actionTypes.Logout: {
        routerHelpers.forgotLastLocation();
        return initialCurrentStateState;
      }

      default:
        return state;
    }
  }
// );

export const actions = {
  allCurrentStates: allCurrentStates => ({ type: actionTypes.AllCurrentStates, payload: allCurrentStates }),
  setSortStatus: currentSortStatus => ({type: actionTypes.SetSortStatus, payload: currentSortStatus}),
  setSelectedTabKey: key => ({type: actionTypes.SetSelectedTabKey, payload: key}),
  setManagementTabIndex: tabIndex => ({type: actionTypes.SetManagementTabIndex, payload: tabIndex}),
  logout: () => ({ type: actionTypes.Logout }),
};

export function* saga() {
  // yield takeLatest(actionTypes.AllCurrentStates, function* allCurrentStatesSaga() {
  //   yield put(actions.allCurrentStates());
  // });

  // yield takeLatest(actionTypes.AddCurrentState, function* addCurrentStateSaga() {
  //   yield put(actions.addCurrentState());
  // });
}
