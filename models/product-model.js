const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    availabilityStatus: String,
    position: Number,
    deleted: Boolean,
    thumbnail: String,
    deleteDate: Date,
    restoreDate: Date
  }
)

const Product = mongoose.model('Product', productSchema, 'products')

module.exports = Product