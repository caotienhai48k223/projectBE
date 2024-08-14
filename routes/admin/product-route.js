const express = require("express")
const router = express.Router()
const productsController = require('../../controllers/admin/product-controller')

router.get('/', productsController.products)

module.exports = router