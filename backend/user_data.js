const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

async function processDB() {
    const url = "mongodb://127.0.0.1:27017/CargoSmart";
    const client = new MongoClient(url);

    try {
        await client.connect();
        const db = client.db("UserList");

        let collection = db.collection("users");

        const users = [
            { firstName: "Kacper", lastName: "Dowbor", role: "admin", login: "kdowbor", password: "admin111"},
            { firstName: "Ewa", lastName: "Kowalska", role: "magazynier",  login: "ekowalska", password: "ewcia111" },
            { firstName: "Piotr", lastName: "Nowak", role: "spedytor",  login: "pnowak", password: "luty111" },
            { firstName: "Marian", lastName: "Musiał", role: "kierowca", login: "mmusial", password: "kier111"},
        ];

        const options = { order: true };

        const result = await collection.insertMany(users, options);
        console.log('${result.insertedCount} users were saved');

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

processDB();