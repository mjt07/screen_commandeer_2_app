// AUTH ACTION TYPES

export const EMAIL_CHANGED = 'email_changed';
export const PASSWORD_CHANGED = 'password_changed';
export const CLEAR_AUTH_STATE = 'clear_auth_state';
export const LOGIN_ROUTE = 'http://192.168.1.106:3000/auth_api/v1/auth/sign_in';
export const VALIDATE_TOKEN_ROUTE = 'http://192.168.1.106:3000/auth_api/v1/auth/validate_token';
export const INVALID_EMAIL = 'invalid_email';
export const CLEAR_LOGIN_FORM_MESSAGES = 'clear_login_form_messages';
export const LOGIN_USER_FAILURE = 'login_user_failure';
export const INVALID_PASSWORD = 'invalid_password';
export const LOGIN_USER_SUCCESS = 'login_user_success';
export const LOGOUT_USER_SUCCESS = 'logout_user_success';
export const LOGOUT_USER_ROUTE = "http://192.168.1.106:3000/auth_api/v1/auth/sign_out";

// SCREEN ACTION TYPES

export const FETCH_SCREEN_ADS_SUCCESS = 'fetch_screen_ads_success';
export const SCREEN_ADS_ROUTE = 'http://192.168.1.106:3000/get-screen-ads';
export const PLAY_ADS = 'play_ads';
export const STOP_PLAY_ADS = 'stop_play_ads';
export const ADS_FREQUENCY_CHANGED = 'ads_frequency_changed';