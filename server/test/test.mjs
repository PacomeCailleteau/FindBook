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

    beforeEach(async () => {
        server = await init();
    });
    
    afterEach(async () => {
        await server.stop();
    });

    //test comportement normal

    it("créé un nouvel utilisateur", async () => {
        const res = await server.inject({
            method: "post",
            url: "localhost:3001/users/create",
            payload: {
                login: "test",
                password: "pass"
            }
        })
        chai.expect(res.statusCode).to.equal(200)
        //res.result.user = {id: ..., login: ..., books: ...}
        chai.expect(res.result.user.login).to.eql('test')
        chai.expect(Array.isArray(res.result.user.books)).to.eql(true)
        chai.expect(res.result.user.books.length).to.eql(0)
        //TODO : vérifier que le token est bien un str et qu'il existe
        //on ne peut pas vérifier autre chose car il est fait aléatoirement
        chai.expect(typeof res.result.token).to.eql("string")
        tok = res.result.token
    });

    it('affiche tous les utilisateurs', async () => {
        const res = await server.inject({
            method: 'get',
            url: 'localhost:3000/users',
        })
        chai.expect(res.statusCode).to.equal(200);
        //vérifie que le résultat est bien un tableau
        chai.expect(Array.isArray(res.result)).to.equal(true);
        chai.expect(res.result[0].login).to.equal('test');
    });
    
    it('affiche un utilisateur grâce à son token', async () => {
        const res = await server.inject({
            method: 'get',
            url: 'localhost:3000/users/'+tok,
        })
    chai.expect(res.statusCode).to.equal(200);
    chai.expect(res.result.login).to.equal('test');
    });

    it('modifie le login du user', async () => {
        const res = await server.inject({
            method: "put",
            url: 'localhost:3000/users/update/login/'+tok,
            payload: {
                login: "change"
            }
        })
        chai.expect(res.statusCode).to.eql(200)
        chai.expect(res.result.login).to.equal("change")
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
