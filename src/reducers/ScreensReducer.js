import {
    FETCH_SCREEN_ADS_SUCCESS,
    PLAY_ADS,
    STOP_PLAY_ADS,
    ADS_FREQUENCY_CHANGED
} from "../actions/types";

const INITIAL_STATE = {
    screen_ads: {},
    playing: false,
    selected_screen_id: null,
    frequency: 10000
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADS_FREQUENCY_CHANGED:
            return{
                ...state, frequency: action.payload
            };
        case FETCH_SCREEN_ADS_SUCCESS:
            return{
                ...state, screen_ads: action.payload
            };
        case PLAY_ADS:
            return{
                ...state, playing: true, selected_screen_id: action.payload
            };
        case STOP_PLAY_ADS:
            return{
                ...state, playing: false, selected_screen_id: null, frequency: 10000
            };
        default:
            return state;
    }
};