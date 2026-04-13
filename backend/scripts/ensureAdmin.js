const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/User');

dotenv.config({ path: path.join(__dirname, '../.env') });

async function createAdmin() {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) throw new Error("MONGO_URI not found");

    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB...");

    const email = "admin@muhurtayatra.com";
    const password = "admin123";

    let admin = await User.findOne({ email });
    if (admin) {
      console.log("Admin user already exists:", email);
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      admin = new User({
        name: "Muhurta Admin",
        email,
        password: hashedPassword,
        role: "admin"
      });
      await admin.save();
      console.log("✅ Admin user created successfully!");
      console.log("Email:", email);
      console.log("Password:", password);
    }
    process.exit(0);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
}

createAdmin();
