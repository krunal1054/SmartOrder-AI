const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  customerName: String,
  email: String,
  productName: String,
  amount: Number,
  status: {
    type: String,
    default: "Success",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);