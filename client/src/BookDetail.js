
import React, {useEffect, useState} from "react";
import {NavLink, useLocation} from "react-router-dom";
import bookDAO from "./bookDAO"
import "./BookDetail.css"


function BookDetail (){
    let location=useLocation()
    const [pasOk, setPasOk] = useState(true)
    const [book, setBook] = useState()
    const [isbn] = useState(location.state.isbn)

    /**
     * renvoie l'image associé au livre ou une image indisponible
     * obj correspond à book.volumeInfo
     * @param obj
     * @returns {*|string}
     */
    function getImage(obj) {
        if ("imageLinks" in obj){
            if ("thumbnail" in obj.imageLinks){
                return obj.imageLinks.thumbnail
            }
        }
        //image non disponible
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Image_non_disponible_portrait.svg/1479px-Image_non_disponible_portrait.svg.png"
    }

    useEffect(() => {
        bookDAO.findByISBN(isbn).then(result => {
                const livre = result.items[0]
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
                    <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
            </div>
        )
    }

    return(
        <div className="Produit">
            <div className="horizontal">
                <div className="image-box">
                    <img src={getImage(book.volumeInfo)} alt="image du livre"/>
                </div>
                <div className="text-box">
                    <div>
                        <h2>Nom:</h2>
                        <h3>{book.volumeInfo.title}</h3>
                    </div>
                    <div>
                        <h2>ISBN:</h2>
                        <h3>{"isbn13: " + isbn}</h3>
                    </div>
                    <div>
                        <h2>Date de publication:</h2>
                        <h3>{book.volumeInfo.publishedDate}</h3>
                    </div>
                    <div>
                        <h2>Auteur(s):</h2>
                        <h3>{book.volumeInfo.authors}</h3>
                    </div>
                    <div>
                        <h2>Catégorie(s):</h2>
                        <h3>{book.volumeInfo.categories}</h3>
                    </div>
                    <div className="button-div">
                        <NavLink to={"/favoris"}>
                            <button type='submit' name='item-1-button' id='item-1-button'><h2>Ajouter aux Favoris</h2>
                            <img src="https://cdn.discordapp.com/attachments/1081164623044157530/1088866478176079972/star_2_selected.png" alt='Favoris selected icon'></img>
                            </button>
                        </NavLink>
                        <NavLink to={"/amazon"} state={{isbn: isbn}}>
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
                    <h3>{book.volumeInfo.description}</h3>
                </div>
            </div>
        </div>
    )
}


export default BookDetail

