const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  trackingNumber: { type: String, required: true },
  shipmentDate: { type: Date, required: true },
  deliveryDate: { type: Date }
});

const Shipment = mongoose.model('Shipment', shipmentSchema);
module.exports = Shipment;