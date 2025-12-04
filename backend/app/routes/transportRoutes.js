const express = require("express");
const router = express.Router();
const transportActions = require("../actions/api/transportActions");

router.get("/transports", transportActions.getAllTransports);
router.get("/transports/:id", transportActions.getTransport);
router.post("/transports", transportActions.saveTransport);
router.put("/transports/:id", transportActions.updateTransport);
router.delete("/transports/:id", transportActions.deleteTransport);

module.exports = router;