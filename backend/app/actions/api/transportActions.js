const Transport = require("../../db/models/Transport");

class TransportActions {

  async saveTransport(req, res) {
    const { type, description, price } = req.body;

    try {
      const transport = new Transport({ type, description, price });
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
    const { type, description, price } = req.body;
    const transport = await Transport.findById(req.params.id);

    transport.type = type;
    transport.description = description;
    transport.price = price;

    await transport.save();
    res.status(201).json(transport);
  }

  async deleteTransport(req, res) {
    await Transport.deleteOne({ _id: req.params.id });
    res.sendStatus(204);
  }
}

module.exports = new TransportActions();
