
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import bookDAO from "./bookDAO"


function BookDetail (){
    let location=useLocation()
    const [pasOk, setPasOk] = useState(true)
    const [book, setBook] = useState()
    const isbn = location.state.isbn

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
            <div className={"chargement"}>CHARGEMENT...</div>
        )
    }

    return(
        <div className="book">
            <img src={getImage(book.volumeInfo)} alt="image du livre"/>
            <h3>{book.volumeInfo.title}</h3>
            <div>{"isbn13: " + isbn}</div>
            <div>{book.volumeInfo.publishedDate}</div>
            <div>{book.volumeInfo.authors}</div>
            <div>{book.volumeInfo.categories}</div>
            <div>{book.volumeInfo.description}</div>
        </div>
    )
}


export default BookDetail

