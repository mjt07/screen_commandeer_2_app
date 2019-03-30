import React, { Component } from 'react';
import { connect } from 'react-redux';
import {logoutUser} from "../actions/AuthActions";
import {has_role} from "../helpers";
import { Link } from 'react-router-dom'



class Dashboard extends  Component {

    logout() {
        this.props.logoutUser(this.props.user)
    }

    show_screens_path(){

        const user = this.props.user;

        if(has_role(user, 'ad_provider')){
            return(
                <Link to="/screens">My Screens</Link>
            );
        }

    }



    render(){
        return(
          <div>
              <h1>Dashboard</h1>

              <button onClick={this.logout.bind(this)}>
                  Logout
              </button>



              {this.show_screens_path()}

          </div>
        );
    }

}

function mapStateToProps(state) {
    const {user} = state.auth;
    return {user};
}

export default connect(mapStateToProps, { logoutUser })(Dashboard);