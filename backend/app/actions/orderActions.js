const Order = require('../db/models/Order');
const Product = require('../db/models/Product');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('products'); 
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Błąd podczas pobierania zamówień' });
  }
};

exports.createOrder = async (req, res) => {
  const { customerName, products } = req.body;
  
  const validProducts = await Product.find({ '_id': { $in: products } });
  if (validProducts.length !== products.length) {
    return res.status(400).json({ error: 'Niektóre produkty nie istnieją w bazie' });
  }

  try {
    const newOrder = new Order({
      customerName,
      products,
      status: 'Pending'
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ error: 'Błąd podczas tworzenia zamówienia' });
  }
};

// Akcja do aktualizacji statusu zamówienia
exports.updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Zamówienie nie znaleziono' });
    }

    // Aktualizacja statusu zamówienia
    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: 'Błąd podczas aktualizacji statusu zamówienia' });
  }
};