import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import * as routerHelpers from "../../router/RouterHelpers";

const initialUserState = {
    nurses_details:[]
    // user:[]
}

export const nurses_detailsReducer = (state = initialUserState, action) => {
    // console.log('vvvvvaaa',action);
    switch (action.type) {
        case 'GET_NURSES_DETAILS': {
            const nurses_details = action;
            console.log('nurses_id',nurses_details);
            return { ...state, nurses_details: nurses_details};
          }

        //   case 'SET_ADMIN_ACCOUNT':{
        //     console.log('SET_ADMIN_ACCOUNT');
        //     const allUsers = action;
        //     return { ...state, user: allUsers };
        //   }

          default:
           return state;
    

    }


}

export const actions = {
    nursesDetailsDuck: nurses_details => ({ type: 'GET_NURSES_DETAILS', payload: { nurses_details } }),
}

