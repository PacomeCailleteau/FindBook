import {NavLink} from "react-router-dom";
import React, {useState} from "react";

function AppHeader() {

    return (
        <header className="header">
            <nav className="header-navbar">
                {/*TODO("rajouter les images")*/}
                {/*logo
                to="/" signifie qu'on renvoie sur la page par défaut*/}
                <NavLink to="/">
                    <img src="images/Logo.png" alt={"LOGO"}/>
                </NavLink>

                {/*accueil*/}
                <NavLink to="/">
                    <h2>Accueil</h2>
                </NavLink>

                {/*barre de recherche*/}
                <input type="text" placeholder=" Rechercher  ..." name="search"/>
                {/*TODO("remove this input (déplacer dans AppContent class Search : plus simple pour communiquer les informations et faire la recherche associé à ce qu'on a mis dans la barre)")*/}

                {/*Favoris*/}
                <div className="favoris">
                    <NavLink to="/favoris">
                        <img src="images/cadis.png" className="cart" alt=""/>
                        <h2>Favoris</h2>
                    </NavLink>
                </div>

                {/*Connexion | Mon compte*/}
                <div className="connexion">
                    <NavLink to="/connexion">
                        <img src="images/pers.png" className="pers" alt=""/>
                        <h2>Connexion</h2>
                    </NavLink>
                </div>
            </nav>
        </header>
    )
}

export default AppHeader;












