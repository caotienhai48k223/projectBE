const Product = require("../../models/product-model");

module.exports.products = async (req, res) => {
  const products = await Product.find({
    availabilityStatus: "In Stock",
    deleted: false,
  }).sort({ position: "desc" });
  const newProducts = products.map((item) => {
    item.newPrice = (
      item.price -
      item.price * 0.01 * item.discountPercentage
    ).toFixed(2);
    return item;
  });

  res.render("client/pages/products/products", {
    pageTitle: "Sản Phẩm",
    products: newProducts,
  });
};
