const express = require("express");
const router = express.Router();

const warehouseActions = require("../actions/api/warehouseActions");
// const userActions = require("..../actions/api/userActions");
const shipmentActions = require("../actions/api/shipmentActions");
const productActions = require("../actions/api/productActions");
const orderActions = require("../actions/api/orderActions");


router.get("/warehouses", warehouseActions.getAllWarehouses);
router.get("/warehouses/:id", warehouseActions.getWarehouse);
router.post('/warehouses', warehouseActions.saveWarehouse)
router.put('/warehouses/:id', warehouseActions.updateWarehouse)
router.delete('/warehouses/:id', warehouseActions.deleteWarehouse)
// router.get("/shipments", shipmentActions);
// router.get("/products", productActions);
// router.get("/orders", orderActions);

module.exports = router;