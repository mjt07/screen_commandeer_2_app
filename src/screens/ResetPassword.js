import React, { Component } from 'react';
import { connect } from 'react-redux';
import {emailChanged, clearAuthState} from "../actions/AuthActions";
import { Link } from 'react-router-dom'

class ResetPassword extends Component{


    componentWillUnmount(){
        this.props.clearAuthState();
    }

    onEmailChange(e){
        const email = e.target.value;
        this.props.emailChanged(email);
    }

    render()
    {
        return(

            <div>

                <h2>Reset Password</h2>

                <form>

                    <div>
                        <label>Email</label><br/>
                        <input
                            type="text"
                            value={this.props.email}
                            onChange={this.onEmailChange.bind(this)} />
                    </div>

                    <br/>

                    <button>Submit</button>

                    <br/>

                    <Link to="/">Login</Link>

                </form>


            </div>

        );
    }

}

function mapStateToProps(state) {
    const {email} = state.auth;
    return {email};
}


export default connect(mapStateToProps, { emailChanged, clearAuthState })(ResetPassword);