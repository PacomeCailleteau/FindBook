import React, { Component } from "react";

import {
    Routes,
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";

import appFooter from "./footer";
import appHeader from "./header"
import appContent from "./content"


class Main extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div className="content">
                    <Routes>
                        <Route exact path="/" Component={appContent} />
                        <Route path="/search" Component={appHeader} />
                        <Route path="/S4" Component={appContent} />
                    </Routes>
                </div>
            </div>
        );
    }
}

export default Main
