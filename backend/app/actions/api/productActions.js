const Product = require("../../db/models/Products");

class ProductActions {

  async saveProduct(req, res) {
    const name = req.body.name;
    const category = req.body.category;
    const quantity = req.body.quantity;
    const description = req.body.description;

    try {
      const product = new Product({ name, category, quantity, description });
      await product.save();
    } catch (err) {
      res.status(422).json({ message: err.message });
    }

    res.status(201).json(product);
  }

  async getAllProducts(req, res) {
    const doc = await Warehouse.find({});

    res.status(200).json(doc);
  }

  async getProduct(req, res) {
    const id = req.params.id;
    const product = await Product.findById({ _id: id });

    res.status(200).json(product);
  }

  async updateProduct(req, res) {
    const id = req.params.id;
    const name = req.body.name;
    const category = req.body.category;
    const quantity = req.body.quantity;
    const description = req.body.description;

    const product = await Product.findById({ _id: id });

    product.name = name;
    product.category = category;
    product.quantity = quantity;
    product.description = description;

    await product.save();
    res.status(201).json(product);
  }

  async deleteProduct(req, res) {
    const id = req.params.id;
    await Product.deleteOne({ _id: id });
    
    res.sendStatus(204);
  }
}

module.exports = new ProductActions();