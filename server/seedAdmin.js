const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const User = require("./models/User");

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    const existingAdmin = await User.findOne({
      email: "admin@medibridge.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    const admin = await User.create({
      name: "MediBridge Admin",
      email: "admin@medibridge.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully");
    console.log(admin);

    process.exit();
  } catch (error) {
    console.error("Admin seeding failed:", error.message);
    process.exit(1);
  }
};

seedAdmin();