/*const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  color: String,
  style: String,
  image: String,
});

module.exports = mongoose.model("Product", productSchema);*/

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  color: String,
    style: String,
  image: String,
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);