const express = require("express");
const router = express.Router();
const workerActions = require("../actions/api/workerActions");

router.get("/workers", workerActions.getAllWorkers);
router.get("/workers/:id", workerActions.getWorker);
router.post("/workers", workerActions.saveWorker);
router.put("/workers/:id", workerActions.updateWorker);
router.delete("/workers/:id", workerActions.deleteWorker);

module.exports = router;