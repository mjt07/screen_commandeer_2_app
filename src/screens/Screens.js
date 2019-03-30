import React, { Component } from 'react';
import { connect } from 'react-redux';
import {has_role} from "../helpers";
import history from "../history";
import {fetch_screen_ads} from "../actions";
import _ from "lodash";

class Screens extends  Component {


    componentWillMount(){


        const user = this.props.user;

        if(!has_role(user, 'ad_provider')){
            history.push('/dashboard');
        } else{
            this.props.fetch_screen_ads(user);
        }

    }


    render_screen_ads(){

        const screen_ads = this.props.screen_ads;


        if(!_.isEmpty(screen_ads)){

            return screen_ads.map(screen_ad => {

                return(

                    <div>

                        <h1>{screen_ad.screen_name}</h1>
                        <h3>{screen_ad.screen_address}</h3>

                        {
                            screen_ad.ads.map(ad => {
                                return(
                                    <div>
                                        <h4>{ad.name}</h4>
                                        <a href={ad.media_file_url}>View</a>
                                    </div>

                                );
                            })
                        }


                    </div>


                );

            });

        }
    }






    render(){
        return(
            <div>
                <h1>Screens</h1>
                {this.render_screen_ads()}
            </div>
        );
    }

}

function mapStateToProps(state) {
    const {user} = state.auth;
    const {screen_ads} = state.screens;
    return {user, screen_ads};
}

export default connect(mapStateToProps, {fetch_screen_ads})(Screens);