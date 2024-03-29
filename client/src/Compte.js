import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import userDAO from "./userDAO";
import "./Connexion.css"
import {useNavigate} from "react-router-dom";

function Compte (props){

    //initialisation des cookies et de l'utilisateur dans le state
    // on ne stocke que le token dans le cookie user
    const [cookies, setCookie, removeCookie] = useCookies(['token', {sameSite: "lax"}]);
    const [user, setUser] = useState({});
    const nav = useNavigate()

    //est appelé quand le composant est créé
    useEffect(() => {
        //récupération des infos de l'utilisateur
        userDAO.getUserByToken(cookies.token).then(data => {
            setUser(data)
        });
    }, []);

    //si le token est undefined alors on affiche un message pour dire que l'utilisateur n'est pas connecté et un lien pour aller sur la page de connexion
    if(token == undefined){
        return (
            <div className={"pas-connecte"}>
                <p>Vous n'êtes pas connecté, pour vous connecter <span><NavLink to="/connexion">cliquer ici.</NavLink></span></p>
            </div>
        )
    }

    /**
     * supprime le compte de l'utilisateur et le redirige vers la page d'accueil
     */
    function deleteUser () {
        userDAO.deleteUser(cookies.token).then(data => {
            removeCookie('token')
            nav('/')
        });
    }

    /**
     * déconnecte l'utilisateur et le redirige vers la page d'accueil
     */
    function deconnection () {
        removeCookie('token')
        nav('/')
    }

    /**
     * change le mot de passe de l'utilisateur
     * @param event
     */
    function changePass (event) {
        event.preventDefault();

        //on récupère les infos du form
        const loginInput = document.querySelector('#firstname');
        const passInput = document.querySelector('#password');
        const passNewInput = document.querySelector('#password1');
        const passConfInput = document.querySelector('#password2');

        //on appelle le dao pour créer le user et on récupére la valeur de retour pour mettre le token dans le cookie
        //on prend le placeholder car on est sur qu'il correspond à la valeur actuelle du login
        userDAO.changePass(loginInput.placeholder, cookies.token, passInput.value, passNewInput.value, passConfInput.value)
            .then(data => {
                // s'il n'y a pas d'erreur on met à jour le cookie
                if (!(data.error)) {
                    removeCookie('token', {sameSite: "lax"})
                    setCookie("token", data.token, {sameSite: "lax"})
                    setUser(data)
                    loginInput.placeholder = data.login
                    // on affiche dans la div msg un message disant que le pass a été changé
                    document.getElementById("msg").innerHTML = "Votre mot de passe a été changé"
                }
                // on vide les champs du form
                passInput.value = ""
                passNewInput.value = ""
                passConfInput.value = ""
            });
    }

    /**
     * permet de changer le login de l'utilisateur
     * @param event
     */
    function changeLogin (event) {
        event.preventDefault();
        //on récupère les infos du form
        const loginInput = document.querySelector('#firstname');
        //on appelle de dao pour créer le user et on récupére la valeur de retour pour mettre le token dans le cookie
        userDAO.changeLogin(cookies.token, loginInput.value)
            .then(data => {
                if (data.login === loginInput.value) {
                    setUser(data)
                    loginInput.placeholder = data.login
                }
                loginInput.value = ""
            });
    }

    return(
        <div className={"mon-compte"}>

            {/*formulaire de changement de pseudo*/}
            <div className="PageConnexion">
                <form className="vertical" onSubmit={changeLogin}>
                    <p>Informations Personelles</p>
                    <p>
                        Pseudo :<br />
                        <input type="text" name="prenom" id="firstname" placeholder={user.login} required/>
                    </p>
                    <div>
                        <button type="submit" className="send">Changer mon pseudo</button>
                    </div>
                </form>

                {/*formulaire de changement de mot de passe*/}
                <form className="vertical" onSubmit={changePass}>
                    <p>Vous désirez changer votre mot de passe?</p>
                    <div id={"error"}/>
                    <p>
                        Mot de passe actuel:<br />
                    <input type="password" name="pass" id="password" placeholder="mot de passe actuel" />
                    </p>
                    <p>
                        Nouveau mot de passe:<br />
                    <input type="password" name="new_pass" id="password1" placeholder="nouveau mot de passe" />
                    </p>
                    <p>
                        Confirmation:<br />
                    <input type="password" name="pass_confirmation" id="password2" placeholder="confirmation mot de passe" />
                    </p>
                    <div>
                        <button type="submit" className="send">Changer mon mot de passe</button>
                    </div>
                </form>

                {/*bouton de déconnection*/}
                <div>
                    <button onClick={deconnection} type="submit" className="send">Se déconnecter</button>
                </div>

                {/*bouton de suppression de compte*/}
                <div>
                    <button onClick={deleteUser} type="submit" className="send">Supprimer mon compte</button>
                </div>
            </div>
        </div>
    )
}

export default Compte;












