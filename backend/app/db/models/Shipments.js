const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },

  delivery: { type: mongoose.Schema.Types.ObjectId, ref: 'Delivery' },

  trackingNumber: { type: String, required: true },

  shipmentDate: Date,
  deliveryDate: Date,

  status: {
    type: String,
    enum: ["Ready", "InTransit", "Delivered"],
    default: "Ready"
  }
});

const Shipment = mongoose.model('Shipment', shipmentSchema);

module.exports = Shipment;