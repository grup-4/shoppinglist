/** @format */

import React from "react";
import Dash from "./Dashboard";
import Nav from "./Nav";
import Profile from "./Profile";
import {
    Route,
    Switch,
    useRouteMatch,
} from "react-router-dom";

function Index() {
    let { path } = useRouteMatch();
    return (
        <div>
            <Nav />
            <Switch>
                <Route exact path={`${path}`}>
                    <Dash />
                </Route>
                <Route exact path="/profile">
                    <Profile />
                </Route>
            </Switch>
        </div>
    );
}

export default Index;
