
import React, {useEffect, useState} from "react";
import {NavLink, useLocation} from "react-router-dom";
import bookDAO from "./bookDAO"
import "./BookDetail.css"
import userDAO from "./userDAO";
import {useCookies} from "react-cookie";


function BookDetail (props){
    let location=useLocation()
    const [pasOk, setPasOk] = useState(true)
    const [book, setBook] = useState()
    const [isbn] = useState(location.state.isbn)
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    /**
     * renvoie l'image associé au livre ou une image indisponible
     * @param book
     * @returns {*|string}
     */
    function getImage(book) {
        if ("cover" in book){
            return book.cover
        }
        //image non disponible
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Image_non_disponible_portrait.svg/1479px-Image_non_disponible_portrait.svg.png"
    }

    //est appelé quand le composant est créé
    useEffect(() => {
        bookDAO.findByISBN(isbn).then(res => {
                console.log(res)
                setBook(res)
                setPasOk(false)
            });
    }, []);

    //si le livre n'est pas chargé alors on affiche un message de chargement
    if (pasOk){
        return(
            <div>
                <div className={"chargement"}>
                    <h2>
                        Chargement du livre...
                    </h2>
                    <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
            </div>
        )
    }

    //TODO : voire si le .then est nécessaire
    //ajoute le livre aux favoris
    function ajout(){
        if (cookies.token !== "undefined"){
            userDAO.addBook(cookies.token, isbn).then(res => {
                console.log(res)
            })
        }
    }

    //retire le livre des favoris
    function enleve(){
        if (cookies.token !== "undefined"){
            userDAO.deleteBook(cookies.token, isbn).then(res => {
                console.log(res)
            })
        }
    }

    //fonction qui affiche le bon bouton avec la bonne fontion associé
    function favori() {
        //si le token n'est pas undefined et que le livre est dans les favoris du user alors on affiche le bouton pour retirer le livre des favoris
        //TODO : if à modifier ( book is undefined : il faut récupérer les livre du user)
        if (cookies.token !== "undefined" && book.favoris){
            return(
                <div>
                    <button onClick={enleve} type='submit' name='item-1-button' id='item-1-button'><h2>Retirer des Favoris</h2>
                        <img src="https://cdn.discordapp.com/attachments/1081164623044157530/1088866478176079972/star_2_selected.png" alt='Favoris selected icon'></img>
                    </button>
                </div>
            )
        }else {
            return (
                <div>
                    <button onClick={ajout} type='submit' name='item-1-button' id='item-1-button'><h2>Ajouter aux Favoris</h2>
                        <img src="https://cdn.discordapp.com/attachments/1081164623044157530/1088866478176079972/star_2_selected.png" alt='Favoris selected icon'></img>
                    </button>
                </div>
            )
        }
    }

    return(
        <div className="Produit">
            <div className="horizontal">
                <div className="image-box">
                    <img src={getImage(book)} alt="image du livre"/>
                </div>
                <div className="text-box">
                    <div>
                        <h2>Nom:</h2>
                        <h3>{book.title}</h3>
                    </div>
                    <div>
                        <h2>ISBN:</h2>
                        <h3>{"isbn13: " + isbn}</h3>
                    </div>
                    <div>
                        <h2>Date de publication:</h2>
                        <h3>{book.publishedDate}</h3>
                    </div>
                    <div>
                        <h2>Auteur(s):</h2>
                        <h3>{book.authors}</h3>
                    </div>
                    <div className="button-div">
                        {favori()}
                        {/*ouvre un nouvel onglet avec la recherche amazon associée*/}
                        <NavLink to={"https://www.amazon.fr/s?k="+isbn} target={"_blank"}>
                            <button type='submit' name='item-1-button' id='item-1-button'><h2>Acheter sur Amazon</h2>
                            <img src="https://cdn.discordapp.com/attachments/1081164623044157530/1089934411555934298/amazon.png" alt='Favoris selected icon'></img>
                            </button>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className="text-box">
                <div>
                    <h2>Description:</h2>
                    <h3>{book.description}</h3>
                </div>
            </div>
        </div>
    )
}


export default BookDetail

