const connectDB = require("./config/db");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const roleMiddleware = require("./middleware/roleMiddleware");
const appointmentRoutes = require("./routes/appointmentRoutes");

dotenv.config();
console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
connectDB();
const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "MediBridge API is running",
  });
});

app.use(
  "/api/appointments",
  appointmentRoutes
);
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You can access this route",
    user: req.user,
  });
});

app.get(
  "/api/admin",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {
    res.json({
      message: "Welcome Admin",
    });
  }
);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});