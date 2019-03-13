import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './reducers';

import Login from "./screens/Login";
import ResetPassword from "./screens/ResetPassword";
import Dashboard from "./screens/Dashboard";


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div className="app">
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/reset-password" component={ResetPassword} />
                    <Route path="/dashboard" component={Dashboard} />
                </Switch>
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);

