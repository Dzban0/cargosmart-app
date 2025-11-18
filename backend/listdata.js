const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

async function showCollection() {
    const url = "mongodb://127.0.0.1:27017";
    const dbName = "CargoSmartDB";
    const collectionName = "warehouses"; 

    const client = new MongoClient(url);

    try {
        await client.connect();

        console.log("Połączono z MongoDB");

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const documents = await collection.find({}).toArray();

        console.log(`Zawartość kolekcji "${collectionName}" w bazie "${dbName}":`);
        console.log(documents);

    } catch (err) {
        console.error("Błąd:", err);
    } finally {
        await client.close();
    }
}

showCollection();
