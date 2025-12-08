const Transport = require("../../db/models/Transport");

class TransportActions {

  async saveTransport(req, res) {
    const type = req.body.pickup;
    const pickup = req.body.pickup;
    const destination = req.body.destination;
    const description = req.body.description;

    let vehicle;

    try {
      const transport = new Transport({ type, pickup, destination, description});
      await transport.save();
      res.status(201).json(transport);
    } catch (err) {
      res.status(422).json({ message: err.message });
    }
  }

  async getAllTransports(req, res) {
    const transports = await Transport.find({});
    res.status(200).json(transports);
  }

  async getTransport(req, res) {
    const transport = await Transport.findById(req.params.id);
    res.status(200).json(transport);
  }

  async updateTransport(req, res) {
    try {
      const id = req.params.id;

      const transport = await Transport.findById(id);
      if (!transport) {
        return res.status(404).json({ message: "Transport not found" });
      }

      transport.type = req.body.type;
      transport.pickup = req.body.pickup;
      transport.destination = req.body.destination;
      transport.description = req.body.description;

      await transport.save();
      res.status(200).json(transport);
    } catch (err) {
      res.status(422).json({ message: err.message });
    }
  }

  async deleteTransport(req, res) {
    const id = req.params.id;
    await Transport.deleteOne({ _id: req.params.id });

    res.sendStatus(204);
  }
}

module.exports = new TransportActions();
