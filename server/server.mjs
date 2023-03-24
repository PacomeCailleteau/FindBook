import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import HapiSwagger from "hapi-swagger";
import Hapi from "@hapi/hapi";
import Joi from "joi";

import { userController } from "./controller/userController.mjs";


// --- patterns --- //
const joiUser = Joi.object({
    id: Joi.number().required().description("l'id de l'utilisateur, unique dans le db"),
    login: Joi.string().required().description("le login de l'utilisateur, unique dans le db"),
    books: Joi.array().items(Joi.object()).description("la liste des ISBN des livres de l'utilisateur")
}).description("un utilisateur avec toutes ses information");

const joiUsers = Joi.array().items(joiUser).description("la liste de tous les utilisateurs");

const joiErreur404 = Joi.object({
    message: Joi.string().required()
}).description("erreur 404");
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
            description: "Get all users",
            notes: "Get all users",
            tags: ["users"]
        }
    },
    {
        method: "GET",
        path: "/users/{token}",
        handler: async (request, h) => {
            try {
                const user = await userController.getUserByToken(request.params.token)

                if (user === null) {
                    return h.response({
                        message: "user not found"
                    }).code(404);
                }
                return h.response(user).code(200);
            } catch(e) {
                return h.response(e).code(400)
            }
        },
        options: {
            description: "Get user by token",
            notes: "Get the user associated with the token",
            tags: ["users"],
            validate: {
                params: Joi.object({
                    token: Joi.string().required().description("A user's token")
                })
            },
            response: {
                status: {
                    200: joiUser,
                    404: joiErreur404
                }
            }
        }
    },
    {
        method: "GET",
        path: "/users/create/{login}/{password}",
        handler: async (request, h) => {
            try {
                // FAIRE LES MESSAGES D'ERREURS
                return h.response(await userController.createUser(request.params.login, request.params.password)).code(200)
            } catch(e) {
                return h.response(e).code(400)
            }
        },
        options: {
            description: "Create a new user",
            notes: "Create a new user from a login and a password",
            tags: ["users"],
            validate: {
                params: Joi.object({
                    login: Joi.string().required().description("A user's login"),
                    password: Joi.string().required().description("A user's password")
                })
            },
            response: {
                status: {
                    200: joiUser
                }
            }
        }
    },
    {
        method: "GET",
        path: "/users/add/{token}/{isbn}",
        handler: async (request, h) => {
            try {
                return h.response(await userController.addBookToUser(request.params.token, request.params.isbn)).code(200)
            } catch(e) {
                return h.response(e).code(400)
            }
        },
        options: {
            description: "Add a book to a user",
            notes: "Add a book to a user from a token and an isbn",
            tags: ["users"],
            validate: {
                params: Joi.object({
                    token: Joi.string().required().description("A user's token"),
                    isbn: Joi.string().required().description("A book's isbn")
                })
            },
            response: {
                status: {
                    200: joiUser
                }
            }
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
            notes: "error 404"
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
