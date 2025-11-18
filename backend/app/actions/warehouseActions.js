const Warehouse = require("../models/Warehouse");

exports.getWarehouses = async (req, res) => {
  try {
    const warehouses = await Warehouse.find();
    res.json(warehouses);
  } catch (error) {
    res.status(500).json({ message: "Błąd pobierania magazynów", error });
  }
};

exports.addWarehouse = async (req, res) => {
  try {
    const warehouse = new Warehouse(req.body);
    const saved = await warehouse.save();
    res.json(saved);
  } catch (error) {
    res.status(500).json({ message: "Błąd dodawania magazynu", error });
  }
};

exports.updateWarehouse = async (req, res) => {
  try {
    const updated = await Warehouse.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Błąd edycji magazynu", error });
  }
};

exports.deleteWarehouse = async (req, res) => {
  try {
    await Warehouse.findByIdAndDelete(req.params.id);
    res.json({ message: "Magazyn został usunięty" });
  } catch (error) {
    res.status(500).json({ message: "Błąd usuwania magazynu", error });
  }
};