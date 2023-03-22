
export class userModel {
    id
    login
    books
    constructor(user) {
        this.id = user._id;
        this.login = user.login;
        this.books = user.books;
    }
}
