import { userModel } from "../model/userModel.mjs"

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const userDao = {

    /**
     * Get all users
     * @returns Array of users
     */
    async getAllUsers() {
        const users = await prisma.user.findMany({
            include: {
                books: true
            }
        })
        return users.map(user => new userModel(user))
    },


    /**
     * Get user by token
     * @param {string} token 
     * @returns User
     */
    async getUserByToken(token) {
        const user = await prisma.user.findUnique({
            where: {
                token: token
            },
            include: {
                books: true
            }
        });
        return user === null ? null : new userModel(user);
    },


    /**
     * Get user by login
     * @param {string} login 
     * @returns User
     */
    async getUserByLogin(login) {
        const user = await prisma.user.findUnique({
            where: {
                login: login
            },
            include: {
                books: true
            }
        });
        return user === null ? null : new userModel(user);
    },


    /**
     * Add a new user
     * @param {string} login 
     * @param {string} hahedPassword 
     * @returns User
     */
    async createUser(login, hahedPassword) {
        const token = await this.generateNewToken()
        await prisma.user.create({
            data: {
                login: login,
                password: hahedPassword,
                books: {},
                token: token
            }
        });
        return this.getUserByToken(token);
    },


    /**
     * Add a new book to user
     * @param {string} token
     * @param {string} ibsn
     * @returns User
     */
    async addBookToUser(token, ibsn) {
        // Check if user exist
        const user = await this.getUserByToken(token);
        if (user === null) {
            return null;
        }

        // Check if book already exist in user's books
        if (user.books.find(book => book.isbn === ibsn)) {
            return user;
        }


        const book = {
            isbn: ibsn,
            title: "title",
            cover: "cover"
        } // TODO: get book from API

        // Add book to user
        await prisma.user.update({
            where: {
                token: token
            },
            data: {
                books: {
                    create: book
                }
            }
        });

        // Return user
        return this.getUserByToken(token);
    },


    token() {
        let token = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$&*";
        for (let i = 0; i < 50; i++) {
            token += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return token;
    },


    /**
     * Get a new unique token
     * @returns {string} token
     */
    async generateNewToken() {
        let token = this.token();
        let alreadyExist = await prisma.user.findUnique({
            where: {
                token: token
            }
        });

        while (alreadyExist) {
            token = this.token();
            alreadyExist = await prisma.user.findUnique({
                where: {
                    token: token
                }
            });
        }
        return token;
    },
}
