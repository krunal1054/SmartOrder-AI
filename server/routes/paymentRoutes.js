const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");

// GET all payments
router.get("/", async (req, res) => {
  const payments = await Payment.find().sort({ createdAt: -1 });
  res.json(payments);
});

// POST new payment
router.post("/", async (req, res) => {
  const payment = new Payment(req.body);
  await payment.save();
  res.json({ message: "Payment saved successfully" });
});

module.exports = router;