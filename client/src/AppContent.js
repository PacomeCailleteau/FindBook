
import React from "react";
//import bookDAO from "./bookDAO"
import Books from "./Books"

const baseURL = 'https://www.googleapis.com/books/v1/volumes'

const bookDAO = {

    /**
     * Récupère tous les livres que nous renvoie la recherche
     * @param search
     * @returns {Promise<any>}
     */
    findMany : async (search) =>
    {
        const suffix = `?q=${search}`
        const res = await fetch(baseURL + suffix)
        const data = await res.json()
        return data
    },

    /**
     * Récupère l'unique livre correspondant à l'isbn en param
     * @param isbn
     * @returns {Promise<any>}
     */
    findByISBN : async (isbn) =>
    {
        const suffix = `?q=isbn:${isbn}`
        const res = await fetch(baseURL + suffix)
        const data = await res.json()
        return data
    },
}

//TODO("remettre le DAO dans son propre fichier")

class AppContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "hunter x hunter",
            books: [],
        }
    }

    componentDidMount() {
        this.doUpdate()
    }

    doUpdate(query) {
        console.log("terme : `" + this.state.query + "`")
        //si la requête existe alors on la stock dans la variable associé
        if (query != undefined)
            this.setState({query: query})
        //si la recherche est vide alors on affiche la page d'accueil sans aucun livre
        if (this.state.query == "")
            console.log("recherche invalide car pas de termes de recherche")
        //sinon on appelle l'api google pour récupéré les livres correspondant à la recherche
        else{
            console.log(bookDAO)
            
            bookDAO.findMany(this.state.query)
                .then(data => {
                    this.setState({books: data.items})
                })
        }
    }

    //TODO(gerer le fait que isbn 13 puisse être en minuscule ou que le tableau puisse être de différente taille)
    goodIsbn(array) {
        if (array[1].type=="ISBN_13")
            return array[1].identifier
        else if (array[0].type=="ISBN_13")
            return array[0].identifier
        else 
            return undefined
    }

    //obj correspond à book.volumeInfo
    getImage(obj) {
        //book.volumeInfo.imageLinks.thumbnail
        if ("imageLinks" in obj){
            if ("thumbnail" in obj.imageLinks){
                return obj.imageLinks.thumbnail
            }
        }
        //TODO("faire en sorte de définir une image par défaut quand l'image n'est pas disponible")
        return "image indisponible"
    }

    getInfos(book){
        const isbn = this.goodIsbn(book.volumeInfo.industryIdentifiers)
        if (isbn == undefined){
            return [false, "isbn", "titre", "image"]
        }
        const titre = book.volumeInfo.title
        const image = this.getImage(book.volumeInfo)
        return [true, isbn, titre, image]
    }

    render() {
        const books = this.state.books.map(book => {
            //resArray un tableau de la forme [bool, isbn, titre, img]
            //bool est à faux si l'isbn n'a pas pu être récupéré
            const resArray = this.getInfos(book);
            console.log(resArray)
            if (resArray[0]){
                <Books
                isbn={resArray[1]}
                titre={resArray[2]}
                img={resArray[3]}
                />
            }
        })
        return (
            <div className={"bookCard"}>
                {books}
            </div>
        )
    }
}

export default AppContent;












