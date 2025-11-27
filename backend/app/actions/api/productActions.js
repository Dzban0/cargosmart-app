const Product = require("../../db/models/Products");

class ProductActions {

  async saveProduct(req, res) {
    const { name, sku, quantity } = req.body;

    try {
      const product = new Product({ name, sku, quantity });
      await product.save();
      res.status(201).json(product);
    } catch (err) {
      res.status(422).json({ message: err.message });
    }
  }

  async getAllProducts(req, res) {
    const products = await Product.find({});
    res.status(200).json(products);
  }

  async getProduct(req, res) {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  }

  async updateProduct(req, res) {
    const { name, sku, quantity } = req.body;
    const product = await Product.findById(req.params.id);

    product.name = name;
    product.sku = sku;
    product.quantity = quantity;

    await product.save();
    res.status(201).json(product);
  }

  async deleteProduct(req, res) {
    await Product.deleteOne({ _id: req.params.id });
    res.sendStatus(204);
  }
}

module.exports = new ProductActions();