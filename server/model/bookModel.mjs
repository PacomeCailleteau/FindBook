export class bookModel {
    id
    title
    cover
    isbn13
    user_id
    user
    constructor(book) {
        this.id = book.id;
        this.title = book.title;
        this.cover = book.cover;
        this.isbn13 = book.isbn13;
        this.user_id = book.user_id;
        this.user = book.user;
    }
}
