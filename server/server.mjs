import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import HapiSwagger from "hapi-swagger";
import Hapi from "@hapi/hapi";
import Joi from "joi";

import { userController } from "./controller/userController.mjs";
import { bookController } from "./controller/bookController.mjs";


// --- patterns --- //
const joiUser = Joi.object({
    id: Joi.number().required().description("User's id"),
    login: Joi.string().required().description("User's login"),
    books: Joi.array().items(Joi.object()).description("Isbn of the books the user has read"),
}).description("A user with all his information");


const joiBook = Joi.object({
    isbn: Joi.number().required().description("Book's isbn, unique identifier"),
    title: Joi.string().required().description("Book's title"),
    cover: Joi.string().description("Book's cover"),
    authors: Joi.array().items(Joi.string()).description("Book's authors"),
    publishedDate: Joi.string().description("Book's published date"),
    description: Joi.string().description("Book's description"),
}).description("A book with all his information");

const joiBooks = Joi.array().items(joiBook).description("An array of books");

const joiErreur = Joi.object({
    message: Joi.string().required()
}).description("An error message");

// --- Swagger --- //
const swaggerOptions = {
    info: {
        title: "Findbook API",
        version: "1.0.0"
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
                    404: joiErreur
                }
            }
        }
    },
    {
        method: "GET",
        path: "/users/create/{login}/{password}",
        handler: async (request, h) => {
            try {
                const user = await userController.createUser(request.params.login, request.params.password)

                if (user === null) {
                    return h.response({
                        message: "user already exists"
                    }).code(409);
                }
                return h.response(user).code(200);

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
        path: "/users/login/{login}/{password}",
        handler: async (request, h) => {
            try {
                const [token, user] = await userController.loginUser(request.params.login, request.params.password)

                if (user === null) {
                    return h.response({
                        message: "user not found"
                    }).code(404);
                }

                return h.response({
                    token: token,
                    user: user
                }).code(200);
            } catch(e) {
                return h.response(e).code(400)
            }
        },
        options: {
            description: "Login a user",
            notes: "Login a user from a login and a password, return token and user",
            tags: ["users"],
            validate: {
                params: Joi.object({
                    login: Joi.string().required().description("A user's login"),
                    password: Joi.string().required().description("A user's password")
                })
            },
            response: {
                status: {
                    200: Joi.object({
                        token: Joi.string().required().description("A user's token"),
                        user: joiUser
                    })
                }
            }
        }
    },
    {
        method: "GET",
        path: "/users/delete/{token}",
        handler: async (request, h) => {
            try {
                return h.response(await userController.deleteUser(request.params.login, request.params.password)).code(200)
            } catch(e) {
                return h.response(e).code(400)
            }
        },
        options: {
            description: "Delete a new user",
            notes: "Delete a user from a token",
            tags: ["users"],
            validate: {
                params: Joi.object({
                    token: Joi.string().required().description("A user's token")
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
        path: "/books/search/{searchTerm}",
        handler: async (request, h) => {
            try {
                return h.response(await bookController.searchBookInformation(request.params.searchTerm)).code(200)
            } catch(e) {
                return h.response(e).code(400)
            }
        },
        options: {
            description: "Search a books by title",
            notes: "Search a books by title",
            tags: ["books"],
            validate: {
                params: Joi.object({
                    searchTerm: Joi.string().required().description("search term")
                })
            },
            response: {
                status: {
                    200: joiBooks
                }
            }
        }
    },
    {
        method: "GET",
        path: "/books/isbn/{isbn}",
        handler: async (request, h) => {
            try {
                const book = await bookController.getBookInformation(request.params.isbn)
                if (book === null) {
                    return h.response({
                        message: "book not found"
                    }).code(404);
                }
                return h.response(book).code(200);
            } catch(e) {
                return h.response(e).code(400)
            }
        },
        options: {
            description: "Get a book by isbn",
            notes: "Get a book by isbn",
            tags: ["books"],
            validate: {
                params: Joi.object({
                    isbn: Joi.string().required().description("a book's isbn")
                })
            },
            response: {
                status: {
                    200: joiBook
                }
            }
        }
    },
    {
        method: "GET",
        path: "/users/addBook/{token}/{isbn}",
        handler: async (request, h) => {
            try {
                return h.response(await userController.addBookFromUser(request.params.token, request.params.isbn)).code(200)
            } catch(e) {
                return h.response(e).code(400)
            }
        },
        options: {
            description: "Add a book to a user",
            notes: "Add a book to a user from a token and an isbn",
            tags: ["users", "books"],
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
        method: "GET",
        path: "/users/removeBook/{token}/{isbn}",
        handler: async (request, h) => {
            try {
                return h.response(await userController.removeBookFromUser(request.params.token, request.params.isbn)).code(200)
            } catch(e) {
                return h.response(e).code(400)
            }
        },
        options: {
            description: "remove a book to a user",
            notes: "remove a book to a user from a token and an isbn",
            tags: ["users", "books"],
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
        method: "GET",
        path: "/books/{isbn}",
        handler: async (request, h) => {
            try {
                return h.response(await bookController.getBookInformation(request.params.isbn)).code(200)
            } catch(e) {
                return h.response(e).code(400)
            }
        },
        options: {
            description: "Get information about a book",
            notes: "Get information about a book from an isbn",
            tags: ["books"],
            validate: {
                params: Joi.object({
                    isbn: Joi.string().required().description("A book's isbn")
                })
            },
            response: {
                status: {
                    200: joiBook
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
