
import React, {useEffect, useState} from "react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import bookDAO from "./bookDAO"
import "./BookDetail.css"
import userDAO from "./userDAO";
import {useCookies} from "react-cookie";


function BookDetail (props){
    // création de useLocation qui permet de récupérer des informations de la page d'avant sans passer par l'url
    let location=useLocation()
    // création des states
    const [pasOk, setPasOk] = useState(true)
    const [book, setBook] = useState()
    const [isbn] = useState(location.state.isbn)
    const [isFav, setIsFav] = useState(false)
    // création du cookie token
    const [cookies, setCookie, removeCookie] = useCookies(['token', {sameSite: "lax"}]);
    // création de useNavigate qui permet de rediriger vers une autre page
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
        // on met isFav à false au cas où le livre n'est pas dans les favoris
        setIsFav(false)
        // on vérifie que le cookie existe
        if (cookies.token !== undefined){
            // on récupère les livres favoris de l'utilisateur. Si le livre est dans les favoris alors on met isFav à true
            userDAO.getUserByToken(cookies.token).then(res => {
                // res.books est un tableau correspondant au favori du user
                if (Array.isArray(res.books)) {
                    // .map parcours le tableau et si le livre est dans les favoris alors on met isFav à true
                    res.books.map(book => {
                        if (book.isbn === isbn){
                            setIsFav(true)
                        }
                    })
                }
            })
        }
    }

    //est appelé quand le composant est créé. Équivalent du componentDidMount
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

    //ajoute le livre aux favoris
    function ajout(){
        if (cookies.token !== undefined){
            userDAO.addBook(cookies.token, isbn).then(() => {
                setIsFav(true)
            })
        }else{
            nav("/connexion")
        }
    }

    //retire le livre des favoris, ne peut être appeler que si le user est connecté donc pas besoin de tester si le token est undefined
    function enleve(){
        userDAO.deleteBook(cookies.token, isbn).then(() => {
            setIsFav(false)
        })
    }

    /**
     * affiche le bouton pour ajouter ou retirer le livre des favoris
     * fonction qui affiche le bon bouton avec la bonne fonction associé
     * @returns {JSX.Element}
     */
    function favori() {
        //si le livre est dans les favoris du user alors on affiche le bouton pour retirer le livre des favoris
        if (isFav){
            return(
                <div>
                    <button onClick={enleve} type='submit' name='item-1-button' id='item-1-button'><h2 className="blanc">Retirer des Favoris</h2>
                        <img src="https://cdn.discordapp.com/attachments/1081164623044157530/1088839016478150666/star_2.png" alt='Favoris selected icon'></img>
                    </button>
                </div>
            )
            //sinon on affiche le bouton pour ajouter le livre aux favoris
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
            {/* la partie supérieur de l'affiche du livre (tout sauf la description) */}
            <div className="horizontal">
                {/* l'image du livre */}
                <div className="image-box">
                    <img src={getImage(book)} alt="image du livre"/>
                </div>
                {/* les informations du livre */}
                <div className="text-box">
                    {/* le nom du livre */}
                    <div>
                        <h2>Nom:</h2>
                        <h3>{book.title}</h3>
                    </div>
                    {/* l'isbn du livre */}
                    <div>
                        <h2>ISBN:</h2>
                        <h3>{"isbn13: " + isbn}</h3>
                    </div>
                    {/* la date de publication du livre */}
                    <div>
                        <h2>Date de publication:</h2>
                        <h3>{book.publishedDate}</h3>
                    </div>
                    {/* les auteurs du livre */}
                    <div>
                        <h2>Auteur(s):</h2>
                        <h3>{book.authors}</h3>
                    </div>
                    {/* les boutons */}
                    <div className="button-div">
                        {/* le bouton pour ajouter ou retirer le livre des favoris */}
                        {favori()}

                        {/* ouvre un nouvel onglet avec la recherche amazon associée */}
                        <NavLink to={"https://www.amazon.fr/s?k="+isbn} target={"_blank"}>
                            <button type='submit' name='item-1-button' id='item-1-button'><h2>Acheter sur Amazon</h2>
                            <img src="https://cdn.discordapp.com/attachments/1081164623044157530/1089934411555934298/amazon.png" alt='Favoris selected icon'></img>
                            </button>
                        </NavLink>
                    </div>
                </div>
            </div>

            {/* le résumé du livre */}
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

