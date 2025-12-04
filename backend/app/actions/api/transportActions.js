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
    const id = req.params.id;
    const type = req.body.pickup;
    const pickup = req.body.pickup;
    const destination = req.body.destination;
    const description = req.body.description;

    transport.type = type;
    transport.pickup = pickup;
    transport.destination = destination;
    transport.description = description;

    await transport.save();
    res.status(201).json(transport);
  }

  async deleteTransport(req, res) {
    const id = req.params.id;
    await Transport.deleteOne({ _id: req.params.id });

    res.sendStatus(204);
  }
}

module.exports = new TransportActions();
