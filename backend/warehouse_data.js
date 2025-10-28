const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

async function processDB() {
    const url = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(url);

    try {
        await client.connect();
        const db = client.db("CargoSmartDB");

        let collection = db.collection("Warehouses");

        
        // const warehouses = [
        //     { name: "Magazyn A", location: "Kraków", contents: ["Produkt1", "Produkt2", "Produkt3"] },
        //     { name: "Magazyn B", location: "Kraków", contents: ["Produkt4", "Produkt5"] },
        //     { name: "Magazyn C", location: "Katowice", contents: ["Produkt6", "Produkt7", "Produkt8"] },
        // ];

        const options = { ordered: true };
        const result = await collection.insertMany(warehouses, options);
        console.log(`${result.insertedCount} warehouses were saved`);

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

processDB();