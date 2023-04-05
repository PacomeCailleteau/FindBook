export class bookModel {
    isbn
    title
    cover
    authors
    publishedDate
    description
    constructor(book) {
        // On récupère l'isbn
        if (book.industryIdentifiers) {
            book.industryIdentifiers.forEach(element => {
                if (element.type === "ISBN_13") {
                    this.isbn = element.identifier
                }
            });
        }

        // On récupère le titre
        this.title = book.title
        // On récupère la couverture
        if (book.imageLinks) {
            this.cover = book.imageLinks.thumbnail
        }
        // On récupère les auteurs
        this.authors = book.authors
        // On récupère la date de publication
        this.publishedDate = book.publishedDate
        // On récupère la description
        this.description = book.description
    }
}
