const Shipment = require('../../db/models/shipments');
const Order = require('../../db/models/orders');

exports.getAllShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find().populate('order');
    res.json(shipments);
  } catch (err) {
    res.status(500).json({ error: 'Błąd podczas pobierania wysyłek' });
  }
};

exports.createShipment = async (req, res) => {
  const { orderId, trackingNumber, shipmentDate, deliveryDate } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Zamówienie nie znaleziono' });
    }

    const newShipment = new Shipment({
      order: orderId,
      trackingNumber,
      shipmentDate,
      deliveryDate
    });

    await newShipment.save();
    res.status(201).json(newShipment);
  } catch (err) {
    res.status(400).json({ error: 'Błąd podczas tworzenia wysyłki' });
  }
};

exports.updateShipmentStatus = async (req, res) => {
  const { shipmentId, deliveryDate } = req.body;

  try {
    const shipment = await Shipment.findById(shipmentId);
    if (!shipment) {
      return res.status(404).json({ error: 'Wysyłka nie znaleziona' });
    }

    shipment.deliveryDate = deliveryDate;
    await shipment.save();
    res.json(shipment);
  } catch (err) {
    res.status(400).json({ error: 'Błąd podczas aktualizacji statusu wysyłki' });
  }
};