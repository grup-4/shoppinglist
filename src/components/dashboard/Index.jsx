/** @format */

import React from "react";
import Dash from "./Dashboard";
import Nav from "./Nav";
import Profile from "./Profile";
import Edit from "./EditUser";
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
                <Route path={`${path}`}>
                    <Dash />
                </Route>
                <Route path="/profile">
                    <Profile />
                </Route>
                <Route path="/edituser">
                    <Edit />
                </Route>
            </Switch>
        </div>
    );
}

export default Index;
