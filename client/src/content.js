
import React from "react";
import bookDAO from "./bookDAO"
import Books from "./Books"

class AppContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            books: [],
        }
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
        else
            bookDAO.findMany(this.state.query)
                .then(data => {
                    this.setState({books: data.results})
                })
    }

    //TODO(gerer le fait que isbn 13 peut ne pas exister ou qu'il puisse être en minuscule)
    goodIsbn(array) {
        if (array[1].type=="ISBN_13")
            return array[1].identifier
        else
            return array[0].identifier
    }

    render() {
        const books = this.state.books.map(book => <Books
            isbn={this.goodIsbn(book.volumeInfo.industryIdentifiers)}
            titre={book.volumeInfo.title}
            img={book.volumeInfo.imageLinks.thumbnail}
        />)
        return (
            <div className={"bookCard"}>
                {books}
            </div>
        )
    }
}

export default AppContent;












