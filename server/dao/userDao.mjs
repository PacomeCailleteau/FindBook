import { MongoClient, ServerApiVersion } from "mongodb";

const uri = "mongodb+srv://mathieumarthy:gmiCyUDf7I1IZz6d3jhtkUa4NqjQYksJWB0BUZl3cLD1JKjrJdG@sae.7grcpoy.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});
