const express = require("express");
const router = express.Router();

router.use(require("./authRoutes"));
router.use(require("./productRoutes"));
router.use(require("./transportRoutes"));
router.use(require("./vehicleRoutes"));
router.use(require("./workerRoutes"));
router.use(require("./warehouseRoutes"));

module.exports = router;