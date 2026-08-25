const express = require("express");

const {
  createAppointment,
  getMyAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
} = require("../controllers/appointmentController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();


// Patient books appointment
router.post(
  "/",
  authMiddleware,
  roleMiddleware("patient"),
  createAppointment
);


// Patient sees own appointments
router.get(
  "/my",
  authMiddleware,
  roleMiddleware("patient"),
  getMyAppointments
);


// Doctor sees own appointments
router.get(
  "/doctor",
  authMiddleware,
  roleMiddleware("doctor"),
  getDoctorAppointments
);


// Doctor updates appointment status
router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware("doctor"),
  updateAppointmentStatus
);


module.exports = router;