const express = require("express");
const router = express.Router();

const productActions = require("../actions/api/productActions");

router.get("/products", productActions.getAllProducts);
router.get("/products/:id", productActions.getProduct);
router.post("/products", productActions.saveProduct);
router.put("/products/:id", productActions.updateProduct);
router.delete("/products/:id", productActions.deleteProduct);

module.exports = router;
