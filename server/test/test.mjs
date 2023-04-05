import {
    init
} from "../server.mjs";
import chai from "chai"
import chaiHttp from "chai-http"

let should = chai.should()
let tok = ""

chai.use(chaiHttp)


describe("user", () => {
    let server;

    // avant chaque test, on lance le serveur
    beforeEach(async () => {
        server = await init();
    });

    // après chaque test, on arrête le serveur
    afterEach(async () => {
        await server.stop();
    });

    /*==============================================================*/
    //tests comportement normal
    it("créé un nouvel utilisateur", async () => {
        const res = await server.inject({
            method: "post",
            url: "localhost:3001/users/create",
            payload: {
                login: "test",
                password: "pass"
            }
        })
        // vérifie que le status code est 200
        chai.expect(res.statusCode).to.equal(200)
        // vérifie que le login est bien test
        chai.expect(res.result.user.login).to.eql('test')
        // vérifie que les books est bien un tableau
        chai.expect(Array.isArray(res.result.user.books)).to.eql(true)
        // vérifie que le tableau est vide
        chai.expect(res.result.user.books.length).to.eql(0)
        //on ne peut pas vérifier autre chose pour le token car il est fait aléatoirement
        chai.expect(typeof res.result.token).to.eql("string")
        tok = res.result.token
        // le mot de passe n'est pas renvoyé
    });

    it('affiche tous les utilisateurs', async () => {
        const res = await server.inject({
            method: 'get',
            url: 'localhost:3001/users',
        })
        //vérifie que le status code est 200
        chai.expect(res.statusCode).to.equal(200);
        //vérifie que le résultat est bien un tableau
        chai.expect(Array.isArray(res.result)).to.equal(true);
        //vérifie que le login premier élément du tableau est bien test
        chai.expect(res.result[0].login).to.equal('test');
    });
    
    it('affiche un utilisateur grâce à son token', async () => {
        const res = await server.inject({
            method: 'get',
            url: 'localhost:3001/users/'+tok,
        })
        //vérifie que le status code est 200
        chai.expect(res.statusCode).to.equal(200);
        //vérifie que le login est bien test
        chai.expect(res.result.login).to.equal('test');
    });

    it('modifie le login du user', async () => {
        const res = await server.inject({
            method: "put",
            url: 'localhost:3001/users/update/login/'+tok,
            payload: {
                login: "change"
            }
        })
        // vérifie que le status code est 200
        chai.expect(res.statusCode).to.eql(200)
        // vérifie que le login est bien change
        chai.expect(res.result.login).to.equal("change")
    })

    it("modifie le mot de passe du user", async () => {
        const res = await server.inject({
            method: "put",
            url: 'localhost:3001/users/update/password/'+tok,
            payload: {
                password: "pass2"
            }
        })
        // vérifie que le status code est 200
        chai.expect(res.statusCode).to.eql(200)
        // vérifie que le login est bien change
        chai.expect(res.result.user.login).to.equal("change")
        // vérifie que le token n'est pas null
        chai.expect(res.result.token).to.not.equal(null)
        tok = res.result.token
    })

    it("affiche l'utilisateur et son token après modification grâce à son pass et son login", async () => {
        const res = await server.inject({
            method: "get",
            url: 'localhost:3001/users/login/change/pass2',
        })
        // vérifie que le status code est 200
        chai.expect(res.statusCode).to.eql(200)
        // vérifie que le login est bien change
        chai.expect(res.result.user.login).to.equal("change")
        // vérifie que le token est bien le même
        chai.expect(res.result.token).to.equal(tok)
    })

    it("affiche les livres liés à la recherche", async () => {
        const res = await server.inject({
            method: "get",
            url: 'localhost:3001/books/search/hunter%20x%20hunter',
        })
        // vérifie que le status code est 200
        chai.expect(res.statusCode).to.eql(200)
        //le résultat est un tableau
        chai.expect(Array.isArray(res.result)).to.equal(true);
    })

    it("affiche le livre lié à l'id", async () => {
        const res = await server.inject({
            method: "get",
            url: 'localhost:3001/books/isbn/9782505014706',
        })
        // vérifie que le status code est 200
        chai.expect(res.statusCode).to.eql(200)
        //le résultat est un book avec toutes les infos
        chai.expect(res.result.isbn).to.equal("9782505014706")
        chai.expect(res.result.title).to.eql("Hunter X Hunter")
        chai.expect(res.result.cover).to.eql(undefined)
        chai.expect(res.result.authors).to.eql(["Yoshihiro Togashi"])
        chai.expect(res.result.publishedDate).to.eql("2012-06-01")
        chai.expect(res.result.description).to.eql("La bataille entre les Kimeras Ants et les humains s'intensifie. Loin du palais royal, le roi et Netero mènent un combat acharné à l'issue des plus inattendues !! Pendant ce temps, Kirua retrouve Pâmu qui s'inquiétait pour Gon. Cependant, l'attitude de Pâmu reste encore partiellement incompréhensible...")
    })

    it("ajoute un livre à la liste des livres de l'utilisateur", async () => {
        const res = await server.inject({
            method: "post",
            url: 'localhost:3001/users/addBook/'+tok,
            payload: {
                isbn: "9782505014706"
            }
        })
        // vérifie que le status code est 200
        chai.expect(res.statusCode).to.eql(200)
        // vérifie que le login est bien change
        chai.expect(res.result.login).to.equal("change")
        // vérifie que le livre est bien ajouté avec toutes les infos
        chai.expect(res.result.books[0].isbn).to.equal("9782505014706")
        chai.expect(res.result.books[0].title).to.eql("Hunter X Hunter")
        chai.expect(res.result.books[0].cover).to.eql("")
    })

    it("supprime un livre de la liste des livres de l'utilisateur", async () => {
        const res = await server.inject({
            method: "delete",
            url: 'localhost:3001/users/removeBook/'+tok+'/9782505014706',
        })
        // vérifie que le status code est 200
        chai.expect(res.statusCode).to.eql(200)
        chai.expect(res.result.login).to.equal("change")
        chai.expect(res.result.books.length).to.equal(0)
    })

    it("supprime un utilisateur", async () => {
        const res = await server.inject({
            method: "delete",
            url: 'localhost:3001/users/delete/'+tok,
        })
        chai.expect(res.statusCode).to.eql(200)
        chai.expect(res.result.login).to.equal("change")
        chai.expect(res.result.books).to.equal(undefined)
    })

    it("le nombre de recherche", async () => {
        const res = await server.inject({
            method: "get",
            url: "localhost:3001/stat/hunter%20x%20hunter",
        })
        chai.expect(res.statusCode).to.eql(200)
        chai.expect(res.result.search).to.equal("hunter x hunter")
        chai.expect(typeof res.result.nb_results).to.equal("number")
    })

    /*==============================================================*/
    //tests comportement inattendu
    it("erreur isbn non trouvé get", async () => {
        const res = await server.inject({
            method: "get",
            url: 'localhost:3001/books/isbn/666',
        })
        chai.expect(res.statusCode).to.eql(404)
        chai.expect(res.result).to.eql({message: "book not found"})
    })

    it("erreur token non associé à un user get", async () => {
        const res = await server.inject({
            method: "get",
            url: 'localhost:3001/users/666',
        })
        chai.expect(res.statusCode).to.eql(404)
        chai.expect(res.result).to.eql({message: "user not found"})
    })

    it("erreur login déjà utilisé create", async () => {
        //création d'un user
        await server.inject({
            method: "post",
            url: 'localhost:3001/users/create',
            payload: {
                login: "change",
                password: "cc"
            }
        })
        //test de création d'un user avec le même login
        const res = await server.inject({
            method: "post",
            url: 'localhost:3001/users/create',
            payload: {
                login: "change",
                password: "pass"
            }
        })
        chai.expect(res.statusCode).to.eql(409)
        chai.expect(res.result).to.eql({message: "user already exists"})
    })

    it("erreur pass incorrect get", async () => {
        const res = await server.inject({
            method: "get",
            url: 'localhost:3001/users/login/change/666',
        })
        chai.expect(res.statusCode).to.eql(403)
        chai.expect(res.result).to.eql({message: "Mot de passe incorrect"})
    })

    it("erreur login incorrect get", async () => {
        const res = await server.inject({
            method: "get",
            url: 'localhost:3001/users/login/changee/pass',
        })
        chai.expect(res.statusCode).to.eql(403)
        chai.expect(res.result).to.eql({message: "Utilisateur inconnu"})
    })

    it("erreur user not found delete", async () => {
        const res = await server.inject({
            method: "delete",
            url: 'localhost:3001/users/delete/666',
            })
        chai.expect(res.statusCode).to.eql(404)
        chai.expect(res.result).to.eql({message: "user not found"})
    })

    it("erreur user not found update login ", async () => {
        const res = await server.inject({
            method: "put",
            url: 'localhost:3001/users/update/login/cc',
            payload: {
                login: "change"
            }
        })
        chai.expect(res.statusCode).to.eql(403)
        chai.expect(res.result).to.eql({message: "utilisateur inconnu"})
    })

    it("erreur user not found update password ", async () => {
        const res = await server.inject({
            method: "put",
            url: 'localhost:3001/users/update/password/cc',
            payload: {
                password: "prout"
            }
        })
        chai.expect(res.statusCode).to.eql(404)
        chai.expect(res.result).to.eql({message: "user not found"})
    })

    it("erreur user not found add book ", async () => {
        const res = await server.inject({
            method: "post",
            url: 'localhost:3001/users/addBook/666',
            payload: {
                isbn: "9782505014706"
            }
        })
        chai.expect(res.statusCode).to.eql(403)
        chai.expect(res.result).to.eql({message: "Utilisateur inconnu"})
    })


})

describe("default route", () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it("expected default route ", async () => {
        const res = await server.inject({
            method: "get",
            url: "/api/v1/brasserie"
        });

        chai.expect(res.statusCode).to.equal(404);
        chai.expect(res.result).to.be.eql({
            message: "route not found"
        })
    })
})
