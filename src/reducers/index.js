import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


// place reducers here
import AuthReducer from "./AuthReducer";

const rootReducer = combineReducers({
    auth: AuthReducer
});

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

export default store;