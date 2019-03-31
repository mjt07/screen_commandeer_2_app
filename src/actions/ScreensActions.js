import {
   FETCH_SCREEN_ADS_SUCCESS,
    SCREEN_ADS_ROUTE,
    PLAY_ADS,
    STOP_PLAY_ADS,
    ADS_FREQUENCY_CHANGED
} from "./types";

import axios from "axios";

import _ from "lodash";


export const adsFrequencyChanged = (frequency) => {

    return(dispatch) => {
        dispatch({type: ADS_FREQUENCY_CHANGED, payload: frequency})
    };

};

export const stopPlayAds = () => {

    return(dispatch) => {
      dispatch({type: STOP_PLAY_ADS}) ;
    };

};


export const playAds = (selected_screen_id) => {
    return(dispatch) => {
        dispatch({type: PLAY_ADS, payload: selected_screen_id})

    };
};

export const fetch_screen_ads = (user) => {


    return (dispatch) => {

        const config = {
            headers: {
                "access-token": user["access-token"],
                "client": user["client"],
                "uid": user["uid"]
            }
        };

        axios.get(SCREEN_ADS_ROUTE, config)
            .then((response) => {

                let screen_ads = {};

                const screen_data = response.data.screen_ads;


                _.keys(screen_data).forEach(key => {


                        let screen_ad = {};

                        const screen = screen_data[key];

                        const screen_props = JSON.parse(screen.screen_props);

                        screen_ad.screen_name = screen_props.name;

                        screen_ad.screen_address = screen_props.address;

                        screen_ad.id = key;

                        let ads = [];

                        _.forEach(screen.ads, (ad => {

                            let ad_item = {};

                            ad = JSON.parse(ad);

                            ad_item.name = ad.ad_title;

                            ad_item.media_file_url = ad.media_file.url;

                            ad_item.id = ad.id;

                            ads.push(ad_item);

                        }));

                        screen_ad.ads = ads;

                        screen_ads[key] = screen_ad;

                    }
                );





                dispatch({type: FETCH_SCREEN_ADS_SUCCESS, payload: screen_ads});


            }).catch((error) => {
            console.log(error.response);
        });


    }

};