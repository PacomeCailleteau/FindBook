export class bookModel {
    isbn
    title
    cover
    authors
    publishedDate
    description
    constructor(book) {
        
        book.industryIdentifiers.forEach(element => {
            if (element.type === "ISBN_13") {
                this.isbn = element.identifier
            }
        });

        this.title = book.title
        if (book.imageLinks) {
            this.cover = book.imageLinks.thumbnail
        }
        this.authors = book.authors
        this.publishedDate = book.publishedDate
        this.description = book.description
    }
}
