const Delivery = require("../../db/models/Deliveries");

exports.createDelivery = async (req, res) => {
  const { type, warehouseId, order, products, datePlanned } = req.body;

  try {
    const delivery = new Delivery({
      type,
      warehouseId,
      order,
      products,
      datePlanned
    });

    await delivery.save();
    res.status(201).json(delivery);
    
  } catch (err) {
    res.status(400).json({ error: "Nie udało się utworzyć delivery" });
  }
};

exports.addDelivery = async (data) => {
  try {
    const delivery = new Delivery(data);
    await delivery.save();
    return delivery;
  } catch (err) {
    throw new Error("Nie udało się zapisać dostawy: " + err.message);
  }
};

exports.getDeliveriesByWarehouse = async (warehouseId) => {
  try {
    const deliveries = await Delivery.find({ warehouseId }).sort({ date: -1 });
    return deliveries;
  } catch (err) {
    throw new Error("Nie udało się pobrać dostaw: " + err.message);
  }
};

exports.getDeliveryById = async (id) => {
  try {
    const delivery = await Delivery.findById(id);
    return delivery;
  } catch (err) {
    throw new Error("Nie udało się pobrać dostawy: " + err.message);
  }
};

exports.completeDelivery = async (req, res) => {
  const { deliveryId } = req.params;

  try {
    const delivery = await Delivery.findById(deliveryId);
    if (!delivery) return res.status(404).json({ error: "Delivery nie znaleziono" });

    delivery.status = "Completed";
    delivery.dateCompleted = new Date();
    await delivery.save();

    if (delivery.type === "outbound") {
      const shipment = await Shipment.create({
        order: delivery.order,
        delivery: delivery._id,
        trackingNumber: "TRK-" + Date.now(),
        shipmentDate: new Date(),
        status: "InTransit"
      });

      await Order.findByIdAndUpdate(delivery.order, { status: "Shipped" });

      return res.json({ delivery, shipment });
    }

    res.json(delivery);

  } catch (err) {
    res.status(400).json({ error: "Błąd podczas kończenia delivery" });
  }
};

exports.updateDelivery = async (id, data) => {
  try {
    const updated = await Delivery.findByIdAndUpdate(id, data, { new: true });
    return updated;
  } catch (err) {
    throw new Error("Nie udało się zaktualizować dostawy: " + err.message);
  }
};

exports.deleteDelivery = async (id) => {
  try {
    await Delivery.findByIdAndDelete(id);
    return true;
  } catch (err) {
    throw new Error("Nie udało się usunąć dostawy: " + err.message);
  }
};