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
    async getUserById(id) {
        const user = await this.collection.findOne({ _id: new ObjectId(id) });
        return user === null ? null : new userModel(user);
    }


    /**
     * Add a new user
     * @param {string} login 
     * @param {string} hahedPassword 
     * @returns 
     */
    async createUser(login, hahedPassword) {
        return await this.collection.insertOne({ login: login, password: hahedPassword, books: [], token: await this.generateNewToken() });
    }
    
    token() {
        const token = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";
        for (let i = 0; i < 50; i++) {
            token += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return token;
    };

    /**
     * Generate a new unique token
     * @returns unique token
     */
    async generateNewToken() {
        let token = this.token();
        let alreadyExist = await this.collection.findOne({ token: token });

        while (alreadyExist) {
            console.log("generateNewToken");
            token = this.token();
            alreadyExist = await this.collection.findOne({ token: token });
        }
        return token;
    }

    /**
     * Get user associated to the token
     * @param {string} token token of the user
     * @returns User or null
     */
    async getUserByToken(token) {
        const user = await this.collection.findOne({ token: token });
        return user === null ? null : new userModel(user);
    }
}

export const userDao = new UserDao("mongodb+srv://sae:sae@sae.7grcpoy.mongodb.net/?retryWrites=true&w=majority");
