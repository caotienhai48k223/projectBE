const express = require("express");
const router = express.Router();
const productsController = require("../../controllers/admin/product-controller");

router.get("/", productsController.products);

router.patch(
  "/change-status/:availabilityStatus/:id",
  productsController.changeStatus
);

router.patch("/change-multi", productsController.changeMulti);

module.exports = router;
