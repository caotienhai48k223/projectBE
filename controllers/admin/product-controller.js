const Product = require("../../models/product-model");

const filterStatusHelper = require("../../helpers/filter-status");

const searchHelper = require("../../helpers/search");

const paginationHelper = require("../../helpers/pagination");

const systemConfig = require("../../config/system")

// [GET] /admin/products
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
    .sort({ position: "desc" })
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

// [GET] /admin/products/deleted
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

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/products/create", {
    pageTitle: "Thêm Mới Sản Phẩm",
  });
};

// [POST] /admin/product/create
module.exports.createItem = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.stock = parseInt(req.body.stock);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  if (req.body.position == "") {
    const countProduct = await Product.countDocuments();
    req.body.position = countProduct + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  req.body.thumbnail = `/uploads/${req.file.filename}`
  const productNew = new Product(req.body);
  await productNew.save();
  res.redirect(`${systemConfig.prefixAdmin}/products`);
};

// [PATCH] /admin/products/change-status/:availabilityStatus/:id
module.exports.changeStatus = async (req, res) => {
  const availabilityStatus = req.params.availabilityStatus;
  const id = req.params.id;
  await Product.updateOne(
    { _id: id },
    { availabilityStatus: availabilityStatus }
  );
  req.flash("success", "Update Product Success!");

  res.redirect("back");
};

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");

  switch (type) {
    case "In Stock":
      await Product.updateMany(
        { _id: { $in: ids } },
        { availabilityStatus: "In Stock" }
      );
      req.flash("success", `Update ${ids.length} Products Success!`);
      break;
    case "Low Stock":
      await Product.updateMany(
        { _id: { $in: ids } },
        { availabilityStatus: "Low Stock" }
      );
      req.flash("success", `Update ${ids.length} Products Success!`);
      break;
    case "delete-all":
      await Product.updateMany(
        { _id: { $in: ids } },
        {
          deleted: true,
          deleteDate: new Date(),
        }
      );
      req.flash("success", `Delete ${ids.length} Products Success!`);
      break;
    case "restore-all":
      await Product.updateMany(
        { _id: { $in: ids } },
        {
          deleted: false,
          restoreDate: new Date(),
        }
      );
      req.flash("success", `Restore ${ids.length} Products Success!`);
      break;
    case "change-position":
      for (const item of ids) {
        let [position, id] = item.split("-");
        position = parseInt(position);
        await Product.updateOne({ _id: id }, { position: position });
      }
      req.flash("success", `Change Position ${ids.length} Products Success!`);
      break;
    default:
      break;
  }
  res.redirect("back");
};

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;
  await Product.updateOne(
    { _id: id },
    { deleted: true, deleteDate: new Date() }
  );
  req.flash("success", `Delete Product Success!`);
  res.redirect("back");
};

// [PATCH] /admin/products/deleted/restore/:id
module.exports.restoreItem = async (req, res) => {
  const id = req.params.id;
  await Product.updateOne(
    { _id: id },
    { deleted: false, restoreDate: new Date() }
  );
  req.flash("success", `Restore Product Success!`);
  res.redirect("back");
};

// [DELETE] /admin/products/deleted/delete-permanent/:id
module.exports.deletePermanentItem = async (req, res) => {
  const id = req.params.id;
  await Product.deleteOne({ _id: id });
  req.flash("success", `Permanently Delete Product Success!`);
  res.redirect("back");
};
