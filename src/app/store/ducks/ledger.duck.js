export const actionTypes = {
  AllLedgers : "[AllLedgers] Action",
  UpdateLedger : "[UpdateLedger] Action",
  Logout : "[Logout] Action",
};

const initialLedgerState = {
  ledgers: [],
};

export const ledgerReducer = (state = initialLedgerState, action) => {
    switch (action.type) {
      case actionTypes.AllLedgers: {
        const allLedgers = action.payload;
        return { ...state, ledgers: allLedgers };
      }

      case actionTypes.UpdateLedger: {
        const allLedgers = action.payload;
        return { ...state, ledgers: allLedgers };
      }

      case actionTypes.Logout: {
        return initialLedgerState;
      }

      default:
        return state;
    }
}

export const actions = {
  allLedgers: allLedgers => ({ type: actionTypes.AllLedgers, payload: allLedgers }),
  updateLedger: allLedgers => ({ type: actionTypes.UpdateLedger, payload: allLedgers }),
  logout: () => ({ type: actionTypes.Logout }),
};

export function* saga() {
  // yield takeLatest(actionTypes.AllLedgers, function* allLedgersSaga() {
  //   yield put(actions.allLedgers());
  // });

  // yield takeLatest(actionTypes.AddLedger, function* addLedgerSaga() {
  //   yield put(actions.addLedger());
  // });
}
