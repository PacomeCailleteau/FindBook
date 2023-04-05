import {NavLink} from "react-router-dom";
import React from "react";
import './AppHeader.css';
import {useCookies} from "react-cookie";

function AppHeader() {

    const [cookies, setCookie, removeCookie] = useCookies(['token', {sameSite: "lax"}]);

    /**
     * récupère le token stocké dans les cookies, s'il est à "undefined" ça veut dire qu'on est pas conencté alors on affiche connexion, sinon on affiche mon compte
     * la différence des deux return est dans le lien de redirection et le texte affiché. La structure et l'image sont les mêmes
     * @returns {JSX.Element}
     */
    function compte(){
        if(cookies.token === undefined){
            return (
                <div className="connexion">
                    <NavLink to="/connexion">
                        <img src="https://cdn.discordapp.com/attachments/1081164623044157530/1088854177024843776/PP.png" className="pers" alt=""/>
                        <h2>Connexion</h2>
                    </NavLink>
                </div>
            )
        }else{
            return (
                <div className="connexion">
                    <NavLink to="/compte">
                        <img src="https://cdn.discordapp.com/attachments/1081164623044157530/1088854177024843776/PP.png" className="pers" alt=""/>
                        <h2>Mon compte</h2>
                    </NavLink>
                </div>
            )
        }
    }

    return (
        <header className="header">
            <nav className="header-navbar">

                {/*Favoris*/}
                <div className="favoris">
                    <NavLink to="/favoris">
                        <img src="https://cdn.discordapp.com/attachments/1081164623044157530/1088854177238745209/star_2.png" className="cart" alt=""/>
                        <h2>Favoris</h2>
                    </NavLink>
                </div>

                {/*logo to="/" signifie qu'on renvoie sur la page par défaut*/}
                <NavLink to="/">
                    <img src="https://cdn.discordapp.com/attachments/1081164623044157530/1088854052768579644/Logo_Findbook.png" alt={"LOGO"}/>
                </NavLink>

                {/*Connexion | Mon compte
                ça dépend de si on est connecté ou pas (cf fonction compte() du dessus)*/}
                {compte()}
            </nav>
        </header>
    )
}

export default AppHeader;












