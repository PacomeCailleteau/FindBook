
import React  from "react";
import {
    Routes,
    Route,
} from "react-router-dom";
import AppContent from "./AppContent"
import BookDetail from "./BookDetail"
import Connexion from "./Connexion"
import Inscription from "./Inscription"
import Favoris from "./Favoris";
import {useCookies} from "react-cookie";


function Main (props) {

    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    setCookie("token", "'salut à tous je suis le token cool'", {sameSite: "lax"})

    return (
        <div>
            <div className="content">
                <Routes>
                    <Route exact path="/" Component={AppContent} />
                    <Route exact path="/book" Component={BookDetail} />
                    <Route exact path="/connexion" element={<Connexion />} />
                    <Route exact path="/inscription" element={<Inscription />} />
                    <Route exact path="/favoris" element={<Favoris />}/>
                </Routes>
            </div>
        </div>
    );
}

export default Main
