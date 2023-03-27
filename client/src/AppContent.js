
import React from "react";
//import bookDAO from "./bookDAO"
import Books from "./Books"
import Search from "./Search";

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
            query: "le seigneur des anneaux",
            books: [],
        }
        this.doUpdate = this.doUpdate.bind(this)
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
                    const res = data.items
                    this.setState({books: res})
                })
        }
    }

    //TODO(gerer le fait que isbn 13 puisse être en minuscule ou que le tableau puisse être de différente taille)
    /**
     * renvoie l'isbn13 du livre
     * @param array
     * @returns {undefined|number|Identifier|Identifier|Identifier|string}
     */
    goodIsbn(array) {
        if (array == undefined)
            return undefined
        for (let i in array) {
            if (array[i].type == "ISBN_13")
                return array[0].identifier
        }
        return undefined
    }

    /**
     * renvoie l'image associé au livre ou une image indisponible
     * obj correspond à book.volumeInfo
     * @param obj
     * @returns {*|string}
     */
    getImage(obj) {
        if ("imageLinks" in obj){
            if ("thumbnail" in obj.imageLinks){
                return obj.imageLinks.thumbnail
            }
        }
        //image non disponible
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Image_non_disponible_portrait.svg/1479px-Image_non_disponible_portrait.svg.png"
    }

    render() {
        const books = this.state.books.map(book =>
            <Books
            isbn={this.goodIsbn(book.volumeInfo.industryIdentifiers)}
            titre={book.volumeInfo.title}
            img={this.getImage(book.volumeInfo)}
            />
        )

        return (
            <div>
                <Search update={this.doUpdate}/>
                <div className={"bookCard"}>
                    {books}
                </div>
            </div>
        )
    }
}

export default AppContent;












