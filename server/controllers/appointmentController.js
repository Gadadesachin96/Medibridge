const Appointment = require("../models/Appointment");
// const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");



const createAppointment = async (req, res) => {
  try {
    const {
      doctor,
      date,
      time,
      reason,
    } = req.body;

    // Validate fields
    if (
      !doctor ||
      !date ||
      !time ||
      !reason
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check doctor exists
    const doctorExists = await Doctor.findById(doctor);

    if (!doctorExists) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    // Check doctor is active
    if (doctorExists.isActive === false) {
      return res.status(400).json({
        message: "Doctor is currently unavailable",
      });
    }

    // Check duplicate appointment
    const existingAppointment =
      await Appointment.findOne({
        doctor,
        date,
        time,
        status: {
          $in: ["pending", "confirmed"],
        },
      });

    if (existingAppointment) {
      return res.status(400).json({
        message:
          "This time slot is already booked",
      });
    }

    // Create appointment
    const appointment =
      await Appointment.create({
        patient: req.user.userId,
        doctor,
        date,
        time,
        reason,
      });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });

  } catch (error) {
    console.error(
      "Create appointment error:",
      error
    );

    res.status(500).json({
      message: "Failed to book appointment",
      error: error.message,
    });
  }
};


// ==============================
// PATIENT APPOINTMENTS
// ==============================

const getMyAppointments = async (req, res) => {
  try {

    const appointments =
      await Appointment.find({
        patient: req.user.userId,
      })
        .populate({
          path: "doctor",
          populate: {
            path: "user",
            select: "name email",
          },
        })
        .sort({ date: 1 });

    res.status(200).json({
      message: "Appointments fetched successfully",
      appointments,
    });

  } catch (error) {

    console.error(
      "Get patient appointments error:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch appointments",
      error: error.message,
    });
  }
};


// ==============================
// DOCTOR APPOINTMENTS
// ==============================

const getDoctorAppointments = async (req, res) => {
  try {

    // Find doctor profile belonging to logged-in user
    const doctor = await Doctor.findOne({
      user: req.user.userId,
    });

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor profile not found",
      });
    }

    const appointments =
      await Appointment.find({
        doctor: doctor._id,
      })
        .populate(
          "patient",
          "name email"
        )
        .sort({ date: 1 });

    res.status(200).json({
      message: "Doctor appointments fetched successfully",
      appointments,
    });

  } catch (error) {

    console.error(
      "Get doctor appointments error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to fetch doctor appointments",
      error: error.message,
    });
  }
};


// ==============================
// UPDATE APPOINTMENT STATUS
// ==============================

const updateAppointmentStatus = async (
  req,
  res
) => {
  try {

    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "confirmed",
      "rejected",
      "completed",
      "cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid appointment status",
      });
    }

    const appointment =
      await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    // Find logged-in doctor's profile
    const doctor = await Doctor.findOne({
      user: req.user.userId,
    });

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor profile not found",
      });
    }

    // Make sure appointment belongs to this doctor
    if (
      appointment.doctor.toString() !==
      doctor._id.toString()
    ) {
      return res.status(403).json({
        message:
          "You cannot update this appointment",
      });
    }

    appointment.status = status;

    await appointment.save();

    res.status(200).json({
      message:
        "Appointment status updated successfully",
      appointment,
    });

  } catch (error) {

    console.error(
      "Update appointment status error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to update appointment status",
      error: error.message,
    });
  }
};


module.exports = {
  createAppointment,
  getMyAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
};