
import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import userDAO from "./userDAO";

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
            <div>Salut {user.login}</div>
        </div>
    )
}

export default Compte;












