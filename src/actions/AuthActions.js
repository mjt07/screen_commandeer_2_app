import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    CLEAR_AUTH_STATE,
    LOGIN_ROUTE,
    VALIDATE_TOKEN_ROUTE,
    INVALID_EMAIL,
    CLEAR_LOGIN_FORM_MESSAGES,
    LOGIN_USER_FAILURE,
    INVALID_PASSWORD,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_ROUTE,
    LOGOUT_USER_SUCCESS
} from "./types";


import axios from "axios";

import validator from "email-validator";
import history from "../history";

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const clearAuthState = () => {
    return {
        type: CLEAR_AUTH_STATE
    };
};

export const loginUser = (email, password ) => {


    return (dispatch) => {

        dispatch({type: CLEAR_LOGIN_FORM_MESSAGES});


        let canLogin = true;

        if(!validator.validate(email)){
            canLogin = false;
            dispatch({type: INVALID_EMAIL});
        }

        if(password.length < 8){
            canLogin = false;
            dispatch({type: INVALID_PASSWORD});
        }

        if(canLogin){


            axios.post(LOGIN_ROUTE, {
                email,
                password
            })
                .then( (response)  => {


                    const headers = response.headers;

                    const access_token = headers['access-token'];

                    const client = headers['client'];

                    const uid = headers['uid'];

                    const roles = response.data.data.roles;


                    let user = {
                        'access-token': access_token,
                        'client': client,
                        'uid': uid,
                        'roles': roles
                    };

                    const config = {
                        headers: {
                            "access-token": access_token,
                            "client": client,
                            "uid": uid
                        }
                    };

                    axios.get(VALIDATE_TOKEN_ROUTE, config)
                        .then((response) => {

                            dispatch({type: LOGIN_USER_SUCCESS, payload: user});

                            history.push('/dashboard');

                            // in the response you get info about user as well
                        }).catch((error) => {
                        console.log(error.response);
                    });
                    

                })
                .catch((error)  => {
                    const error_message = error.response.data.errors[0];
                    dispatch({type: LOGIN_USER_FAILURE, payload: error_message})
                });


        }




    }
};


export const logoutUser = (user) => {

    return (dispatch) => {

        const config = {
            headers: {
                "access-token": user["access-token"],
                "client": user["client"],
                "uid": user["uid"]
            }
        };

        axios.delete(LOGOUT_USER_ROUTE, config)
            .then((response) => {
                history.push('/');
                dispatch({type: LOGOUT_USER_SUCCESS});
            }).catch((error) => {
            console.log(error.response);
        });





    }

};