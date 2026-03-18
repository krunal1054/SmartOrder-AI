const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: String,
  customerName: String,
  email: String,
  products: [String],
  totalAmount: Number,
  paymentMethod: String,
  status: {
    type: String,
    default: "Processing",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);