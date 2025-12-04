const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  warehouseId: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse" },

  type: {
    type: String,
    enum: ["inbound", "outbound"],
    required: true
  },

  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  shipment: { type: mongoose.Schema.Types.ObjectId, ref: "Shipment" },

  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: Number
  }],

  status: {
    type: String,
    enum: ["Planned", "InProgress", "Completed", "Cancelled"],
    default: "Planned"
  },

  datePlanned: Date,
  dateCompleted: Date
});

const Delivery = mongoose.model("Delivery", deliverySchema);

module.exports = Delivery;