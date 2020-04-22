/** @format */

import React from "react";
import "./App.css";
import Regis from "./components/register/Register";
import Login from "./components/login/Login";
import Index from "./components/dashboard/Index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
    return (
        <React.Fragment>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Login}>
                            <Login />
                        </Route>
                        <Route exact path="/login">
                            <Login />
                        </Route>
                        <Route exact path="/register">
                            <Regis />
                        </Route>
                        <Route path="/dashboard">
                            <Index />
                        </Route>
                    </Switch>
                </Router>
        </React.Fragment>
    );
}

export default App;
