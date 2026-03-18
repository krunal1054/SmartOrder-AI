const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// GET Orders
router.get("/", async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

// POST Order
router.post("/", async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.json({ message: "Order Saved" });
});

module.exports = router;