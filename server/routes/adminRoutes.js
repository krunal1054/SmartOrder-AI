const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");
const { loginAdmin } = require("../controllers/adminController");
const verifyAdmin = require("../middleware/verifyAdmin");
const adminAnalytics = require("../controllers/adminAnalyticsController");
const { getAllAdmins } = require("../controllers/adminController");

// ================= DASHBOARD =================
router.get("/dashboard", verifyAdmin, (req, res) => {
  res.json({ message: "Secure Admin Data" });
});

router.get("/stats", adminAnalytics.getDashboardStats);
router.get("/users", verifyAdmin, getAllAdmins);

// ================= LOGIN =================
router.post("/login", loginAdmin);

// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check existing user
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    // Create token
    const token = jwt.sign(
      { id: newAdmin._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      token,
      user: {
        name: newAdmin.name,
        email: newAdmin.email,
      },
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;