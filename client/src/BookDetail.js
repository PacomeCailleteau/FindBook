
import React, {useEffect, useState} from "react";
import {NavLink, useLocation} from "react-router-dom";
import bookDAO from "./bookDAO"
import "./BookDetail.css"


function BookDetail (props){
    let location=useLocation()
    const [pasOk, setPasOk] = useState(true)
    const [book, setBook] = useState()
    const [isbn] = useState(location.state.isbn)

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

    useEffect(() => {
        bookDAO.findByISBN(isbn).then(result => {
                const livre = result
                console.log(livre)
                setBook(livre)
                setPasOk(false)
            });
    }, []);

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
                        <NavLink to={"/favoris"}>
                            <button type='submit' name='item-1-button' id='item-1-button'><h2>Ajouter aux Favoris</h2>
                            <img src="https://cdn.discordapp.com/attachments/1081164623044157530/1088866478176079972/star_2_selected.png" alt='Favoris selected icon'></img>
                            </button>
                        </NavLink>
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

