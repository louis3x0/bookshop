const express = require("express");
const router = express.Router();

const {
  create,
  update,
  remove,
  categoryById,
  read,
  getAll,
} = require("../controllers/category");

// Middlewares
const { userById } = require("../controllers/user");
const { requireSignin, isAdmin, isAuth } = require("../controllers/auth");

// CRUD

router.get("/categories", getAll);
router.get("/category/:categoryId", read);
router.put(
  "/category/:categoryId/:userId",
  requireSignin,
  isAdmin,
  isAuth,
  update
);

router.delete(
  "/category/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);

router.post(
  "/categorry/create/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  create
);

router.param("userId", userById);
router.param("categoryId", categoryId);

module.exports = router;
