import { userModel } from "../model/userModel.mjs"

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import { bookDao } from "./bookDao.mjs"

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
        // Check if user already exist
        const user = await this.getUserByLogin(login);
        if (user !== null) {
            return [null, null];
        }

        const token = await this.generateNewToken()
        await prisma.user.create({
            data: {
                login: login,
                password: hahedPassword,
                books: {},
                token: token
            }
        });

        const newUser = await this.getUserByToken(token)
        return [token, newUser];
    },

    /**
     * update user login
     * @param token
     * @param login
     * @returns {Promise<userModel|null>}
     */
    async updateLogin(token, login) {
        // Check if user already exist
        const user = await this.getUserByToken(token);
        if (user === null) {
            return null;
        }

        // Check if login already exist
        const userWithLogin = await this.getUserByLogin(login);
        if (userWithLogin !== null) {
            return null;
        }

        // update user's login
        const updatedUser = await prisma.user.update({
            where: {
                token: token
            },
            data: {
                login: login
            },
        });
        // return updated user
        return new userModel(updatedUser);
    },


    async loginUser(login, hahedPassword) {
        let user = await prisma.user.findFirst({
            where: {
                login: login
            },
            include: {
                books: true
            }
        });
        // return [token, user, message]

        // Si l'utilisateur existe et que son mot de passe est incorrect
        if (user !== null && user.password !== hahedPassword) {
            return [null, null, "Mot de passe incorrect"];
        }

        // Si l'utilisateur n'existe pas
        if (user === null) {
            return [null, null, "Utilisateur inconnu"];
        }

        // Si l'utilisateur existe et que son mot de passe est correct
        return [user.token, new userModel(user), null];
  
    },


    /**
     * Remove a user
     * @param {string} token 
     */
    async deleteUser(token) {
        try {
            const deletedUser = await prisma.user.delete({
                where: {
                    token: token,
                },
                include: {
                    books: false,
                },
            });
            return new userModel(deletedUser);
        } catch(e) {
            return null
        }
    },


    /**
     * Add a new book to user
     * @param {string} token
     * @param {string} ibsn
     * @returns User
     */
    async addBookFromUser(token, ibsn) {
        // Check if user exist
        const user = await this.getUserByToken(token);
        if (user === null) {
            return null;
        }

        // Check if book already exist in user's books
        if (user.books.find(book => book.isbn === ibsn)) {
            return user;
        }

        // Check if book exist in db
        let book = await prisma.books.findUnique({
            where: {
                isbn: ibsn
            }
        });

        // If book doesn't exist, create it
        if (book === null) {
            book = await bookDao.getBookInformation(ibsn);
            if (!book.cover) {
                book.cover = "";
            }

            // add book to db 
            await prisma.books.create({
                data: {
                    isbn: book.isbn,
                    title: book.title,
                    cover: book.cover
                }
            })
        }


        // Add book to user
        await prisma.user.update({
            where: {
                token: token
            },
            data: {
                books: {
                    connect: {
                        isbn: ibsn
                    }
                }
            }
        })


        // Return user
        return this.getUserByToken(token);
    },


    /**
     * Remove a book from user
     * @param {string} token 
     * @param {string} ibsn 
     * @returns User
     */
    async removeBookFromUser(token, ibsn) {
        // Check if user exist
        const user = await this.getUserByToken(token);
        if (user === null) {
            return null;
        }

        // Check if book already exist in user's books
        if (!user.books.find(book => book.isbn === ibsn)) {
            return user;
        }

        // Remove book from user
        await prisma.user.update({
            where: {
                token: token
            },
            data: {
                books: {
                    delete: {
                        isbn: ibsn
                    }
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
