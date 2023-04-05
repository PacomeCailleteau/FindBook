import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import HapiSwagger from "hapi-swagger";
import Hapi from "@hapi/hapi";
import Joi from "joi";

import { userController } from "./controller/userController.mjs";
import { bookController } from "./controller/bookController.mjs";
import {statController} from "./controller/statController.mjs";


// --- patterns --- //
// création d'un Joi pour un user
const joiUser = Joi.object({
    id: Joi.number().required().description("User's id"),
    login: Joi.string().required().description("User's login"),
    books: Joi.array().items(Joi.object()).description("Isbn of the books the user has read"),
}).description("A user with all his information");

// création d'un Joi pour les users
const joiUsers = Joi.array().items(joiUser).description("An array of users");

// création d'un Joi pour un book
const joiBook = Joi.object({
    isbn: Joi.number().description("Book's isbn, unique identifier"),
    title: Joi.string().required().description("Book's title"),
    cover: Joi.string().description("Book's cover"),
    authors: Joi.array().items(Joi.string()).description("Book's authors"),
    publishedDate: Joi.string().description("Book's published date"),
    description: Joi.string().description("Book's description"),
}).description("A book with all his information");

// création d'un Joi pour les books
const joiBooks = Joi.array().items(joiBook).description("An array of books");

// création d'un Joi pour une stat
const joiStat = Joi.object({
    search: Joi.string().required().description("The search parameters"),
    nb_results: Joi.number().required().description("The number of results for the search parameters"),
}).description("A stat with all his information")

// création d'un Joi pour un message d'erreur
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
    //permet de récupérer tous les users
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
        // documentation
        options: {
            description: "Get all users",
            notes: "Get all users",
            tags: ["api", "users"],
            response: {
                status: {
                    200: joiUsers,
                    400: joiError
                }
            }
        },
    },

    //testé
    //permet de récupérer un user par son token
    {
        method: "GET",
        path: "/users/{token}",
        handler: async (request, h) => {
            try {
                // récupération du user
                const user = await userController.getUserByToken(request.params.token)

                // si le user n'existe pas on renvoie une erreur 404 (user not found)
                if (user === null) {
                    return h.response({
                        message: "user not found"
                    }).code(404);
                }

                // sinon on renvoie le user
                return h.response(user).code(200);
            } catch(e) {
                return h.response(e).code(400)
            }
        },
        // documentation
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
                    400: joiError,
                    404: joiError,
                }
            }
        }
    },

    //testé
    // permet de créer un user
    {
        method: "POST",
        path: "/users/create",
        handler: async (request, h) => {
            try {
                // récupération du login et du password
                const login = request.payload.login;
                const password = request.payload.password;
                // création du user et récupération du token associé au user
                const [token, user] = await userController.createUser(login, password)

                // si le user existe déjà on renvoie une erreur 409 (conflict) et on ne crée pas le user
                if (user === null) {
                    return h.response({
                        message: "user already exists"
                    }).code(409);
                }

                // sinon on renvoie le token et le user
                return h.response({
                    token: token,
                    user: user
                }).code(200);

            } catch(e) {
                return h.response(e).code(400)
            }
        },
        // documentation
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
                    400: joiError,
                    409: joiError
                }
            }
        }
    },

    //testé
    // permet de récupérer un user grace à son login et son password
    {
        method: "GET",
        path: "/users/login/{login}/{password}",
        handler: async (request, h) => {
            try {
                // récupération du token et du user associé au login et au password ainsi qu'un message d'erreur
                const [token, user, message] = await userController.loginUser(request.params.login, request.params.password)

                // si le user n'existe pas on renvoie une erreur 403 (forbidden) et on ne renvoie pas le token et le user
                // on renvoie plutôt le message d'erreur
                if (user === null) {
                    return h.response({
                        message: message
                    }).code(403);
                }

                // sinon on renvoie le token et le user
                return h.response({
                    token: token,
                    user: user
                }).code(200);
            } catch(e) {
                return h.response(e).code(400)
            }
        },
        // documentation
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
                    400: joiError,
                    403: joiError
                }
            }
        }
    },

    //testé
    // permet de supprimer un user grace à son token
    {
        method: "DELETE",
        path: "/users/delete/{token}",
        handler: async (request, h) => {
            try {
                // récupération du user supprimé
                const user = await userController.deleteUser(request.params.token);

                // si le user n'existe pas on renvoie une erreur 404 (user not found)
                if (user === null) {
                    return h.response({
                        message: "user not found"
                    }).code(404);
                }

                // sinon on renvoie le user supprimé
                return h.response(user).code(200)
            } catch(e) {
                return h.response(e).code(400)
            }
        },
        // documentation
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
                    400: joiError,
                    404: joiError
                }
            }
        }
    },

    //testé
    // permet de mettre à jour le login d'un user grace à son token
    {
        method: "PUT",
        path: "/users/update/login/{token}",
        handler: async (request, h) => {
            try {
                // récupération du nouveau login
                const login = request.payload.login;
                // récupération du user mis à jour et d'un message d'erreur
                const [user, message] = await userController.updateLogin(request.params.token, login)

                // si le user n'existe pas on renvoie une erreur 403 (forbidden) et on ne renvoie pas le user
                // on renvoie plutôt le message d'erreur
                if (user === null) {
                    return h.response({
                        message: message
                    }).code(403);
                }

                // sinon on renvoie le user mis à jour
                return h.response(user).code(200)
            } catch(e) {
                return h.response(e).code(400)
            }
        },
        // documentation
        options: {
            description: "update a user's login",
            notes: "update a user's login",
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
                    200: joiUser,
                    400: joiError,
                    403: joiError
                }
            }
        }
    },

    //testé
    // permet de mettre à jour le password d'un user grace à son token
    {
        method: "PUT",
        path: "/users/update/password/{token}",
        handler: async (request, h) => {
            try {
                // récupération du nouveau password
                const pass = request.payload.password;
                // récupération du token et du user mis à jour
                const [token, user] = await userController.updateUserPassword(request.params.token, pass);

                // si le user n'existe pas on renvoie une erreur 404 (user not found) et on ne renvoie pas le token et le user
                if (user === null) {
                    return h.response({
                        message: "user not found"
                    }).code(404);
                }

                // sinon on renvoie le token et le user mis à jour
                return h.response({
                    token: token,
                    user: user
                }).code(200);
            } catch(e) {
                return h.response(e).code(400)
            }
        },
        // documentation
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
                    400: joiError,
                    404: joiError
                }
            }
        }
    },

    //testé
    // permet de récupérer des books lié à un terme de recherche
    {
        method: "GET",
        path: "/books/search/{searchTerm}",
        handler: async (request, h) => {
            try {
                // on renvoie les books trouvé (un tableau de book)
                return h.response(await bookController.searchBookInformation(request.params.searchTerm)).code(200)
            } catch(e) {
                return h.response(e).code(400)
            }
        },
        // documentation
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
                    200: joiBooks,
                    400: joiError
                }
            }
        }
    },

    //testé
    // permet de récupérer un book grace à son isbn
    {
        method: "GET",
        path: "/books/isbn/{isbn}",
        handler: async (request, h) => {
            try {
                // récupération du book
                const book = await bookController.getBookInformation(request.params.isbn)

                // si le book n'existe pas on renvoie une erreur 404 (book not found) et on ne renvoie pas le book
                if (book === null) {
                    return h.response({
                        message: "book not found"
                    }).code(404);
                }

                // sinon on renvoie le book
                return h.response(book).code(200);
            } catch(e) {
                return h.response(e).code(400)
            }
        },
        // documentation
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
                    200: joiBook,
                    400: joiError,
                    404: joiError
                }
            }
        }
    },

    //testé
    // permet d'ajouter un book aux favoris d'un user grace à son token et à son isbn
    {
        method: "POST",
        path: "/users/addBook/{token}",
        handler: async (request, h) => {
            try {
                // récupération de l'isbn
                const isbn = request.payload.isbn;
                // récupération du token et du user mis à jour
                const [user, message] = await userController.addBookFromUser(request.params.token, isbn)

                // si le user n'existe pas on renvoie une erreur 403 (forbidden) et on ne renvoie pas le user
                // on revoie une erreur avec le message d'erreur récupéré
                if (user === null) {
                    return h.response({
                        message: message
                    }).code(403);
                }

                // sinon on renvoie le user mis à jour
                return h.response(user).code(200)
            } catch(e) {
                return h.response(e).code(400)
            }
        },
        // documentation
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
                    400: joiError,
                    403: joiError
                }
            }
        }
    },

    //testé
    // permet de supprimer un book des favoris d'un user grace à son token et à son isbn
    {
        method: "DELETE",
        path: "/users/removeBook/{token}/{isbn}",
        handler: async (request, h) => {
            try {
                // récupération du token et du user mis à jour
                const [user, message] = await userController.removeBookFromUser(request.params.token, request.params.isbn)

                // si le user n'existe pas on renvoie une erreur 403 (forbidden) et on ne renvoie pas le user
                // on revoie une erreur avec le message d'erreur récupéré
                if (user === null) {
                    return h.response({
                        message: message
                    }).code(403);
                }

                // sinon on renvoie le user mis à jour
                return h.response(user).code(200)
            } catch(e) {
                return h.response(e).code(400)
            }
        },
        // documentation
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
                    200: joiUser,
                    400: joiError,
                    403: joiError
                }
            }
        }
    },

    //testé
    // permet de récupérer le nombre de recherche d'un terme depuis un mois
    {
        method: "GET",
        path: "/stat/{searchTerm}",
        handler: async (request, h) => {
            try {
                // récupération du nombre de recherche
                const res = await statController.getStatInformation(request.params.searchTerm)
                // renvoie du nombre de recherche
                return h.response(res).code(200)
            } catch(e) {
                return h.response(e).code(400)
            }
        },
        // documentation
        options: {
            description: "Get a stat by search term",
            notes: "Get a stat by search term (the number of research in google.com since one month)",
            tags: ["api", "search"],
            validate: {
                params: Joi.object({
                    searchTerm : Joi.string().required().description("A research term")
                })
            },
            response: {
                status: {
                    200: joiStat,
                    400: joiError
                }
            }
        }
    },

    //testé
    // lorsqu'une route n'est pas trouvée on renvoie une erreur 404 et le message "route not found"
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
        // documentation
        options: {
            description: "error 404",
            notes: "error 404",
            tags: ["api"],
            response: {
                status: {
                    404: joiError
                }
            },
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

// fonction d'initialisation du serveur
export const init = async () => {
    await server.initialize();
    return server;
};

// fonction de lancement du serveur
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
