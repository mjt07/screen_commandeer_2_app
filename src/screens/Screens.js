import React, { Component } from 'react';
import { connect } from 'react-redux';
import {has_role} from "../helpers";
import history from "../history";
import {fetch_screen_ads, playAds, stopPlayAds, adsFrequencyChanged} from "../actions";
import _ from "lodash";
import { Link } from 'react-router-dom'

class Screens extends  Component {


    componentWillMount(){

        const user = this.props.user;

        if(!has_role(user, 'ad_provider')){
            history.push('/dashboard');
        } else{
            this.props.fetch_screen_ads(user);
        }



    }


    componentDidUpdate(){

        if( document.getElementsByClassName("mySlides").length > 0 && this.props.playing ){
            this.showAds();
        }

    }


    showAds(){

        let slideIndex = 0;

        const frequency = this.props.frequency;

        showSlides();

        function showSlides() {
            let i;
            let slides = document.getElementsByClassName("mySlides");

            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            slideIndex++;
            if (slideIndex > slides.length) {slideIndex = 1}
            for (i = 0; i < slides.length; i++) {
                slides[i].className = slides[i].className.replace(" active", "");
            }
            slides[slideIndex-1].style.display = "block";
            slides[slideIndex-1].className += " active";
            let nested_child = slides[slideIndex-1].children[0];
            if(nested_child.tagName === "VIDEO"){
                nested_child.play();
            }
            setTimeout(showSlides, frequency ); // Change image every 2 seconds
        }

    }



    play_screen_ads(){


        const ads = this.props.screen_ads[this.props.selected_screen_id].ads;
        return ads.map(ad => {

            if(ad.file_type === "image"){
                return(
                    <div key={ad.id} className="mySlides fade">
                        <img src={ad.media_file_url} className="ad-image" />
                    </div>
                );
            }else{
                return(
                    <div key={ad.id} className="mySlides fade">
                        <video className="ad-video" >
                            <source src={ad.media_file_url} />
                        </video>
                    </div>
                );
            }



        });


    }

    startSlideShow(e){
        const screen_id = parseInt(e.target.dataset["screenid"]);
        this.props.playAds(screen_id);
    }

    render_screen_ads(){

        const screen_ads = this.props.screen_ads;

        console.log(screen_ads);


        if(!_.isEmpty(screen_ads)){


            const screen_ads_arr = _.values(screen_ads);

            return screen_ads_arr.map(screen_ad => {



                    return(

                        <div key={screen_ad.id}>

                            <h1>{screen_ad.screen_name}</h1>
                            <h3>{screen_ad.screen_address}</h3>

                            {
                                screen_ad.ads.map(ad => {
                                    return(
                                        <div key={ad.id}>
                                            <h4>{ad.name}</h4>
                                            <a href={ad.media_file_url}>View</a>
                                        </div>

                                    );
                                })
                            }

                            <button data-screenId={screen_ad.id} onClick={this.startSlideShow.bind(this)}>
                                Play
                            </button>


                        </div>


                    );


            });

        }
    }


    stopSlideShow(){
        this.props.stopPlayAds();
    }

    enterFullScreen(){
        const ads_player = document.getElementById("ads-player");
        ads_player.webkitRequestFullscreen();
    }

    adsFrequencyChanged(e){
        let freq = parseInt(e.target.value) * 1000;
        this.props.adsFrequencyChanged(freq);
    }

    render(){
        if(!this.props.playing){
            return(
                <div>

                    <div>

                        <h1>Screens</h1>

                        <div>

                            <span>Change ads every</span>

                            <input type="number"
                                   value ={this.props.frequency / 1000}
                                   onChange={this.adsFrequencyChanged.bind(this)}
                                   name="quantity"
                                   min="1"
                            />

                            <span> seconds</span>

                        </div>


                        <br/>

                        {this.render_screen_ads()}

                    </div>

                    <br/>

                    <Link to="/dashboard">Back</Link>


                </div>
            );
        }else{
            return(
                <div>

                    <div className="ads-container" id="ads-player">
                        {this.play_screen_ads()}
                    </div>

                    <div className="ads-player-button-container" >

                        <button onClick={this.stopSlideShow.bind(this)}>
                            Exit
                        </button>

                        <button onClick={this.enterFullScreen.bind(this)}>
                            Enter Full Screen
                        </button>



                    </div>



                </div>
            );

        }

    }

}

function mapStateToProps(state) {
    const {user} = state.auth;
    const {screen_ads, playing, selected_screen_id, frequency} = state.screens;
    return {user, screen_ads, playing, selected_screen_id, frequency};
}

export default connect(mapStateToProps, {fetch_screen_ads, playAds, stopPlayAds, adsFrequencyChanged})(Screens);