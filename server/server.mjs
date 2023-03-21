"use strict";
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import HapiSwagger from "hapi-swagger";
import Hapi from "@hapi/hapi";
import Joi from "joi";


// --- patterns --- //

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
