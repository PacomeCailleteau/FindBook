import React from "react";
import "./Connexion.css"

import {
    NavLink, useNavigate,
} from "react-router-dom"
import {useCookies} from "react-cookie";
import userDAO from "./userDAO";


function Connexion (props) {

    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const nav = useNavigate()

    async function login(event){
        //!!!!important!!!!
        event.preventDefault();
        //on récupère les infos du form
        const loginInput = document.querySelector('#login');
        const passInput = document.querySelector('#pass');
        const res = await userDAO.login(loginInput.value, passInput.value)
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
            <form className="PageConnexion" onSubmit={login}>
                <h1>Se connecter</h1>

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

                <div>
                    <button type="submit" className="send" value="Sign Up">Se connecter</button>
                </div>
                <p className="inscription">Je n'ai pas de compte? Je m'en <span><NavLink to="/inscription">crée un.</NavLink></span></p>
            </form>
        </div>
    );
}

export default Connexion
