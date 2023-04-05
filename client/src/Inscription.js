import React from "react";
import "./Connexion.css"
import userDAO from "./userDAO"

import {
    NavLink, useNavigate,
} from "react-router-dom";
import {useCookies} from "react-cookie";



function Inscription (props) {

    //initialisation des cookies et de l'utilisateur
    const [cookies, setCookie, removeCookie] = useCookies(['token', {sameSite: "lax"}]);
    const nav = useNavigate()

    /**
     * crée un compte et le connecte
     * @param event
     * @returns {Promise<void>}
     */
    async function createAccount(event) {
        //!!!!important!!!!
        event.preventDefault();
        //on récupère les infos du form
        const loginInput = document.querySelector('#login');
        const passInput = document.querySelector('#pass1');
        const passConfInput = document.querySelector('#pass2');

        //on appelle de dao pour créer le user et on récupére la valeur de retour pour mettre le token dans le cookie
        const res = await userDAO.createUser(loginInput.value, passInput.value, passConfInput.value);

        // on écrit l'erreur dans le html (s'il n'y en a pas alors rien ne s'écrira dans le html)
        const err = document.querySelector('#error');
        err.innerHTML = res.message

        // on met à jour le cookie
        const tok = res.token
        setCookie("token", tok, {sameSite: "lax"})
        if (tok=== undefined) {
            removeCookie("token", {sameSite: "lax"})
        }else {
            nav("/")
        }
    }

    return (
        <div className="form_container">
            {/* form d'inscription */}
            <form name="sign_in" className="PageConnexion" onSubmit={createAccount} id="form">
                <h1>Inscription</h1>
                {/* on affiche l'erreur ici */}
                <div id="error"/>
                {/* les inputs */}
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

                {/* bouton d'envoi du formulaire */}
                <div>
                    <button type="submit" className="send">S'inscrire</button>
                </div>

                {/* bouton de reset des valeurs des inputs */}
                <div>
                    <button type="reset" className="send">Annuler les saisies</button>
                </div>

                {/* lien vers la page de connexion */}
                <p className="inscription">Vous avez déjà un compte? Je me <span><NavLink to="/connexion">connecte.</NavLink></span></p>
            </form>
        </div>
    );
}

export default Inscription
