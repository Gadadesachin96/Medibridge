const express = require("express");

const {
  createDoctor,
  getDoctors,
  updateDoctor,
  toggleDoctorStatus,
} = require("../controllers/doctorController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  getDoctors
);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createDoctor
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateDoctor
);

router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware("admin"),
  toggleDoctorStatus
);

module.exports = router;