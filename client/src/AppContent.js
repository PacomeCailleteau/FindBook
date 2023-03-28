
import React from "react";
import bookDAO from "./bookDAO"
import Books from "./Books"
import Search from "./Search";

class AppContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            books: [],
        }
        this.doUpdate = this.doUpdate.bind(this)
    }

    componentDidMount() {
        this.doUpdate()
    }

    doUpdate(query) {
        //si la requête existe alors on la stock dans la variable associé
        if (query != undefined)
            this.setState({query: query})
        //si la recherche est vide alors on affiche la page d'accueil sans aucun livre
        if (this.state.query == "")
            console.log("recherche invalide car pas de termes de recherche")
        //sinon on appelle l'api google pour récupéré les livres correspondant à la recherche
        else{
            bookDAO.findMany(this.state.query)
                .then(data => {
                    const res = data.items
                    if (res == undefined){
                        this.setState({books: []})
                    }else {
                        this.setState({books: res})
                    }
                })
        }
    }

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
                return array[i].identifier
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
        const books = this.state.books.map((book, i) =>
            <Books key={i}
            isbn={this.goodIsbn(book.volumeInfo.industryIdentifiers)}
            titre={book.volumeInfo.title}
            img={this.getImage(book.volumeInfo)}
            />
        )

        return (
            <div>
                <div className={"bienvenue"}>
                    <h2>Bienvenue sur Findbook</h2>
                    <p>Pour accéder au catalogue, veuillez effectuer une recherche</p>
                </div>
                <Search update={this.doUpdate}/>
                <div className={"bookCard"}>
                    {books}
                </div>
            </div>
        )
    }
}

export default AppContent;












