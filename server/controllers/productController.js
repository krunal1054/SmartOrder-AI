const Product = require("../models/Product");

// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// ADD PRODUCT WITH IMAGE
exports.addProduct = async (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    price: req.body.price,
    color: req.body.color,
    image: req.file ? `/uploads/${req.file.filename}` : "",
  });

  await newProduct.save();
  res.json(newProduct);
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted Successfully" });
};

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  const updatedData = {
    name: req.body.name,
    price: req.body.price,
    color: req.body.color,
  };

  if (req.file) {
    updatedData.image = `/uploads/${req.file.filename}`;
  }

  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    updatedData,
    { new: true }
  );

  res.json(updated);
};