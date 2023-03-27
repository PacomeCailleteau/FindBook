
import React  from "react";
import {
    Routes,
    Route,
} from "react-router-dom";
import AppContent from "./AppContent"
import BookDetail from "./BookDetail"


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
                        <Route path="/S4" Component={AppContent} />
                    </Routes>
                </div>
            </div>
        );
    }
}

export default Main
