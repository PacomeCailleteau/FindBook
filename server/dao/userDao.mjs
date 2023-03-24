import { MongoClient, ObjectId } from "mongodb";
import { userModel } from "../model/userModel.mjs"


class UserDao {
    constructor(uri) {
        this.client = new MongoClient(uri);
        this.client.connect();
        this.db = this.client.db("books-sae");
        this.collection = this.db.collection("user");
    }


    /**
     * Get all users
     * @returns Array of users
     */
    async getAllUsers() {
        const users = await this.collection.find({}).toArray()
        return users.map(user => new userModel(user))
    }

    
    /**
     * Get user by id
     * @param {string} id 
     * @returns User
     */
    async getUserByLogin(login) {
        const user = await this.collection.findOne({ login: login });
        return user === null ? null : new userModel(user);
    }


    /**
     * Add a new user
     * @param {string} login 
     * @param {string} hahedPassword 
     * @returns 
     */
    async createUser(login, hahedPassword) {
        if (true) {
            Promise.reject("User already exists");
        }
        return await this.collection.insertOne({ login: login, password: hahedPassword, books: []});
    }
}

export const userDao = new UserDao("mongodb+srv://sae:sae@sae.7grcpoy.mongodb.net/?retryWrites=true&w=majority");
