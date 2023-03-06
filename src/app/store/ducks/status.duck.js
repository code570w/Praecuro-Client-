const initialState = {
    online: [],
    busy: [],
    away: [],
    available: [],
    focus: true,
};

const remove = (array, element) => {
    let result = [...array];
    if (result.includes(element)) result.splice(result.indexOf(element), 1);
    return result;
};

export const statusReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'STATUS_LIST':
            return {
                ...state,
                online: action.data.online,
                busy: action.data.busy,
                away: action.data.away,
                available: action.data.available,
            };
        case 'STATUS_ONLINE':
            return {
                ...state,
                online: state.online.includes(action.data) ? state.online : [...state.online, action.data],
                busy: remove(state.busy, action.data),
                away: remove(state.away, action.data),
            };
        case 'STATUS_OFFLINE':
            return {
                ...state,
                online: remove(state.online, action.data),
                busy: remove(state.busy, action.data),
                away: remove(state.away, action.data),
                available: remove(state.available, action.data),
            };
        case 'STATUS_BUSY':
            return {
                ...state,
                busy: state.busy.includes(action.data) ? state.busy : [...state.busy, action.data],
                online: remove(state.online, action.data),
                away: remove(state.away, action.data),
            };
        case 'STATUS_AWAY':
            return {
                ...state,
                away: state.away.includes(action.data) ? state.away : [...state.away, action.data],
                online: remove(state.online, action.data),
                busy: remove(state.busy, action.data),
            };
        case 'STATUS_AVAILABLE':
            return {
                ...state,
                available: state.available.includes(action.data) ? state.available : [...state.available, action.data],
            };
        case 'STATUS_FOCUS':
            return {
                ...state, focus: true,
            };
        case 'STATUS_LOST_FOCUS':
            return {
                ...state, focus: false,
            };
            case 'USER_LOGOUT':
                return initialState;
        default:
            return state;
    }
};

export const actions = {

    logout: () => ({ type: 'USER_LOGOUT' }),
  };
  
  export function* saga() {
  }