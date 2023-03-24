import { MongoClient, ObjectId } from "mongodb";
import { userModel } from "../model/userModel.mjs"

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const UserDao = {

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
        return await prisma.user.create({
            data: {
                login: login,
                password: hahedPassword,
                books: []
            }
        });
    }
}
