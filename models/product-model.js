const mongoose = require('mongoose')

const slug = require('mongoose-slug-updater')

mongoose.plugin(slug)

const productSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    availabilityStatus: String,
    position: Number,
    slug: {
      type: String,
      slug: "title",
      unique: true
    },
    deleted: {
      type: Boolean,
      default:false
    },
    thumbnail: String,
    deleteDate: Date,
    restoreDate: Date
  }, {
    timestamps: true
  }
)

const Product = mongoose.model('Product', productSchema, 'products')

module.exports = Product