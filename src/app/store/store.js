import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore } from "redux-persist";

import { rootReducer, rootSaga } from "./rootDuck";

function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('personal', serializedState)
    }catch(e){
        console.log(e);
    }
  }
  
  function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem('personal')
        if(serializedState === null) return undefined
        return JSON.parse(serializedState)
    }catch (e) {
        console.log(e)
        return undefined
    }
  }
  
  const persistedState = loadFromLocalStorage()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    persistedState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);
const unsubscribe = store.subscribe(() => {
    const state = store.getState();
    saveToLocalStorage(state);
  });
/**
 * @see https://github.com/rt2zz/redux-persist#persiststorestore-config-callback
 * @see https://github.com/rt2zz/redux-persist#persistor-object
 */
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default store;
