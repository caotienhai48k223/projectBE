const Product = require('../../models/product-model')


module.exports.products = async (req, res)=> {
  const filterStatus = [
    {
      name:"All Product",
      status:"",
      class:""
    },
    {
      name:"In Stock",
      status:"In Stock",
      class:""
    },
    {
      name:"Low Stock",
      status: "Low Stock",
      class:""
    }
  ]

  if (req.query.availabilityStatus) {
    const index = filterStatus.findIndex(item => item.status == req.query.availabilityStatus)
    filterStatus[index].class='active'
  } else {
    const index = filterStatus.findIndex(item => item.status == "")
    filterStatus[index].class='active'
  }

  const find = {
    deleted: false
  }

  if (req.query.availabilityStatus) {
    find.availabilityStatus = req.query.availabilityStatus
  }

  let keyword = ""
  if (req.query.keyword) {
    keyword=req.query.keyword
    const regex = new RegExp(keyword, "i")
    find.title = regex
  }

  const products = await Product.find(find)
  res.render('admin/pages/products/products', {
    pageTitle: "Quản Lý Sản Phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: keyword
  })
}