const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const Warehouse = mongoose.model('Warehouse', new mongoose.Schema({
  name: String,
  location: String,
}));

const Delivery = mongoose.model('Delivery', new mongoose.Schema({
  warehouseId: mongoose.Schema.Types.ObjectId,
  deliveryDate: Date,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
}));

const Product = mongoose.model('Product', new mongoose.Schema({
  deliveryId: mongoose.Schema.Types.ObjectId,
  name: String,
  quantity: Number,
}));

app.get('/api/warehouses', async (req, res) => {
  const warehouses = await Warehouse.find();
  res.json(warehouses);
});

app.post('/api/warehouses', async (req, res) => {
  const { name, location } = req.body;
  const newWarehouse = new Warehouse({ name, location });
  await newWarehouse.save();
  res.status(201).json(newWarehouse);
});

app.delete('/api/warehouses/:id', async (req, res) => {
  await Warehouse.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

app.get('/api/deliveries/:warehouseId', async (req, res) => {
  const deliveries = await Delivery.find({ warehouseId: req.params.warehouseId });
  res.json(deliveries);
});

app.post('/api/deliveries', async (req, res) => {
  const { warehouseId, deliveryDate } = req.body;
  const newDelivery = new Delivery({ warehouseId, deliveryDate });
  await newDelivery.save();
  res.status(201).json(newDelivery);
});

app.get('/api/products/:deliveryId', async (req, res) => {
  const products = await Product.find({ deliveryId: req.params.deliveryId });
  res.json(products);
});

app.post('/api/products', async (req, res) => {
  const { deliveryId, name, quantity } = req.body;
  const newProduct = new Product({ deliveryId, name, quantity });
  await newProduct.save();
  res.status(201).json(newProduct);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


async function processDB() {
    const url = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(url);

    try {

    } catch (err) {
        console.error(err);
    } 
}

processDB();