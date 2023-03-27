
import React  from "react";
import {
    Routes,
    Route,
} from "react-router-dom";
import AppContent from "./AppContent"
import BookDetail from "./BookDetail"
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
                        <Route path="/book" Component={BookDetail} />
                        <Route path="/connexion" Component={Connexion} />
                        <Route path="/inscription" Component={Inscription} />
                    </Routes>
                </div>
            </div>
        );
    }
}

export default Main
