import React, { Component } from 'react';
import { connect } from 'react-redux';
import {logoutUser} from "../actions/AuthActions";


class Dashboard extends  Component{

    logout(){
        this.props.logoutUser(this.props.user)
    }

    render(){
        return(
          <div>
              <h1>Dashboard</h1>
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