import {HashRouter, NavLink} from "react-router-dom";
import React from "react";
import './AppHeader.css';

function AppHeader() {
    return (
        <header className="header">
            <nav className="header-navbar">
                {/*logo
                to="/" signifie qu'on renvoie sur la page par défaut*/}
                <NavLink to="/">
                    <img src="https://cdn.discordapp.com/attachments/1081164623044157530/1088854052768579644/Logo_Findbook.png" alt={"LOGO"}/>
                </NavLink>

                {/*accueil*/}
                <NavLink to="/">
                    <h2>Accueil</h2>
                </NavLink>

                {/*barre de recherche*/}
                <div className="search">
                    <input type="text" placeholder=" Rechercher  ..." name="search"/>
                    {/*TODO("add onClick function")*/}
                </div>

                {/*Favoris*/}
                <div className="favoris">
                    <NavLink to="/favoris">
                        <img src="https://cdn.discordapp.com/attachments/1081164623044157530/1088854177238745209/star_2.png" className="cart" alt=""/>
                        <h2>Favoris</h2>
                    </NavLink>
                </div>

                {/*Connexion | Mon compte*/}
                <div className="connexion">
                    <NavLink to="/connexion">
                        <img src="https://cdn.discordapp.com/attachments/1081164623044157530/1088854177024843776/PP.png" className="pers" alt=""/>
                        <h2>Connexion</h2>
                    </NavLink>
                </div>
            </nav>
        </header>
    )
}

export default AppHeader;












