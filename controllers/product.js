const formidable = require("formidable");
const lodash = require("lodash");
const fs = require("fs");
const Product = require("../models/Product");
const { errorHandler } = require("../helpers/dbErrorHandler");
const { parse } = require("path");

exports.productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product)
      return res.status(400).json({ error: "The product does not exist" });
    req.product = product;
    next();
  });
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.read = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.remove = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err || !product)
      return res.status(400).json({ error: "The product does not exist" });
    res.json({
      message: "Product deleted successfully",
    });
  });
};

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  //Parses an incoming node.js request containing form data
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }

    let product = req.product;
    //using Lodash to deep clone the object
    product = lodash.extend(product, fields);

    // 1kb = 1000
    // 1mb = 1000000

    if (files.photo) {
      console.log("FILES PHOTO: ", files.photo);
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1 MB in size",
        });
      }
      //read the photo file and save into database
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    let product = new Product(fields);

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1 MB in size",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, product) => {
      if (err)
        return res.status(400).json({ error: "The product does not exist" });
      res.send(product);
    });
};

exports.listRelated = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  Product.find({_id: {$ne: req.product}m category: req.product.category})
    .limit(limit)
    .populate('category', '_id')
    .exec((err,product) => {
      if(err)
      return res.status(400).json({error: 'The product does not exist'});
      res.json(products)
    })
};

exports.listCategories = (req,res) => {
  Product.distinct('category', {}, (err,categories) => {
    if(err) return res.status(400).json({error: 'Categories were not found'})
    res.json(categories)
  })
}

exports.listBySearch = (req,res) => {
  let order = req.body.order ? req.body.order : 'desc';
  let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {}
  
  for(let key in req.body.filters) {
    if(req.body.filters[key].length > 0){
      if(key === 'prices'){
        findArgs[key] ={
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        }
      }
    }

    Product.find(findArgs)
      .select('-photo')
      .populate('category')
      .sort([[sortBy,order]])
      .skip(skip)
      .limit(limit)
      .exec((err,data) => {
        if(err) {
          return res.status(400).json({
            error: 'Products not found'
          })
        }
        res.json({
          size: data.length,
          data
        })
      })
  }
}