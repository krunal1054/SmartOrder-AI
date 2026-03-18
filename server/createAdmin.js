const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URI)
.then(async () => {

  console.log("MongoDB Connected");

  // ⚠️ delete old admin if exists
  await Admin.deleteMany({});

  const hashedPassword = await bcrypt.hash("123456", 10);

  const admin = new Admin({
    email: "admin@smartorder.com",
    password: hashedPassword,
  });

  await admin.save();

  console.log("✅ Fresh Admin Created");
  console.log("Email: admin@smartorder.com");
  console.log("Password: 123456");

  process.exit();
})
.catch(err => console.log(err));