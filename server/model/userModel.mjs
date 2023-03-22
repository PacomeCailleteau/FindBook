
export class userModel {
    id
    login
    password
    books
    token
    constructor(user) {
        this.id = user._id;
        this.login = user.login;
        this.password = user.password;
        this.books = user.books;
        this.token = user.token;
    }
}
