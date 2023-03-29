
import React, {useEffect, useState} from "react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import bookDAO from "./bookDAO"
import "./BookDetail.css"
import userDAO from "./userDAO";
import {useCookies} from "react-cookie";


function BookDetail (props){
    let location=useLocation()
    const [pasOk, setPasOk] = useState(true)
    const [book, setBook] = useState()
    const [isbn] = useState(location.state.isbn)
    const [isFav, setIsFav] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const nav = useNavigate()

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

    //test si le livre est dans les favoris
    function testFav(){
        //récupère l'isbn de chaque livre favori de l'utilisateur
        setIsFav(false)
        if (cookies.token !== undefined){
            userDAO.getUserByToken(cookies.token).then(res => {
                if (Array.isArray(res.books)) {
                    res.books.map(book => {
                        if (book.isbn === isbn){
                            setIsFav(true)
                        }
                    })
                }
            })
        }
    }

    //est appelé quand le composant est créé
    useEffect(() => {
        //récupère les infos du livre
        bookDAO.findByISBN(isbn).then(res => {
                setBook(res)
                setPasOk(false)
            });
        testFav()
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
        if (cookies.token !== undefined){
            userDAO.addBook(cookies.token, isbn).then(() => {
                testFav()
            })
        }else{
            nav("/connexion")
        }
    }

    //retire le livre des favoris, ne peut être appeler que si le user est connecté donc pas besoin de tester si le token est undefined
    function enleve(){
        userDAO.deleteBook(cookies.token, isbn).then(() => {
            testFav()
        })
    }

    //fonction qui affiche le bon bouton avec la bonne fontion associé
    function favori() {
        //si le token n'est pas undefined et que le livre est dans les favoris du user alors on affiche le bouton pour retirer le livre des favoris
        //TODO : if à modifier ( book is undefined : il faut récupérer les livre du user)
        if (isFav){
            return(
                <div>
                    <button onClick={enleve} type='submit' name='item-1-button' id='item-1-button'><h2 className="blanc">Retirer des Favoris</h2>
                        <img src="https://cdn.discordapp.com/attachments/1081164623044157530/1088839016478150666/star_2.png" alt='Favoris selected icon'></img>
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

