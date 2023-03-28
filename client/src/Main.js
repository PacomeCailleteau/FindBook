
import React  from "react";
import {
    Routes,
    Route, useLocation,
} from "react-router-dom";
import AppContent from "./AppContent"
import BookDetail from "./BookDetail"
import Connexion from "./Connexion"
import Inscription from "./Inscription"
import Favoris from "./Favoris";


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: null
        }
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
                        <Route path="/amazon" Component={() => {window.location.href=`https://www.amazon.fr/s?k=`+useLocation().state.isbn; return null}} />
                        <Route path="/favoris/:id" element={<Favoris/>}/>
                    </Routes>
                </div>
            </div>
        );
    }
}

export default Main
