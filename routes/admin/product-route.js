const express = require("express");
const multer = require("multer")
const router = express.Router();
const storageMulter = require('../../helpers/storage-multer')
const upload = multer({ storage: storageMulter() })

const productsController = require("../../controllers/admin/product-controller");

router.get("/", productsController.products);

router.get("/deleted", productsController.recyclebins);

router.get("/create", productsController.create);

router.post("/create", upload.single("thumbnail"), productsController.createItem);

router.patch(
  "/change-status/:availabilityStatus/:id",
  productsController.changeStatus
);

router.patch("/change-multi", productsController.changeMulti);

router.delete("/delete/:id", productsController.deleteItem);

router.delete(
  "/deleted/delete-permanent/:id",
  productsController.deletePermanentItem
);

router.patch("/deleted/restore/:id", productsController.restoreItem);

module.exports = router;
