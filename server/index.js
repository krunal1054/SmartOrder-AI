const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ================= ROUTES =================

// Products
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

// Uploads
app.use("/uploads", express.static("uploads"));

// Existing Routes
const behaviorRoutes = require("./routes/behaviorRoutes");
app.use("/api/behavior", behaviorRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);

const paymentRoutes = require("./routes/paymentRoutes");
app.use("/api/payments", paymentRoutes);

const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);

const contactRoutes = require("./routes/contactRoutes");
app.use("/api/contacts", contactRoutes);

// ================= TEST ROUTES =================

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "API Working" });
});

// ================= MONGODB =================

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 30000,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ Mongo Error:", err.message);
  });

// ================= SERVER =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
