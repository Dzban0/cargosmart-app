const Warehouse = require("../../db/models/Warehouses");

class WarehouseActions{

  async saveWarehouse(req, res) {
    const name = req.body.name;
    const address = req.body.address;
    const place = req.body.place;

    let warehouse;

    try {
      warehouse = new Warehouse({ name, address, place});
      await warehouse.save();
    } catch (err) {
      return res.status(422).json({ message: err.message });
    }

    res.status(201).json(warehouse);
  }
  
  async getAllWarehouses(req, res) {
    const doc = await Warehouse.find({});

    res.status(200).json(doc);
  }

  async getWarehouse(req, res) {
    const id = req.params.id;
    const warehouse = await Warehouse.findOne({ _id: id });

    res.status(200).json(warehouse);
  }

  async addWarehouse(req, res) {
    
  }

  async updateWarehouse(req, res) {
    const id = req.params.id;
    const name = req.body.name;
    const address = req.body.address;
    const place = req.body.place;

    const warehouse = await Warehouse.findOne({ _id: id });
    warehouse.name = name;
    warehouse.address = address;
    warehouse.place = place;
    await warehouse.save();

    res.status(201).json(warehouse);
  }

  async deleteWarehouse(req, res) {
    const id = req.params.id;
    await Warehouse.deleteOne({ _id: id });

    res.sendStatus(204);
  }
}

module.exports = new WarehouseActions();