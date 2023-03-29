import React from "react";
import "./Connexion.css"
import userDAO from "./userDAO"

import {
    NavLink,
} from "react-router-dom";
import {useCookies} from "react-cookie";



function Inscription (props) {

    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    async function createAccount(event) {
        //!!!!important!!!!
        event.preventDefault();
        //on récupère les infos du form
        const loginInput = document.querySelector('#login');
        const passInput = document.querySelector('#pass1');
        const passConfInput = document.querySelector('#pass2');
        //on appelle de dao pour créer le user et on récupére la valeur de retour pour mettre le token dans le cookie
        const res = await userDAO.createUser(loginInput.value, passInput.value, passConfInput.value);
        const tok = res.token
        setCookie("token", tok, {sameSite: "lax"})
        if (tok=== undefined) {
            removeCookie("token", {sameSite: "lax"})
        }
    }

    return (
        <div className="form_container">
            <form name="sign_in" className="PageConnexion" onSubmit={createAccount} id="form">
                <h1>Inscription</h1>
                <p>
                    Votre identifiant :<br />
                    <input type="text" name="login" id="login" placeholder="identifiant" required/>
                </p>
                <p>
                    Votre mot de passe :<br />
                    <input type="password" name="pass" id="pass1" placeholder="mot de passe" pattern="(?=^.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$" required/>
                </p>
                <p>
                    Confirmation mot de passe :<br />
                    <input type="password" name="pass_confirmation" id="pass2" placeholder="confirmation mot de passe" pattern="(?=^.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$" required/>
                </p>
                <div>
                    <button type="submit" className="send">S'inscrire</button>
                </div>
                <div>
                    <button type="reset" className="send">Annuler les saisies</button>
                </div>
                <p className="inscription">Vous avez déjà un compte? Je me <span><NavLink to="/connexion">connecte.</NavLink></span></p>
            </form>
        </div>
    );
}

export default Inscription
