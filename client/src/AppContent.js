
import React from "react";
import bookDAO from "./bookDAO"
import Books from "./Books"
import Search from "./Search";
import "./AppContent.css"
import statDAO from "./statDAO";


class AppContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            books: [],
            nbSearch: 0
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
        //.trim permet de retirer les espaces au début et à la fin du string
        if (this.state.query.trim().length == 0) {
            console.log("recherche invalide car pas de termes de recherche")
            this.state.nbSearch = 0
        }
        //sinon on appelle l'api google pour récupéré les livres correspondant à la recherche
        else{
            bookDAO.findMany(this.state.query)
                .then(data => {
                    //avant de mettre le résultat de la requête dans books on vérifie que c'est bien un tableau.
                    //si ça n'est pas fait alors ça peut poser des problèmes lorsque le serveur renvoie un objet et non un tableau
                    //example d'objet qu'on peut trouver :
                    // Object { message: "not found" }
                    // Object { statusCode: 500, error: "Internal Server Error", message: "An internal server error occurred" }
                    if (!Array.isArray(data)){
                        this.setState({books: []})
                    }else {
                        this.setState({books: data})
                    }
                })

            //on appelle l'api google pour récupéré le nombre de recherche effectué sur google trends
            statDAO.getStatInformation(this.state.query)
                .then(data => {
                    this.setState({nbSearch: data.nb_results})
                })
        }
    }

    /**
     * renvoie l'image associé au livre ou une image indisponible
     * @param obj
     * @returns {*|string}
     */
    getImage(obj) {
        if ("cover" in obj){
            return obj.cover
        }
        //image non disponible
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Image_non_disponible_portrait.svg/1479px-Image_non_disponible_portrait.svg.png"
    }

    render() {
        const books = this.state.books.map((book, i) =>
            <Books key={i}
            isbn={book.isbn}
            titre={book.title}
            img={this.getImage(book)}
            />
        )

        return (
            <div>
                {/*blabla du début*/}
                <div className={"bienvenue"}>
                    <h1>Bienvenue sur Findbook</h1>
                    <h2>Pour accéder au catalogue, veuillez effectuer une recherche</h2>
                </div>

                {/*barre de recherche*/}
                <Search update={this.doUpdate}/>

                {/*nombre de recherche*/}
                <div className="nbSearch">
                    <p>Cette recherche a été effectuer {this.state.nbSearch} fois en France depuis un mois</p>
                </div>

                {/*affichage des livres*/}
                <div className={"bookCard"}>
                    {books}
                </div>
            </div>
        )
    }
}

export default AppContent;












