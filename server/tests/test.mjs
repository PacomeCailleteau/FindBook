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

    it("créé un nouvel utilisateur", async () => {
        const res = await server.inject({
            method: "post",
            url: "localhost:3001/users/create/test/pass",
            payload: {
                login: "test",
                password: "pass"
            }
        })
        chai.expect(res.statusCode).to.equal(201)
        chai.expect(res.result.password).to.equal('pass');
        chai.expect(res.result.login).to.eql('test')
        //TODO : vérifier que le token est bien un str et qu'il existe
        //on ne peut pas vérifier autre chose car il est fait aléatoirement
        chai.expect(res.result.token).to.eql('test')
        tok = res.result.token
    })

    it('affiche tous les utilisateurs', async () => {
        const res = await server.inject({
            method: 'get',
            url: 'localhost:3000/users',
        })
    chai.expect(res.statusCode).to.equal(200);
    //vérifie que le résultat est bien un tableau
    chai.expect(Array.isArray(res.result)).to.equal(true);
    chai.expect(res.result[0].login).to.equal('test');
    chai.expect(res.result[0].password).to.equal('pass');
    })
    
    it('affiche un utilisateur grâce à son token', async () => {
        const res = await server.inject({
            method: 'get',
            url: 'localhost:3000/users/'+tok,
        })
    chai.expect(res.statusCode).to.equal(200);
    chai.expect(res.result.login).to.equal('test');
    chai.expect(res.result.password).to.equal('pass');
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
            message: "not found"
        })
    })
})
