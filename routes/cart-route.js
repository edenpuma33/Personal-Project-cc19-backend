const express = require("express");
const {
  addToCart,
  getUserCart,
  updateCart,
  resetCart,
} = require("../controllers/cart-controller");
const { authUser } = require("../middleware/auth");

const cartRouter = express.Router();

cartRouter.get("/get", authUser, getUserCart);
cartRouter.post("/add", authUser, addToCart);
cartRouter.post("/update", authUser, updateCart);
cartRouter.post("/reset", authUser, resetCart);

module.exports = cartRouter;