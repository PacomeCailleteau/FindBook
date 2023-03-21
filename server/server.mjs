import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import HapiSwagger from "hapi-swagger";
import Hapi from "@hapi/hapi";
import Joi from "joi";

import { userController } from "./controller/userController.mjs";


// --- patterns --- //
const joiUser = Joi.object({
    id: Joi.string().required().describe("l'id de l'utilisateur, unique dans le db"),
    login: Joi.string().required().describe("le login de l'utilisateur, unique dans le db"),
    password: Joi.string().required().describe("le hash du mot de passe de l'utilisateur"),
    livres: Joi.array().items(Joi.string()).describe("la liste des ISBN des livres de l'utilisateur")
}).description("un utilisateur avec toutes ses information");

const joiUsers = Joi.array().items(joiUser).description("la liste de tous les utilisateurs");

const joiErreur404 = Joi.string().required().description("erreur 404");
// --- Swagger --- //
const swaggerOptions = {
    info: {
        title: "L'API de books-sae",
        version: "0.1.0",
    }
};


// --- Routes --- //
const routes = [
    {
        method: "GET",
        path: "/users",
        handler: async (request, h) => {
            try {
                return h.response(await userController.findAll()).code(200)
            } catch(e) {
                return h.response(e).code(400)
            }
        },
        options: {
            description: "Tous les utilisateurs",
            notes: "Retourne la liste de Tous les utilisateurs",
            tags: ["users"]
        }
    },
    {
        method: "GET",
        path: "/users/{id}",
        handler: async (request, h) => {
            // try {
                const user = await userController.findById(request.params.id)

                if (user === null) {
                    return h.response({
                        message: "not found"
                    }).code(404);
                }
                return h.response(user).code(200);
            // } catch(e) {
            //     return h.response(e).code(400)
            // }
        },
        options: {
            description: "retrouve un utilisateur par son id",
            notes: "Retourne un utilisateur par son id",
            tags: ["users"],
            // validate: {
            //     params: Joi.object({
            //         id: Joi.string().required().description("l'id d'un utilisateur")
            //     })
            // },
            // response: {
            //     status: {
            //         200: joiUser,
            //         404: joiErreur404
            //     }
            // }
        }
    },
    {
        method: "*",
        path: "/{any*}",
        handler: async (request, h) => {
            try {
                return h.response({
                    message: "not found"
                }).code(404);
            } catch(e) {
                return h.response(e).code(400)
            }
        },
        options: {
            description: "error 404",
            notes: "error 404",
            tags: ["api"]
        }
    }
]

// --- Hapi config --- //
const server = Hapi.server({
    port: 3000,
    host: "localhost"
});

server.route(routes);

export const start = async () => {
    await server.register([
        Inert,
        Vision,
        {
        plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
};

process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
});
