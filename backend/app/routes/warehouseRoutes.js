const express = require("express");
const router = express.Router();

const warehouseActions = require("../actions/api/warehouseActions");

router.get("/warehouses", warehouseActions.getAllWarehouses);
router.get("/warehouses/:id", warehouseActions.getWarehouse);
router.post('/warehouses', warehouseActions.saveWarehouse);
router.put('/warehouses/:id', warehouseActions.updateWarehouse);
router.delete('/warehouses/:id', warehouseActions.deleteWarehouse);

module.exports = router;