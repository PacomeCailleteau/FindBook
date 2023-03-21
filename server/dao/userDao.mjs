import { MongoClient, ObjectId } from "mongodb";


class UserDao {
    constructor(uri) {
        this.client = new MongoClient(uri);
        this.client.connect();
        this.db = this.client.db("books-sae");
        this.collection = this.db.collection("user");
    }


    async getAllUsers() {
        return await this.collection.find({}).toArray()
    }

    
    async getUserById(id) {
        return await this.collection.findOne({ _id: new ObjectId(id) });
    }
}

export const userDao = new UserDao("mongodb+srv://sae:sae@sae.7grcpoy.mongodb.net/?retryWrites=true&w=majority");
