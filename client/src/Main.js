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


class Main extends Component {
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
                        <Route path="/S4" Component={AppContent} />
                    </Routes>
                </div>
            </div>
        );
    }
}

export default Main
