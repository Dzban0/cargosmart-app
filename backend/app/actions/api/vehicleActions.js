const Vehicle = require("../../db/models/Vehicles");

class VehicleActions {

  async saveVehicle(req, res) {
    const name = req.body.name;
    const type = req.body.type;
    const registration = req.body.registration;
    const capacity = req.body.capacity;
    const weight = req.body.weight;

    let vehicle;

    try {
      vehicle = new Vehicle({ name, type, registration, capacity, weight });
      await vehicle.save();
    } catch (err) {
      res.status(422).json({ message: err.message });
    }

    res.status(201).json(vehicle);
  }

  async getAllVehicles(req, res) {
    const doc = await Vehicle.find({});
    res.status(200).json(doc);
  }

  async getVehicle(req, res) {
    const vehicle = await Vehicle.findById(req.params.id);
    res.status(200).json(vehicle);
  }

  async updateVehicle(req, res) {
    const id = req.params.id;
    const name = req.body.name;
    const type = req.body.type;
    const registration = req.body.registration;
    const capacity = req.body.capacity;
    const weight = req.body.weight;

    const vehicle = await Vehicle.findOne({ _id: id });
    vehicle.name = name;
    vehicle.type = type;
    vehicle.registration = registration;
    vehicle.capacity = capacity;
    vehicle.weight = weight;
    await vehicle.save();

    res.status(201).json(vehicle);
  }

  async deleteVehicle(req, res) {
    const id = req.params.id;
    await Vehicle.deleteOne({ _id: req.params.id });
    
    res.sendStatus(204);
  }
}

module.exports = new VehicleActions();