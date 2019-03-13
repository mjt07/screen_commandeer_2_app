import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    CLEAR_AUTH_STATE,
    INVALID_EMAIL,
    CLEAR_LOGIN_FORM_MESSAGES,
    LOGIN_USER_FAILURE,
    INVALID_PASSWORD,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_SUCCESS
} from "../actions/types";

const INITIAL_STATE = {
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    error: '',
    isLoggedIn: false,
    user: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            return{
                ...state, email: action.payload
            };
        case PASSWORD_CHANGED:
            return{
                ...state, password: action.payload
            };
        case CLEAR_AUTH_STATE:
            return {
                ...state, email: '', password: '', emailError: '', passwordError: '', error: ''
            };
        case INVALID_EMAIL:
            return{
                ...state, emailError: 'Invalid Email'
            };
        case CLEAR_LOGIN_FORM_MESSAGES:
            return{
                ...state, emailError: '', passwordError: '', error: ''
            };
        case LOGIN_USER_FAILURE:
            return{
                ...INITIAL_STATE,
                error: action.payload
            };
        case INVALID_PASSWORD:
            return {
                ...state,
                password: '',
                passwordError: 'Password must be at least 8 characters long'
            };
        case LOGIN_USER_SUCCESS:
            return{ ...INITIAL_STATE, isLoggedIn: true, user: action.payload };
        case LOGOUT_USER_SUCCESS:

            return{
                ...INITIAL_STATE
            };
        default:
            return state;
    }
};