import {
    FETCH_SCREEN_ADS_SUCCESS
} from "../actions/types";

const INITIAL_STATE = {
    screen_ads: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_SCREEN_ADS_SUCCESS:
            return{
                ...state, screen_ads: action.payload
            };
        default:
            return state;
    }
};