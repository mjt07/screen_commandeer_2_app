import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


// place reducers here
import AuthReducer from "./AuthReducer";
import ScreensReducer from "./ScreensReducer";

const rootReducer = combineReducers({
    auth: AuthReducer,
    screens: ScreensReducer
});

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

export default store;