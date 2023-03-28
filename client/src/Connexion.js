import React from "react";
import "./Connexion.css"

import {
    NavLink,
} from "react-router-dom"
import {useCookies} from "react-cookie";


function Connexion (props) {

    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    //TODO("on dans le cookie le user quand il se connecte --> setCookie("token", tokenvalue)")

    return (
        <div className="form_container">
            <form className="PageConnexion" action="<?=site_url('Connexion/login')?>" method="post">
                <h1>Se connecter</h1>

                <div className="inputs">
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
                    <button type="submit" className="send" value="Sign Up">Se connecter</button>
                </div>
                <p className="inscription">Je n'ai pas de compte? Je m'en <span><NavLink to="/inscription">crée un.</NavLink></span></p>
            </form>
        </div>
    );
}

export default Connexion
