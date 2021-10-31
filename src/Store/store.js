import { combineReducers, createStore } from 'redux';
import userReducer from '../features/userReducer';
import loginReducer from '../features/login';

const reduxDevtools =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();

const reducer = combineReducers({
    user: userReducer,
    login: loginReducer,
});

export const store = createStore(reducer, reduxDevtools);

//store.subscribe(console.log(store.getState()));
