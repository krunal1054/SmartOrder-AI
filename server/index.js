
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= ROUTES =================

// Products
app.use("/api/products", require("./routes/productRoutes"));

// Uploads
app.use("/uploads", express.static("uploads"));

// Other Routes
app.use("/api/behavior", require("./routes/behaviorRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/contacts", require("./routes/contactRoutes"));

// ================= TEST ROUTES =================

app.get("/", (req, res) => {
  res.send("✅ Backend Running");
});

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API Working",
  });
});

// ================= MONGODB =================

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    console.log("⏳ Connecting MongoDB...");

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
    });

    console.log("✅ MongoDB Connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.log("❌ MongoDB Connection Failed");
    console.log(error.message);

    process.exit(1);
  }
};

connectDB();
