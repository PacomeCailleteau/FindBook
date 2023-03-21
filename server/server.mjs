"use strict";
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import HapiSwagger from "hapi-swagger";
import Hapi from "@hapi/hapi";
import Joi from "joi";
import {
    ParkingController
} from "./controller/ParkingController.mjs";
import {RestaurantController} from "./controller/RestaurantController.mjs";
import {RestaurantsDao} from "./dao/RestaurantsDao.mjs";
import {userBDDao} from "./dao/userDao.mjs";
import assert from 'node:assert'
import Restaurant from "./model/restaurant.mjs"
import User from "./model/user.mjs";


// --- patterns --- //
const joiParking = Joi.object({
    identifiant: Joi.string().required().description("L'identifiant du parking"),
    nom: Joi.string().required().description("Le nom"),
    ouvert: Joi.boolean().required().description("Si le parking est ouvert ou non"),
    horodatage: Joi.date().required().description("La date de la dernière place prise"),
    nombreDePlacesDisponibles: Joi.number().required().description("Le nombre de places qu'il reste"),
    latitude: Joi.number().required().description("La latitude"),
    longitude: Joi.number().required().description("La longitude"),
}).description("Parking")

const joiParkings = Joi.array().items(joiParking).description("Une liste de parkings")

const joiRestaurant = Joi.object({
    nom: Joi.string().required().description("Le nom du restaurant"),
    type: Joi.string().required().description("Le type de cuisine"),
    categorie: Joi.string().required().description("La catégorie"),
    adresse1: Joi.string().required().description("L'adresse"),
    adresse2: Joi.string().required().description("L'adresse"),
    adresse3: Joi.string().required().description("L'adresse"),
    codePostal: Joi.string().required().description("Le code postal"),
    latitude: Joi.number().required().description("La latitude"),
    longitude: Joi.number().required().description("La longitude")
}).description("Restaurant")

const joiRestaurants = Joi.array().items(joiRestaurant).description("Une liste de restaurants")

const joiUser = Joi.object({
    id: Joi.number().required().description("L'id de l'utilisateur"),
    login: Joi.string().required().description("Le login de l'utilisateur"),
    password: Joi.string().required().description("Le mot de passe de l'utilisateur"),
}).description("User");

const joiUsers = Joi.array().items(joiUser).description("Une liste d'utilisateurs");

// --- Swagger --- //
const swaggerOptions = {
    info: {
        title: "L'API des parkings de Nantes",
        version: "1.0.0",
    }
};


const lastRequest = new Date();
await ParkingController.refreshParkings()

// --- Routes --- //
const routes = [
    {
        method: "GET",
        path: "/parkings",
        handler: async (request, h) => {
            try {
                const date = new Date();

                const minutesDiff = date.getTime() - lastRequest.getTime();

                if (minutesDiff > 1) {
                    await ParkingController.refreshParkings()
                }

                return h.response(await ParkingController.findAll()).code(200)
            } catch(e) {
                return h.response(e).code(400)
            }

        },
        options: {
            description: "Tous les parkings",
            notes: "Retourne la liste de tous les parkings",
            tags: ["api"],
            response: {
                status: {
                    200: joiParkings
                }
            }
        }
    },
    {
        method: "GET",
        path: "/parking/distance/{latitude}/{longitude}",
        handler: async (request, h) => {
            try {
                return h.response(await ParkingController.findNearest(request.params.latitude, request.params.longitude)).code(200)
            } catch(e) {
                return h.response(e).code(400)
            }
        },
        options: {
            description: "Les parkings les plus proches",
            notes: "Retourne la liste des parkings les plus proches",
            tags: ["api"],
            response: {
                status: {
                    200: joiParkings
                }
            }
        }
    },
    {
        method: "GET",
        path: "/restaurants",
        handler: async (request, h) => {
            try {
                return h.response(await RestaurantController.findAll()).code(200)
            } catch(e) {
                return h.response(e).code(400)
            }
        },
        options: {
            description: "Tous les restaurants",
            notes: "Retourne la liste de tous les restaurants",
            tags: ["api"],
            response: {
                status: {
                    200: joiRestaurants
                }
            }
        }
    },
    {
        method: "GET",
        path: "/user",
        handler: async (request, h) => {
            try {
                return h.response(await userBDDao.findAll()).code(200)
            } catch(e) {
                return h.response(e).code(400)
            }
        },
        options: {
            description: "Tous les users",
            notes: "Retourne la liste de tous les users",
            tags: ["api"],
            response: {
                status: {
                    200: joiUsers
                }
            }
        }
    },
    {
        method: "GET",
        path: "/user/{login}",
        handler: async (request, h) => {
            try {
                return h.response(await userBDDao.findByLogin(request.params.login)).code(200)
            } catch(e) {
                return h.response(e).code(400)
            }
        },
        options: {
            description: "Un user",
            notes: "Retourne un user",
            tags: ["api"],
            response: {
                status: {
                    200: joiUser
                }
            }
        }
    },
    {
        method: "POST",
        path: "/user",
        handler: async (request, h) => {
            try {
                return h.response(await userBDDao.create(request.payload)).code(200)
            } catch(e) {
                return h.response(e).code(400)
            }
        },
        options: {
            description: "Créer un user",
            notes: "Créer un user",
            tags: ["api"],
            response: {
                status: {
                    200: joiUser
                }
            },
            validate: {
                payload: joiUser
            }
        }
    },
    {
        method: "PUT",
        path: "/user/{login}",
        handler: async (request, h) => {
            try {
                return h.response(await userBDDao.update(request.params.login, request.payload)).code(200)
            } catch(e) {
                return h.response(e).code(400)
            }
        },
        options: {
            description: "Modifier un user",
            notes: "Modifier un user",
            tags: ["api"],
            response: {
                status: {
                    200: joiUser
                }
            },
            validate: {
                payload: joiUser
            }
        }
    },
    {
        method: "DELETE",
        path: "/user/{login}",
        handler: async (request, h) => {
            try {
                return h.response(await userBDDao.delete(request.params.login)).code(200)
            } catch(e) {
                return h.response(e).code(400)
            }
        },
        options: {
            description: "Supprimer un user",
            notes: "Supprimer un user",
            tags: ["api"],
            response: {
                status: {
                    200: joiUser
                }
            },
            validate: {
                payload: joiUser
            }
        }
    },
    {
        method: "POST",
        path: "/user/{login}/addRestaurant",
        handler: async (request, h) => {
            try {
                return h.response(await userBDDao.addRestaurant(request.params.login, request.payload)).code(200)
            } catch(e) {
                return h.response(e).code(400)
            }
        }
    },
    {
        method: "DELETE",
        path: "/user/{login}/deleteRestaurant/{id}",
        handler: async (request, h) => {
            try {
                return h.response(await userBDDao.deleteRestaurant(request.params.login, request.params.id)).code(200)
            } catch(e) {
                return h.response(e).code(400)
            }
        }
    },
    {
        method: "GET",
        path: "/test",
        handler: async (request, h) => {
            //Un exemple de test
            "use strict"


            await RestaurantsDao.deleteAll()
            await userBDDao.deleteAll()
            let restaurants = await RestaurantsDao.findAll()
            assert.deepStrictEqual(restaurants,[])
            let users = await userBDDao.findAll()
            assert.deepStrictEqual(users,[])
            let userToAdd = new User({login:"jojo", password:"p"})
            let userAdded = await userBDDao.save(userToAdd)
            assert.deepStrictEqual(userToAdd,userAdded)
            let restauranttoAdd = new Restaurant({
                nomDeLOffreTouristique : "LA GALETTE BRETONNE",
                typeDeRestaurant : "Restaurant",
                categorieDuRestaurant : "Restaurant gastronomique - cuisin",
                adresse1 : "",
                adresse2 : "",
                adresse3 : "",
                codePostal : "44 770",
                latitude: 47.137,
                longitude: -2.190
        })
            users = userBDDao.addRestaurant(userAdded, restauranttoAdd)
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
