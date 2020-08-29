const express = require("express");
const router = express.Router();

const { create } = require("../controllers/category");

// Middlewares
const { userById } = require("../controllers/user");
const { requireSignin, isAdmin, isAuth } = require("../controllers/auth");

router.post(
  "/categorry/create/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  create
);

router.param("userId", userById);

module.exports = router;
