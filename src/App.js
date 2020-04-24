/** @format */

import React from "react";
import "./App.css";
import NewRegis from "./components/register/NewRegister";
import NewLogin from "./components/login/NewLogin";
import Index from "./components/dashboard/Index";
import PrivateRoute from "./components/PrivateRoute"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
    return (
        <React.Fragment>
                <Router>
                    <Switch>
                        <Route exact path="/register" component={NewRegis} />
                        <Route exact path="/login" component={NewLogin} />
                        <PrivateRoute path="/" component={Index} />
                    </Switch>
                </Router>
        </React.Fragment>
    );
}

export default App;
