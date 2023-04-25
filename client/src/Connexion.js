import React from "react";
import "./Connexion.css"

import {
    NavLink, useNavigate,
} from "react-router-dom"
import {useCookies} from "react-cookie";
import userDAO from "./userDAO";


function Connexion (props) {

    const [cookies, setCookie, removeCookie] = useCookies(['token', {sameSite: "lax"}]);
    const nav = useNavigate()

    //si le token est définie alors on renvoie l'utilisateur vers son compte
    if(token !== undefined){
        nav('/compte')
    }

    /**
     * connecte l'utilisateur et le redirige vers la page d'accueil
     * @param event
     * @returns {Promise<void>}
     */
    async function login(event){
        //!!!!important!!!!
        event.preventDefault();
        //on récupère les infos du form
        const loginInput = document.querySelector('#login');
        const passInput = document.querySelector('#pass');
        // on appelle le dao pour créer le user et on récupére la valeur de retour
        const res = await userDAO.login(loginInput.value, passInput.value)
        // on écrit l'erreur dans le html (s'il n'y en a pas alors rien ne s'écrira dans le html)
        const err = document.querySelector('#error');
        err.innerHTML = res.message
        // on met à jour le cookie
        const tok = res.token
        setCookie("token", tok, {sameSite: "lax"})
        // si le token est undefined alors on supprime le cookie, sinon on redirige vers la page d'accueil
        if (tok=== undefined) {
            removeCookie("token", {sameSite: "lax"})
        }else {
            nav("/")
        }
    }

    return (
        <div className="form_container">
            {/* form de connexion */}
            <form className="PageConnexion" onSubmit={login}>
                <h1>Se connecter</h1>

                {/* on affiche l'erreur ici */}
                <div id="error"/>

                {/* les inputs */}
                <div className="inputs">
                    <p>
                    Votre login :<br />
                    <input type="text" name="login" placeholder="Login" id={"login"} required />
                    </p>

                    <p>
                    Votre mot de passe :<br />
                    <input type="password" name="pass" id="pass" placeholder="Password" title="Password min 8 characters. At least one UPPERCASE and one lowercase letter" required/>
                    </p>
                </div>

                {/* bouton de confirmation */}
                <div>
                    <button type="submit" className="send" value="Sign Up">Se connecter</button>
                </div>

                {/* lien vers la page d'inscription */}
                <p className="inscription">Je n'ai pas de compte? Je m'en <span><NavLink to="/inscription">crée un.</NavLink></span></p>
            </form>
        </div>
    );
}

export default Connexion
