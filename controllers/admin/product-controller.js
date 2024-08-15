const Product = require('../../models/product-model')

const filterStatusHelper = require('../../helpers/filter-status')

const searchHelper = require('../../helpers/search')

const paginationHelper = require('../../helpers/pagination')

module.exports.products = async (req, res)=> {

  const filterStatus = filterStatusHelper(req.query)

  const find = {
    deleted: false
  }

  if (req.query.availabilityStatus) {
    find.availabilityStatus = req.query.availabilityStatus
  }
  
  const objectSearch = searchHelper(req.query)
  
  if (objectSearch.regex) {
    find.title = objectSearch.regex
  }

  const countProduct = await Product.countDocuments(find)

  let objectPagination = paginationHelper({
    currentPage: 1,
    limitItems: 1
  }, req.query, countProduct)


  const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip)

  res.render('admin/pages/products/products', {
    pageTitle: "Quản Lý Sản Phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination
  })
}