import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import * as routerHelpers from "../../router/RouterHelpers";

export const actionTypes = {
  AllUsers: "[AllUsers] Action",
  AllCertifications: "[AllCertifications] Action",
  AllCertification_fronted: "[AllCertification_fronted] Action",
  AllNotifications: "[AllNotifications] Action",
  AddUser: "[AddUser] Action",
  UpdateUser: "[UpdateUser] Action",
  DeleteUser: "[DeleteUser] Action",
  Logout: "[Logout] Action",
  AddNurse: "[AddNurse] Action",
  UpdateNurse: "[UpdateNurse] Action",
  DeleteNurse: "[DeleteNurse] Action",
  AllNurses: "[AllNurses] Action",
  UpdateClient: "[UpdateClient] Action",
  DeleteClient: "[DeleteClient] Action",
  AllClients: "[AllClients] Action",
  SetCurUser: "[SetCurUser] Action",
  SetCurCertification: "[SetCurCertification] Action",
};

const initialUserState = {
  users: [],
  nurses: [],
  clients: [],
  curuser: {},
  curcertification: {},
  certifications: [],
  certifications_fronted: [],
  notifications: [],
};

// export const reducer = persistReducer(
//   { storage, key: "personal-user", whitelist: ["users"] },
//   (state = initialUserState, action) => {
export const userReducer = (state = initialUserState, action) => {
  // console.log('-------------ggg--------',action.payload);
  switch (action.type) {
    case actionTypes.AllUsers: {
      const { allUsers } = action.payload;
      return { ...state, users: allUsers };
    }

    case actionTypes.AddUser: {
      const { allUsers } = action.payload;
      return { ...state, users: allUsers };
    }
    case actionTypes.AllCertifications: {
      const certifications = action.payload;
      return { ...state, certifications: certifications };
    }
    case actionTypes.AllCertification_fronted: {
      const certifications_fronted = action.payload;
      return { ...state, certifications_fronted: certifications_fronted };
    }

    case actionTypes.AllNotifications: {
      const notifications = action.payload;
      return { ...state, notifications: notifications };
    }

    case actionTypes.UpdateUser: {
      const { allUsers } = action.payload;
      return { ...state, users: allUsers };
    }
    case actionTypes.DeleteUser: {
      const { allUsers } = action.payload;
      return { ...state, users: allUsers };
    }
    case actionTypes.SetCurUser: {
      const curuser = action.payload;
      return { ...state, curuser: curuser };
    }
    case actionTypes.SetCurCertification: {
      const curcertification = action.payload;
      return { ...state, curcertification: curcertification };
    }

    case actionTypes.Logout: {
      routerHelpers.forgotLastLocation();
      // window.logout = true;
      // window.socket.disconnect(true);
      localStorage.removeItem("token");
      return initialUserState;
    }

    case actionTypes.AddCertificaton: {
      const certifications = action.payload;
      return { ...state, certifications: certifications };
    }
    case actionTypes.DeleteCertificaton: {
      const certifications = action.payload;
      return { ...state, certifications: certifications };
    }
    case actionTypes.UpdateCertificaton: {
      const certifications = action.payload;
      return { ...state, certifications: certifications };
    }

    case actionTypes.AddNurse: {
      const nurses = action.payload;
      return { ...state, nurses: nurses };
    }
    case actionTypes.DeleteNurse: {
      const nurses = action.payload;
      return { ...state, nurses: nurses };
    }
    case actionTypes.UpdateNurse: {
      const nurses = action.payload;
      return { ...state, nurses: nurses };
    }
    case actionTypes.AllNurses: {
      const nurses = action.payload;
      return { ...state, nurses: nurses };
    }

    case actionTypes.AddClient: {
      const clients = action.payload;
      console.log("Add Client", clients);
      return { ...state, clients: clients };
    }
    case actionTypes.DeleteClient: {
      const clients = action.payload;
      return { ...state, clients: clients };
    }
    case actionTypes.UpdateClient: {
      const clients = action.payload;
      return { ...state, clients: clients };
    }
    case actionTypes.AllClients: {
      const clients = action.payload;
      return { ...state, clients: clients };
    }
    default:
      return state;
  }
};
// );

export const actions = {
  allUsers: (allUsers) => ({
    type: actionTypes.AllUsers,
    payload: { allUsers },
  }),
  addUser: (allUsers) => ({ type: actionTypes.AddUser, payload: { allUsers } }),
  updateUser: (allUsers) => ({
    type: actionTypes.UpdateUser,
    payload: { allUsers },
  }),
  deleteUser: (allUsers) => ({
    type: actionTypes.DeleteUser,
    payload: { allUsers },
  }),
  setCurUser: (curuser) => ({ type: actionTypes.SetCurUser, payload: curuser }),
  setCurCertification: (curcertification) => ({
    type: actionTypes.SetCurCertification,
    payload: curcertification,
  }),

  addNurse: (nurses) => ({ type: actionTypes.AddNurse, payload: nurses }),
  updateNurse: (nurses) => ({ type: actionTypes.UpdateNurse, payload: nurses }),
  deleteNurse: (nurses) => ({ type: actionTypes.DeleteNurse, payload: nurses }),
  allNurses: (nurses) => ({ type: actionTypes.AllNurses, payload: nurses }),

  addCertification: (certifications) => ({
    type: actionTypes.AddCertificaton,
    payload: certifications,
  }),
  updateCertification: (certifications) => ({
    type: actionTypes.UpdateCertificaton,
    payload: certifications,
  }),
  deleteCertification: (certifications) => ({
    type: actionTypes.DeleteCertificaton,
    payload: certifications,
  }),
  allCertifications: (certifications) => ({
    type: actionTypes.AllCertifications,
    payload: certifications,
  }),
  allCertifications_fronted: (certifications_fronted) => ({
    type: actionTypes.AllCertification_fronted,
    payload: certifications_fronted,
  }),
  allNotifications: (notifications) => ({
    type: actionTypes.AllNotifications,
    payload: notifications,
  }),

  addClient: (clients) => ({ type: actionTypes.AddClient, payload: clients }),

  updateClient: (clients) => ({
    type: actionTypes.UpdateClient,
    payload: clients,
  }),
  deleteClient: (clients) => ({
    type: actionTypes.DeleteClient,
    payload: clients,
  }),
  allClients: (clients) => ({ type: actionTypes.AllClients, payload: clients }),

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
