const Transport = require("../../db/models/Transport");

class TransportActions {

  async saveTransport(req, res) {
    const pickup = req.body.pickup; 
    const destination = req.body.destination;
    const driver = req.body.driver;
    const vehicle = req.body.vehicle;
    const status = req.body.status;
    const description = req.body.description;


    if (driver || vehicle) {
      const conflict = await Transport.findOne({
        status: "w trakcie",
        $or: [
          driver ? { driver } : null,
          vehicle ? { vehicle } : null
        ].filter(Boolean)
      });

      if (conflict) {
        return res.status(409).json({ message: "Kierowca lub pojazd zajęty" });
      }
    }

    let transport;

    try {
      transport = new Transport({ pickup, destination, driver, status, description});
      await transport.save();
    } catch (err) {
      return res.status(422).json({ message: err.message });
    }
    
    res.status(201).json(transport);
  }

  async getAllTransports(req, res) {
    const doc = await Transport.find({})
      .populate("driver")
      .populate("vehicle");

    res.status(200).json(transports);
  }

  async getTransport(req, res) {
    const id = req.params.id;
    const transport = await Transport.findById(req.params.id)
      .populate("driver")
      .populate("vehicle");

    if (!transport) {
      return res.status(404).json({ message: "Transport not found" });
    }

    res.status(200).json(transport);
  }

  async updateTransport(req, res) {
    try {
      const id = req.params.id;
      const { pickup, destination, driver, vehicle, status, description } = req.body;

      const transport = await Transport.findById(id);
      if (!transport) {
        return res.status(404).json({ message: "Transport not found" });
      }

      if (driver || vehicle) {
        const conflict = await Transport.findOne({
          _id: { $ne: id },
          status: "w trakcie",
          $or: [
            driver ? { driver } : null,
            vehicle ? { vehicle } : null
          ].filter(Boolean)
        });

        if (conflict) {
          return res.status(409).json({ message: "Kierowca lub pojazd zajęty" });
        }
      }

      transport.pickup = pickup;
      transport.destination = destination;
      transport.driver = driver || null;
      transport.vehicle = vehicle || null;
      transport.status = status;
      transport.description = description;

      await transport.save();

      const populated = await transport.populate("driver vehicle");
      res.status(200).json(populated);

    } catch (err) {
      res.status(422).json({ message: err.message });
    }
  }

  async deleteTransport(req, res) {
    await Transport.deleteOne({ _id: req.params.id });
    res.sendStatus(204);
  }
}

module.exports = new TransportActions();