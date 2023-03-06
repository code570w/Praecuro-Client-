import { put, takeLatest } from "redux-saga/effects";
import * as routerHelpers from "../../router/RouterHelpers";

export const actionTypes = {
  AllShortCuts : "[AllShortCuts] Action",
  UpdateShortCut : "[UpdateShortCut] Action",
  Logout : "[Logout] Action",
};

const initialShortCutState = {
  shortcuts: [],
};

export const shortcutReducer = (state = initialShortCutState, action) => {
    switch (action.type) {
      case actionTypes.AllShortCuts: {
        const allShortCuts = action.payload;
        return { ...state, shortcuts: allShortCuts };
      }

      case actionTypes.UpdateShortCut: {
        const allShortCuts = action.payload;
        return { ...state, shortcuts: allShortCuts };
      }

      case actionTypes.Logout: {
        return initialShortCutState;
      }

      default:
        return state;
    }
}

export const actions = {
  allShortCuts: allShortCuts => ({ type: actionTypes.AllShortCuts, payload: allShortCuts }),
  updateShortCut: allShortCuts => ({ type: actionTypes.UpdateShortCut, payload: allShortCuts }),
  logout: () => ({ type: actionTypes.Logout }),
};

export function* saga() {
  // yield takeLatest(actionTypes.AllShortCuts, function* allShortCutsSaga() {
  //   yield put(actions.allShortCuts());
  // });

  // yield takeLatest(actionTypes.AddShortCut, function* addShortCutSaga() {
  //   yield put(actions.addShortCut());
  // });
}
