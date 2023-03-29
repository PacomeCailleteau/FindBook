import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import userDAO from "./userDAO";
import "./Connexion.css"

function Compte (props){

    //initialisation des cookies et de l'utilisateur dans le state
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [user, setUser] = useState({});

    //est appelé quand le composant est créé
    useEffect(() => {
        //récupération des infos de l'utilisateur
        userDAO.getUserByToken(cookies.token).then(data => {
            setUser(data)
            console.log(data)
        });
    }, []);

    return(
        <div className={"mon-compte"}>

            <div className="PageConnexion">
                <form className="vertical" action="<?=site_url('Account/updateUserInfo')?>" method="post">
                    <p>Informations Personelles</p>
                    <p>
                        Pseudo :<br />
                        <input type="text" name="prenom" id="firstname" value={user.login} required/>
                    </p>
                    <div>
                        <button type="submit" class="send">Changer mon pseudo</button>
                    </div>
                </form>
                <form className="vertical" action="<?=site_url('Account/changePassword')?>" method="post">
                    <p>Vous désirez changer votre mot de passe?</p>
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
                        <button type="submit" class="send">Changer mon mot de passe</button>
                    </div>
                </form>
                <form className="vertical" action="<?=site_url('Connexion/logout')?>" method="post">
                    <div>
                    <button type="submit" class="send">Se déconnecter</button>
                    </div>
                </form>
                <form className="vertical" action="<?=site_url('Connexion/logout')?>" method="post">
                    <div>
                    <button type="submit" class="send">Supprimer mon compte</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Compte;












