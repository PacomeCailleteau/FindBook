
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
import Compte from "./Compte";
import "./Main.css"

function Main (props) {

    return (
        <div>
            <div className="content">
                {/*
                C'est ici qu'on choisi quel composant on affiche en fonction de l'url.
                Ici, seul le composant central est concerné.
                Le header et le footer sont toujours affichés.
                */}
                <Routes>
                    {/* route par défaut, affiche la page d'accueil */}
                    <Route exact path="/" Component={AppContent} />
                    {/* route pour afficher le détail d'un livre */}
                    <Route exact path="/book" Component={BookDetail} />
                    {/* route pour afficher la page de connexion */}
                    <Route exact path="/connexion" element={<Connexion />} />
                    {/* route pour afficher la page d'inscription */}
                    <Route exact path="/inscription" element={<Inscription />} />
                    {/* route pour afficher la page des favoris */}
                    <Route exact path="/favoris" element={<Favoris />}/>
                    {/* route pour afficher la page du compte */}
                    <Route exact path="/compte" element={<Compte />}/>
                    {/* route pour afficher la page 404 */}
                    <Route path="*" element={<div className={"non"}>404: Not Found <span><NavLink to="/">Back to Home</NavLink></span> </div>} />
                </Routes>
            </div>
        </div>
    );
}

export default Main
