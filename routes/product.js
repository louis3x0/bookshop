const express = require("express");
const router = express.Router();

const {
  create,
  read,
  update,
  productById,
  remove,
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

router.param("userId", userById);
router.param("productId", userById);

module.exports = router;
