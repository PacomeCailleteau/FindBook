import { MongoClient } from "mongodb";

const url = "mongodb+srv://mathieumarthy:gmiCyUDf7I1IZz6d3jhtkUa4NqjQYksJWB0BUZl3cLD1JKjrJdG@sae.7grcpoy.mongodb.net/?retryWrites=true&w=majority";

class UserDao {
  constructor(uri) {
    this.uri = uri;
    this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    this.dbName = "sae";
    this.collectionName = "users";

    this.connect();
  }

  async connect() {
    await this.client.connect();
    this.collection = this.client.db(this.dbName).collection(this.collectionName);
  }

  async getAllUser() {
    if (!this.collection) {
      await this.connect();
    }

    const users = await this.collection.find({}).toArray();
    return users;
  }
}

export const userDao = new UserDao(url);
