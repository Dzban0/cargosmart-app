const Vehicle = require("../../db/models/Vehicles");

class VehicleActions {

  async saveVehicle(req, res) {
    const { name, registration, capacity } = req.body;

    try {
      const vehicle = new Vehicle({ name, registration, capacity });
      await vehicle.save();
      res.status(201).json(vehicle);
    } catch (err) {
      res.status(422).json({ message: err.message });
    }
  }

  async getAllVehicles(req, res) {
    const vehicles = await Vehicle.find({});
    res.status(200).json(vehicles);
  }

  async getVehicle(req, res) {
    const vehicle = await Vehicle.findById(req.params.id);
    res.status(200).json(vehicle);
  }

  async updateVehicle(req, res) {
    const { name, registration, capacity } = req.body;
    const vehicle = await Vehicle.findById(req.params.id);

    vehicle.name = name;
    vehicle.registration = registration;
    vehicle.capacity = capacity;

    await vehicle.save();
    res.status(201).json(vehicle);
  }

  async deleteVehicle(req, res) {
    await Vehicle.deleteOne({ _id: req.params.id });
    res.sendStatus(204);
  }
}

module.exports = new VehicleActions();