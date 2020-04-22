/** @format */

import React from "react";
import "./App.css";
import Regis from "./components/register/Register";
import Login from "./components/login/Login";
import Index from "./components/dashboard/Index";
import Dash from "./components/dashboard/Dashboard";
import Edit from "./components/dashboard/EditUser";
import Nav from "./components/dashboard/Nav";
import CssBaseline from "@material-ui/core/CssBaseline";
// import Typography from '@material-ui/core/Typography';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <React.Fragment>
            <Container fixed style={{ background: "pink" }}>
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Login />
                        </Route>
                        <Route exact path="/login">
                            <Login />
                        </Route>
                        <Route exact path="/register">
                            <Regis />
                        </Route>
                        <Route exact path="/dash">
                            <Dash />
                        </Route>
                        <Route exact path="/edituser">
                            <Edit />
                        </Route>
                        <Route path="/dashboard">
                            <Index />
                        </Route>
                    </Switch>
                </Router>
            </Container>
        </React.Fragment>
    );
}

export default App;
