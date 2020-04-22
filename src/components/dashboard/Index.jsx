/** @format */

import React from "react";
import Dash from "./Dashboard";
import Nav from "./Nav";
import Modal from "./ModalEditUser";
import Edit from "./EditUser";
import { BrowserRouter as Router, Route, Switch, useRouteMatch } from "react-router-dom";

function Index() {
    let { path } = useRouteMatch();
    console.log(path, "path")
    return (
        <div>
            <Nav />
            {/* <Dash />
            <Modal /> */}
            <Switch>
                <Route path={`${path}/dashboard`}>
                    <Dash />
                </Route>
                <Route path={`${path}/edituser`}>
                    {/* <h1>Hallo edit</h1> */}
                    <Edit />
                </Route>
            </Switch>
        </div>
    );
}

export default Index;
