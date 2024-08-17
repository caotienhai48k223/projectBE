const Product = require("../../models/product-model");

const filterStatusHelper = require("../../helpers/filter-status");

const searchHelper = require("../../helpers/search");

const paginationHelper = require("../../helpers/pagination");

module.exports.products = async (req, res) => {
  const filterStatus = filterStatusHelper(req.query);

  const find = {
    deleted: false,
  };

  if (req.query.availabilityStatus) {
    find.availabilityStatus = req.query.availabilityStatus;
  }

  const objectSearch = searchHelper(req.query);

  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }

  const countProduct = await Product.countDocuments(find);

  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 4,
    },
    req.query,
    countProduct
  );

  const products = await Product.find(find)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);

  res.render("admin/pages/products/products", {
    pageTitle: "Quản Lý Sản Phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
};

module.exports.changeStatus = async (req, res) => {
  const availabilityStatus = req.params.availabilityStatus;
  const id = req.params.id;
  await Product.updateOne(
    { _id: id },
    { availabilityStatus: availabilityStatus }
  );
  res.redirect("back");
};

module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");

  switch (type) {
    case "In Stock":
      await Product.updateMany(
        { _id: { $in: ids } },
        { availabilityStatus: "In Stock" }
      );
      break;
    case "Low Stock":
      await Product.updateMany(
        { _id: { $in: ids } },
        { availabilityStatus: "Low Stock" }
      );
      break;
    default:
      break;
  }
  res.redirect("back");
};

module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;
  await Product.updateOne(
    { _id: id },
    { deleted: true, deleteDate: new Date() }
  );
  res.redirect("back");
};

module.exports.restoreItem = async (req, res) => {
  const id = req.params.id;
  await Product.updateOne(
    { _id: id },
    { deleted: false, restoreDate: new Date() }
  );
  res.redirect("back");
};

module.exports.recyclebins = async (req, res) => {
  const filterStatus = filterStatusHelper(req.query);

  const find = {
    deleted: true,
  };

  if (req.query.availabilityStatus) {
    find.availabilityStatus = req.query.availabilityStatus;
  }

  const objectSearch = searchHelper(req.query);

  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }

  const countProduct = await Product.countDocuments(find);

  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 4,
    },
    req.query,
    countProduct
  );

  const products = await Product.find(find)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);

  res.render("admin/pages/products/recycle-bins", {
    pageTitle: "Thùng Rác",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
};

module.exports.deletePermanentItem = async (req, res) => {
  const id = req.params.id;
  await Product.deleteOne({ _id: id });
  res.redirect("back");
};
