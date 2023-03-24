import { userModel } from "../model/userModel.mjs"

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const userDao = {

    /**
     * Get all users
     * @returns Array of users
     */
    async getAllUsers() {
        const users = await prisma.user.findMany();
        return users.map(user => new userModel(user))
    },


    /**
     * Get user by id
     * @param {string} id 
     * @returns User
     */
    async getUserByLogin(login) {
        const user = await prisma.user.findUnique({
            where: {
                login: login
            }
        });
        return user === null ? null : new userModel(user);
    },


    /**
     * Add a new user
     * @param {string} login 
     * @param {string} hahedPassword 
     * @returns 
     */
    async createUser(login, hahedPassword) {
        prisma.user.create({
            data: {
                login: login,
                password: hahedPassword,
                books: {}
            }
        })
            .then(user => {
                console.log("User created: ", user);
            })
            .catch(e => {
                console.error(e);
            })
        return this.getUserByLogin(login);
    },

    /**
     * Add a new book to user
     * @param {string} login
     * @param {string} bookId
     */
    async addBookToUser(login, bookId) {
        await prisma.user.update({
            where: {
                login: login
            },
            data: {
                books: {
                    connect: {
                        id: bookId
                    }
                }
            }
        });

    },
}
