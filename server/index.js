const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ PRODUCT ROUTES ADD KARO
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);
app.use("/uploads", express.static("uploads"));
// Existing
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
// MongoDB Connection


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
