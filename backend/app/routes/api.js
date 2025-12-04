const express = require("express");
const router = express.Router();

router.use(require("./authRoutes"));
router.use(require("./warehouseRoutes"));
router.use(require("./transportRoutes"));
router.use(require("./vehicleRoutes"));
router.use(require("./productRoutes"));

module.exports = router;