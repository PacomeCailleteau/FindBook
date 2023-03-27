import React, { Component } from "react";

import {
    Routes,
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";

import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader"
import AppContent from "./AppContent"
import Connexion from "./Connexion"
import Inscription from "./Inscription"


class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="content">
                    <Routes>
                        <Route exact path="/" Component={AppContent} />
                        <Route path="/search" Component={AppHeader} />
                        <Route path="/connexion" Component={Connexion} />
                        <Route path="/inscription" Component={Inscription} />
                    </Routes>
                </div>
            </div>
        );
    }
}

export default Main
