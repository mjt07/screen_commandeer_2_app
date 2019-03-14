import React, { Component } from 'react';
import { connect } from 'react-redux';
import {logoutUser} from "../actions/AuthActions";
import {has_role} from "../helpers";

class Dashboard extends  Component {

    logout() {
        this.props.logoutUser(this.props.user)
    }

    show_screens() {

        const user = this.props.user;

        if(has_role(user, 'ad_provider')){
            return(
              <h1>User is ad provider</h1>
            );
        }

    }




    render(){
        return(
          <div>
              <h1>Dashboard</h1>
              {this.show_screens()}
              <button onClick={this.logout.bind(this)}>
                  Logout
              </button>
          </div>
        );
    }

}

function mapStateToProps(state) {
    const {user} = state.auth;
    return {user};
}

export default connect(mapStateToProps, { logoutUser })(Dashboard);