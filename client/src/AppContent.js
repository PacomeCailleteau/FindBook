
import React from "react";
import bookDAO from "./bookDAO"
import Books from "./Books"
import Search from "./Search";
import "./AppContent.css"

class AppContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            books: [],
        }
        this.doUpdate = this.doUpdate.bind(this)
        const url = "https://leboncoin1.p.rapidapi.com/v2/leboncoin/search?query=https%3A%2F%2Fwww.leboncoin.fr%2Frecherche%3Fcategory%3D2%26text%3DEVOQUE%26brand%3DLand%2520Rover%26gearbox%3D2"
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'eb26d2c4e5msh4298ada89fc9f6ap161596jsn6d6ad6c847f0',
                'X-RapidAPI-Host': 'leboncoin1.p.rapidapi.com'
            }
        }
        console.log("test")
        fetch(url, options).then(response => response.json()).then(data => {
            console.log(data)
        })
    }

    componentDidMount() {
        this.doUpdate()
    }

    doUpdate(query) {
        //si la requête existe alors on la stock dans la variable associé
        if (query != undefined)
            this.setState({query: query})
        //si la recherche est vide alors on affiche la page d'accueil sans aucun livre
        //.trim permet de retirer les espaces au début et à la fin de la string
        if (this.state.query.trim().length == 0)
            console.log("recherche invalide car pas de termes de recherche")
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
                <div className={"bienvenue"}>
                    <h1>Bienvenue sur Findbook</h1>
                    <h2>Pour accéder au catalogue, veuillez effectuer une recherche</h2>
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












