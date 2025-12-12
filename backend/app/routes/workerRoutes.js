const express = require("express");
const router = express.Router();

const workerActions = require("../../actions/api/workerActions");

router.get("/", workerActions.getAllWorkers);
router.get("/:id", workerActions.getWorker);
router.post("/", workerActions.saveWorker);
router.put("/:id", workerActions.updateWorker);
router.delete("/:id", workerActions.deleteWorker);

module.exports = router;