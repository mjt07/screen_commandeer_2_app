import React, { Component } from 'react';
import { connect } from 'react-redux';
import {emailChanged, passwordChanged, clearAuthState, loginUser} from "../actions/AuthActions";
import { Link } from 'react-router-dom';


class Login extends Component{


    componentWillUnmount(){
        this.props.clearAuthState();
    }

    componentWillMount(){
        if(this.props.isLoggedIn){
            this.props.history.push("/dashboard");
        }
    }


    onEmailChange(e){
        const email = e.target.value;
        this.props.emailChanged(email);
    }

    onPasswordChange(e){
        const password = e.target.value;
        this.props.passwordChanged(password);
    }

    login(e){
        e.preventDefault();
        const {email, password, loginUser} = this.props;
        loginUser(email, password, history);
    }

    emailError(){

        if(this.props.emailError !== ""){
                    return(
                        <p>{this.props.emailError}</p>
                    );
        }

    }

    loginError(){
        const error = this.props.error;
        if(error.length > 0){
            return(
                <p>{error}</p>
            );
        }
    }

    passwordError(){
        const passwordError = this.props.passwordError;
        if(passwordError !== ""){
            return (
              <p>{passwordError}</p>
            );
        }
    }

    render()
    {
        return(

            <div>

                <h2>Login</h2>

                <form>


                    <div>
                        <label>Email</label><br/>
                        <input
                            type="text"
                            value={this.props.email}
                            onChange={this.onEmailChange.bind(this)} />
                    </div>


                    <div>
                        <label>Password</label><br/>
                        <input
                            type="password"
                            value={this.props.password}
                            onChange={this.onPasswordChange.bind(this)} />
                    </div>

                    <br/>


                    <button
                        onClick={this.login.bind(this)}
                    >Login</button>

                    {this.emailError()}


                    {this.loginError()}

                    {this.passwordError()}





                </form>

                <Link to="/reset-password" >Forgot your password?</Link>



            </div>

        );
    }
}

function mapStateToProps(state) {
    const {email, password,  emailError, passwordError, error, isLoggedIn} = state.auth;
    return {email, password, emailError, passwordError, error, isLoggedIn};
}

export default connect(mapStateToProps, { emailChanged, passwordChanged, clearAuthState, loginUser })(Login);
