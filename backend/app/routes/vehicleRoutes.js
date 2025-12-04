const express = require("express");
const router = express.Router();
const vehicleActions = require("../actions/api/vehicleActions");

router.get("/vehicles", vehicleActions.getAllVehicles);
router.get("/vehicles/:id", vehicleActions.getVehicle);
router.post("/vehicles", vehicleActions.saveVehicle);
router.put("/vehicles/:id", vehicleActions.updateVehicle);
router.delete("/vehicles/:id", vehicleActions.deleteVehicle);

module.exports = router;