
import React  from "react";
import {
    Routes,
    Route, NavLink,
} from "react-router-dom";
import AppContent from "./AppContent"
import BookDetail from "./BookDetail"
import Connexion from "./Connexion"
import Inscription from "./Inscription"
import Favoris from "./Favoris";
import {useCookies} from "react-cookie";
import Compte from "./Compte";


function Main (props) {

    return (
        <div>
            <div className="content">
                <Routes>
                    <Route exact path="/" Component={AppContent} />
                    <Route exact path="/book" Component={BookDetail} />
                    <Route exact path="/connexion" element={<Connexion />} />
                    <Route exact path="/inscription" element={<Inscription />} />
                    <Route exact path="/favoris" element={<Favoris />}/>
                    <Route exact path="/compte" element={<Compte />}/>
                    <Route path="*" element={<div>404: Not Found <span><NavLink to="/">Back to Home</NavLink></span> </div>} />
                </Routes>
            </div>
        </div>
    );
}

export default Main
