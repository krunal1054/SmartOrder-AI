const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const fs = require("fs");
const path = require("path");

const {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

router.get("/", getProducts);
router.get("/uploads-list", (req, res) => {
  const directoryPath = path.join(__dirname, "../uploads");

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Unable to scan folder" });
    }

    res.json(files);
  });
});
router.post("/", upload.single("image"), addProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", upload.single("image"), updateProduct);

module.exports = router;