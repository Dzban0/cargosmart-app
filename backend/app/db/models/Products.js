const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    enum: ["Elektronika", "Materiały budowlane", "Narzędzia", "Chemia", "Meble", "Odzież", "Spożywcze", "Napoje","Inne"], 
    required: true 
  },
  quantity: { type: Number, default: 0 },
  description: { type: String }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;