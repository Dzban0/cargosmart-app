const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const bcrypt = require('bcryptjs');

async function processDB() {
    const url = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(url);

    try {
        await client.connect();
        const db = client.db("CargoSmartDB");

        let collection = db.collection("users");

        const users = [
            { firstName: "Kacper", lastName: "Dowbor", role: "admin", login: "kdowbor", password: "admin111"},
            { firstName: "Ewa", lastName: "Kowalska", role: "magazynier",  login: "ekowalska", password: "ewcia111" },
            { firstName: "Piotr", lastName: "Nowak", role: "spedytor",  login: "pnowak", password: "luty111" },
            { firstName: "Marian", lastName: "Musiał", role: "kierowca", login: "mmusial", password: "kier111"},
        ];

        const hashedUsers = await Promise.all(users.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            return { 
                ...user, 
                password: hashedPassword
            };
        }));

        const options = { order: true };

        const result = await collection.insertMany(hashedUsers, options);
        console.log(`${result.insertedCount} users were saved`);

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

processDB();