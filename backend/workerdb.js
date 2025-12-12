const mongoose = require("mongoose");
const Worker = require("./app/db/models/Workers");

mongoose.connect("mongodb://localhost:27017/CargoSmartDB/worker")
  .then(async () => {
    console.log("Connected! Seeding...");

    const initialWorkers = [
      { firstName: "Marcin", lastName: "Musiał", position: "Kierowca" },
      { firstName: "Piotr", lastName: "Nowak", position: "Spedytor" },
      { firstName: "Ewa", lastName: "Kowalska", position: "Magazynier" }
    ];

    await Worker.deleteMany({});
    await Worker.insertMany(initialWorkers);

    console.log("Seed complete!");
    process.exit();
  })
  .catch(err => console.error(err));