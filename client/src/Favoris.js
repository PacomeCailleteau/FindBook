
import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {NavLink} from "react-router-dom";
import Books from "./Books";
import userDAO from "./userDAO";

function Favoris (props){

    //state contenant les livres favoris
    const [books, setBooks] = useState([]);

    //cookies pour le token
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const token = cookies.token


    //TODO : ajouter la fonction pour récupérer les livres favoris
    //le useEffect est appelé quand le composant est créé
    //il doit être appelé avant le return même si celui ci est dans un if
    useEffect(() => {
        userDAO.getUserByToken(token).then(res => {
                if (Array.isArray(res)) {
                    setBooks(res);
                }
                console.log(res)
            }
        );
    }, []);


    //si le token est undefined alors on renvoie vers la page de connexion
    //attention token est une string donc on compare avec "undefined"
    if(token == "undefined"){
        return (
            <div className={"pas-connecte"}>
                <p>Vous n'êtes pas connecté, pour vous connecter <span><NavLink to="/connexion">cliquer ici.</NavLink></span></p>
            </div>
        )
    }

    /**
     * renvoie l'image associé au livre ou une image indisponible
     * @param obj
     * @returns {*|string}
     */
    function getImage(obj) {
        if ("cover" in obj){
            return obj.cover
        }
        //image non disponible
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Image_non_disponible_portrait.svg/1479px-Image_non_disponible_portrait.svg.png"
    }

    const fav = books.map((book, i) => {
        return (
            <Books key={i}
            isbn={book.isbn}
            titre={book.title}
            image={getImage(book)}
            />
        )
    })

    return(
        <div className={"mes-favoris"}>
            SALUT-->
            {cookies.token}
            {fav}
        </div>
    )
}

export default Favoris;












