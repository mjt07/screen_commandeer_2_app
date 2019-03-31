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

            <div className="divStyle">
                <h1 className="h2Style">Login</h1>
                <br/>

                <form>
                    <div>
                        <input
                            className="inputStyle"
                            type="text"
                            placeholder="Email"
                            value={this.props.email}
                            onChange={this.onEmailChange.bind(this)} />
                    </div>

                    <div>
                        <input
                            className="inputStyle"
                            type="password"
                            placeholder="Password"
                            value={this.props.password}
                            onChange={this.onPasswordChange.bind(this)} />
                    </div>

                    <br/>

                    <button
                        className="buttonStyle"
                        onClick={this.login.bind(this)}>Login</button>

                    {this.emailError()}

                    {this.loginError()}

                    {this.passwordError()}


                </form>

                <br/>

                <Link  to="/reset-password" >Forgot your password?</Link>

            </div>
        );
    }
}

function mapStateToProps(state) {
    const {email, password,  emailError, passwordError, error, isLoggedIn} = state.auth;
    return {email, password, emailError, passwordError, error, isLoggedIn};
}


export default connect(mapStateToProps, { emailChanged, passwordChanged, clearAuthState, loginUser })(Login);
