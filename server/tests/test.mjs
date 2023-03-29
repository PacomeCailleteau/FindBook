import {
    init
} from "../server.mjs";
import chai from "chai"
import chaiHttp from "chai-http"

let should = chai.should()

chai.use(chaiHttp)


describe("user", () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });
    
    afterEach(async () => {
        await server.stop();
    });

    it("test")
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
