import React, { Component } from "react";
import "./Connexion.css"

import {
    Routes,
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";

import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader"
import AppContent from "./AppContent"


class Inscription extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="form_container">
                <form name="sign_in" class="PageConnexion" action="?" method="post" id="form">
                <h1>Inscription</h1>
                <p>
                    Votre prénom :<br />
                    <input type="text" name="prenom" id="firstname" placeholder="First name" required/>
                </p>
                <p>
                    Votre nom :<br />
                    <input type="text" name="nom" id="lastname" placeholder="Last name" required/>
                </p>
                <p>
                    Votre adresse mail :<br />
                    <input type="mail" name="mail" id="email" placeholder="Email" required/>
                </p>
                <p>
                    Votre mot de passe :<br />
                    <input type="password" name="pass" id="password" placeholder="Password" pattern="(?=^.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$" required/>
                </p>
                <p>
                    Confirmation mot de passe :<br />
                    <input type="password" name="pass_confirmation" id="password2" placeholder="Password Confirmation" pattern="(?=^.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$" required/>
                </p>
                <div>
                    <button type="submit" class="send">Envoyer</button>
                </div>
                <div>
                    <button type="reset" class="reset">Annuler</button>
                </div>
                <p class="inscription">Vous avez déjà un compte? Je me <span><NavLink to="/connexion">connecte.</NavLink></span></p>
                </form>
            </div>
        );
    }
}

export default Inscription
