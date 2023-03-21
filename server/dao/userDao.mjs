const {MongoClient} = require('mongodb');

const client = new MongoClient("mongodb+srv://mathieumarthy:gmiCyUDf7I1IZz6d3jhtkUa4NqjQYksJWB0BUZl3cLD1JKjrJdG@sae.7grcpoy.mongodb.net/?retryWrites=true&w=majority");

async function main() {
    await client.connect();
    console.log("Connected to MongoDB!");
}
