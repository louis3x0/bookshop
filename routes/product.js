const express = require("express");
const router = express.Router();

const {
  create,
  read,
  update,
  productById,
  remove,
  list,
  listRelated,
  listCategories,
  listBySearch,
  photo,
} = require("../controllers/product");

// Middlewares
const { userById } = require("../controllers/user");
const { requireSignin, isAdmin, isAuth } = require("../controllers/auth");

// CRUD
router.get("/product/:productId", read);
router.put(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  update
);

router.delete(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);

router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);

// Custom GET routes
router.get("/products", list);
router.get("/products/related/:productId", listRelated);
router.get("/products/categories", listCategories);
router.get("/product/photo/:productId", photo);
router.post("/products/by/search", listBySearch);

router.param("userId", userById);
router.param("productId", userById);

module.exports = router;
