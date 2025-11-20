const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
  },
  quantity: { 
    type: Number, 
    required: true,
  },
  warehouseId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Warehouse", 
    required: true, 
  }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;