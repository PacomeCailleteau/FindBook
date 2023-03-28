import React, { Component } from "react";
import "./Connexion.css"
import userDAO from "./userDAO"

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

    async createAccount() {
        const loginInput = document.querySelector('#login');
        const passInput = document.querySelector('#pass1');
        const passConfInput = document.querySelector('#pass2');
        const res = await userDAO.createUser(loginInput.value, passInput.value, passConfInput.value);
        console.log(res);
    }

    render() {
        return (
            <div className="form_container">
                <form name="sign_in" className="PageConnexion" onSubmit={this.createAccount} id="form">
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
                        <button type="submit" class="send">S'inscrire</button>
                    </div>
                    <div>
                        <button type="reset" class="send">Annuler les saisies</button>
                    </div>
                    <p class="inscription">Vous avez déjà un compte? Je me <span><NavLink to="/connexion">connecte.</NavLink></span></p>
                </form>
            </div>
        );
    }
}

export default Inscription
