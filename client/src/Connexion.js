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


class Connexion extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="form_container">
                <form class="PageConnexion" action="<?=site_url('Connexion/login')?>" method="post">           
                    <h1>Se connecter</h1>

                    <div class="inputs">
                        <p>
                        Votre adresse mail :<br />
                        <input type="email" name="mail" placeholder="Email" required />
                        </p>

                        <p>
                        Votre mot de passe :<br />
                        <input type="password" name="pass" id="password" placeholder="Password" title="Password min 8 characters. At least one UPPERCASE and one lowercase letter" required/>
                        </p>
                    </div>

                    <div>
                        <button type="submit" class="send" value="Sign Up">Se connecter</button>
                    </div>
                    <p class="inscription">Je n'ai pas de compte? Je m'en <span><NavLink to="/inscription">crée un.</NavLink></span></p>
                </form>
            </div>
        );
    }
}

export default Connexion
