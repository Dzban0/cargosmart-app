const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

async function processDB() {
    const url = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(url);

    try {
        await client.connect();
        const db = client.db("DeliveryDB");

        let collection = db.collection("deliveries");  

        const options = { ordered: true };
        const result = await collection.insertMany(deliveries, options);
        console.log(`${result.insertedCount} deliveries were saved`);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

processDB();