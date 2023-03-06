
const initialState = {
    nav: 'CHAT',
    navBackup: 'CHAT',
    main: 'WELCOME',
    mainBackup: 'WELCOME',
    panel: 'CHAT',
    panelBackup: 'CHAT',
    mobile: 'WELCOME',
};

export const viewReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_HOME':
            return {
                ...state, main: 'WELCOME', mobile: 'WELCOME',
            };
        case 'CREATE_ROOM_RESULT':
        case 'JOIN_ROOM_RESULT':
            return {
                ...state, main: 'ROOM', mainBackup: 'ROOM', mobile: 'ROOM'
            };
        case 'NAVIGATE':
            const { nav } = action;
            return {
                ...state, nav, panel: nav, mobile: 'PANEL',
            };
        // case Actions.SEARCH:
        //     if ([Views.CREATE_GROUP, Views.EDIT_GROUP, Views.RTC_GROUP_CREATE, Views.RTC_GROUP_ADD, Views.ADMIN].includes(state.panel)) return state;
        //     return {
        //         ...state,
        //         panel: Views.SEARCH,
        //         panelBackup: state.panel === Views.SEARCH ? state.panelBackup : state.panel,
        //         nav: Views.SEARCH,
        //         navBackup: state.panel === Views.SEARCH ? state.navBackup : state.nav,
        //     };
        case 'USER_LOGOUT':
            return initialState;
        default:
            return state;
    }
};
export const actions = {
    logout: () => ({ type: 'USER_LOGOUT' })
};
  
export function* saga() {
  }
  