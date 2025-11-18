const express = require("express");
const router = express.Router();

router.use("/warehouses", require("../db/models/warehouses"));
router.use("/shipments", require("../db/models/shipments"));
router.use("/products", require("../db/models/products"));
router.use("/orders", require("../db/models/orders"));

module.exports = router;