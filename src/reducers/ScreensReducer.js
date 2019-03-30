import {
    FETCH_SCREEN_ADS_SUCCESS,
    PLAY_ADS
} from "../actions/types";

const INITIAL_STATE = {
    screen_ads: {},
    playing: false,
    selected_screen_id: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_SCREEN_ADS_SUCCESS:
            return{
                ...state, screen_ads: action.payload
            };
        case PLAY_ADS:
            return{
                ...state, playing: true, selected_screen_id: action.payload
            };
        default:
            return state;
    }
};