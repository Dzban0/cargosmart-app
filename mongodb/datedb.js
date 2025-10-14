const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;


async function processDB() {
    const url = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(url);

    try {

    } catch (err) {
        console.error(err);
    } 
}

processDB();