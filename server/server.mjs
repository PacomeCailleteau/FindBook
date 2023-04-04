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

const joiUsers = Joi.array().items(joiUser).description("An array of users");

const joiBook = Joi.object({
    isbn: Joi.number().description("Book's isbn, unique identifier"),
    title: Joi.string().required().description("Book's title"),
    cover: Joi.string().description("Book's cover"),
    authors: Joi.array().items(Joi.string()).description("Book's authors"),
    publishedDate: Joi.string().description("Book's published date"),
    description: Joi.string().description("Book's description"),
}).description("A book with all his information");

const joiBooks = Joi.array().items(joiBook).description("An array of books");

const joiError = Joi.object({
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
    //testé
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
            tags: ["api", "users"],
            response: {
                status: {
                    200: joiUsers
                }
            }
        },
    },

    //testé
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
            tags: ["api", "users"],
            validate: {
                params: Joi.object({
                    token: Joi.string().required().description("A user's token")
                })
            },
            response: {
                status: {
                    200: joiUser,
                    404: joiError
                }
            }
        }
    },

    //testé
    {
        method: "POST",
        path: "/users/create",
        handler: async (request, h) => {
            try {
                const login = request.payload.login;
                const password = request.payload.password;
                const [token, user] = await userController.createUser(login, password)

                if (user === null) {
                    return h.response({
                        message: "user already exists"
                    }).code(409);
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
            description: "Create a new user",
            notes: "Create a new user from a login and a password",
            tags: ["api", "users"],
            validate: {
                payload: Joi.object({
                    login: Joi.string().required().description("A user's login"),
                    password: Joi.string().required().description("A user's password")
                })
            },
            response: {
                status: {
                    200: Joi.object({
                        token: Joi.string().required().description("A user's token"),
                        user: joiUser
                    }),
                    409: joiError
                }
            }
        }
    },

    //testé
    {
        method: "GET",
        path: "/users/login/{login}/{password}",
        handler: async (request, h) => {
            try {
                const [token, user, message] = await userController.loginUser(request.params.login, request.params.password)

                if (user === null) {
                    return h.response({
                        message: message
                    }).code(403);
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
            tags: ["api", "users"],
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
                        user: joiUser,
                        message: Joi.string().description("A information message")
                    }),
                    403: joiError
                }
            }
        }
    },

    //testé
    {
        method: "DELETE",
        path: "/users/delete/{token}",
        handler: async (request, h) => {
            try {
                const user = await userController.deleteUser(request.params.token);
                
                if (user === null) {
                    return h.response({
                        message: "user not found"
                    }).code(404);
                }
                return h.response(user).code(200)
            } catch(e) {
                return h.response(e).code(400)
            }
        },
        options: {
            description: "Delete a user",
            notes: "Delete a user from a token",
            tags: ["api", "users"],
            validate: {
                params: Joi.object({
                    token: Joi.string().required().description("A user's token")
                })
            },
            response: {
                status: {
                    200: joiUser,
                    404: joiError
                }
            }
        }
    },

    //testé
    {
        method: "PUT",
        path: "/users/update/login/{token}",
        handler: async (request, h) => {
            try {
                const login = request.payload.login;
                const user = await userController.updateLogin(request.params.token, login)

                if (user === null) {
                    return h.response({
                        message: "user not found"
                    }).code(404);
                }

                return h.response(user).code(200)
            } catch(e) {
                return h.response(e).code(400)
            }
        },
        options: {
            description: "update a user's login",
            notes: "update a user's login :)",
            tags: ["api", "users"],
            validate: {
                params: Joi.object({
                    token: Joi.string().required().description("The new login")
                }),
                payload: Joi.object({
                    login: Joi.string().required().description("A user's token")
                })
            },
            response: {
                status: {
                    200: joiUser
                }
            }
        }
    },

    //testé
    {
        method: "PUT",
        path: "/users/update/password/{token}",
        handler: async (request, h) => {
            try {
                const pass = request.payload.password;
                const [token, user] = await userController.updateUserPassword(request.params.token, pass);
                
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
            description: "Update the password of a user",
            notes: "Update the password of a user, change the token too",
            tags: ["api", "users"],
            validate: {
                params: Joi.object({
                    token: Joi.string().required().description("A user's token")
                }),
                payload: Joi.object({
                    password: Joi.string().required().description("A user's token")
                })
            },
            response: {
                status: {
                    200: Joi.object({
                        token: Joi.string().required().description("New user's token"),
                        user: joiUser
                    }),
                    404: joiError
                }
            }
        }
    },

    //testé
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
            tags: ["api", "books"],
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

    //testé
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
            tags: ["api", "books"],
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

    //testé
    {
        method: "POST",
        path: "/users/addBook/{token}",
        handler: async (request, h) => {
            try {
                const isbn = request.payload.isbn;
                const user = await userController.addBookFromUser(request.params.token, isbn)

                if (user === null) {
                    return h.response({
                        message: "user not found"
                    }).code(403);
                }

                return h.response(user).code(200)
            } catch(e) {
                return h.response(e).code(400)
            }
        },
        options: {
            description: "Add a book to a user",
            notes: "Add a book to a user from a token and an isbn",
            tags: ["api", "users", "books"],
            validate: {
                params: Joi.object({
                    token: Joi.string().required().description("A user's token")
                }),
                payload: Joi.object({
                    isbn: Joi.string().required().description("A book's isbn")
                })
            },
            response: {
                status: {
                    200: joiUser,
                    403: joiError
                }
            }
        }
    },

    //testé
    {
        method: "DELETE",
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
            tags: ["api", "users", "books"],
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

    //testé
    {
        method: "*",
        path: "/{any*}",
        handler: async (request, h) => {
            try {
                return h.response({
                    message: "route not found"
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

// cors accept all
// --- Hapi config --- //
const server = Hapi.server({
    port: 3001,
    host: "localhost",
    routes: {
        cors: {
            origin: ["*"],
            additionalHeaders: ["cache-control", "x-requested-with"]
        }
    }
});

server.route(routes);

export const init = async () => {
    await server.initialize();
    return server;
};

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
