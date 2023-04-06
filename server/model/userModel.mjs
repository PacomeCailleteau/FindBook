
export class userModel {
    id
    login
    // books correspond à la liste des livres favoris de l'utilisateur
    books
    constructor(user) {
        this.id = user.id;
        this.login = user.login;
        this.books = user.books;
    }
}
    