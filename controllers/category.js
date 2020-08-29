const Category = require("../models/Category");
const { errorHandler } = require("../helpers/dbErrorHandler");
const lodash = require("lodash");

exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category)
      return res.status(400).json({ error: "The category does not exist" });
    req.category = category;
    next();
  });
};

exports.getAll = (req, res) => {
  Category.find().exec((err, data) => {
    if (err) return res.status(400).json({ error: errorHandler(err) });
    res.json(data);
  });
};

exports.read = (req, res) => {
  return res.json(res.category);
};

exports.remove = (req, res) => {
  let category = req.category;
  category.remove((err, deletedCategory) => {
    if (err || !category)
      return res.status(400).json({ error: "The category does not exist" });
    res.json({
      message: "Category deleted successfuly",
    });
  });
};

exports.update = (req, res) => {
  const updatedFields = req.body;
  const updatedCategory = lodash.extend(req.category, updatedFields);
  updatedCategory.save((err, data) => {
    if (err) return res.status(400).json({ error: errorHandler(err) });
    res.json({ data });
  });
};

exports.create = (req, res) => {
  const category = new Category(req.body);
  category.save((err, data) => {
    if (err) return res.status(400).json({ error: errorHandler(err) });
    res.json({ data });
  });
};
