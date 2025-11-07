const express = require('express');
const router = express.Router();

const productActions = require('../actions/productActions');
const orderActions = require('../actions/orderActions');
const shipmentActions = require('../actions/shipmentActions');

router.get('/products', productActions.getAllProducts);
router.post('/products', productActions.createProduct);
router.get('/orders', orderActions.getAllOrders);
router.post('/orders', orderActions.createOrder);
router.get('/shipments', shipmentActions.getAllShipments);
router.post('/shipments', shipmentActions.createShipment);

module.exports = router;