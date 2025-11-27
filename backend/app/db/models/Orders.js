const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },

  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number
  }],

  status: { 
    type: String,
    enum: ['Pending', 'InWarehouse', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },

  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;