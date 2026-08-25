const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Doctor = require("../models/Doctor");

// const createDoctor = async (req, res) => {
//   try {
//     console.log("CREATE DOCTOR BODY:", req.body);

//     const {
//       name,
//       email,
//       password,
//       specialization,
//       qualification,
//       experience,
//       fees,
//       availableDays,
//       availableTime,
//     } = req.body;

//     // 1. Check required fields
//     if (
//       !name ||
//       !email ||
//       !password ||
//       !specialization ||
//       !qualification ||
//       !availableDays ||
//       !availableTime ||
//       experience === undefined ||
//       fees === undefined
//     ) {
//       return res.status(400).json({
//         message: "All fields are required",
//       });
//     }

//     // 2. Check whether user already exists
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return res.status(400).json({
//         message: "User with this email already exists",
//       });
//     }

//     // 3. Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // 4. Create User account
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role: "doctor",
//     });

//     // 5. Create Doctor profile
//     const doctor = await Doctor.create({
//       user: user._id,
//       specialization,
//       qualification,
//       experience,
//       fees,
//     });

//     // 6. Response
//     res.status(201).json({
//       message: "Doctor created successfully",
//       doctor,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to create doctor",
//       error: error.message,
//     });
//   }
// };


const createDoctor = async (req, res) => {
  try {
    console.log("CREATE DOCTOR BODY:", req.body);

    const {
      name,
      email,
      password,
      specialization,
      qualification,
      experience,
      fees,
      availableDays,
      availableTime,
    } = req.body;

    // Check required fields
    if (
      !name ||
      !email ||
      !password ||
      !specialization ||
      !qualification ||
      !availableDays ||
      !availableTime ||
      experience === undefined ||
      fees === undefined
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "doctor",
    });

    // Create Doctor profile
    const doctor = await Doctor.create({
      user: user._id,
      specialization,
      qualification,
      experience,
      fees,
      availableDays,
      availableTime,
    });

    res.status(201).json({
      message: "Doctor created successfully",
      doctor,
    });

  } catch (error) {
    console.error("Create doctor error:", error);

    res.status(500).json({
      message: "Failed to create doctor",
      error: error.message,
    });
  }
};
const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("user", "name email photo");

    res.status(200).json({
      message: "Doctors fetched successfully",
      doctors,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch doctors",
      error: error.message,
    });
  }
};


const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      specialization,
      qualification,
      experience,
      phone,
      fees,
      availableDays,
      availableTime,
    } = req.body;

    const doctor = await User.findOne({
      _id: id,
      role: "doctor",
    });

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    doctor.name = name;
    doctor.email = email;
    doctor.specialization = specialization;
    doctor.qualification = qualification;
    doctor.experience = experience;
    doctor.phone = phone;
    doctor.fees = fees;
    doctor.availableDays = availableDays;
    doctor.availableTime = availableTime;

    await doctor.save();

    res.status(200).json({
      message: "Doctor updated successfully",
      doctor: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        role: doctor.role,
        specialization: doctor.specialization,
        qualification: doctor.qualification,
        experience: doctor.experience,
        phone: doctor.phone,
        fees: doctor.fees,
        availableDays: doctor.availableDays,
        availableTime: doctor.availableTime,
        isActive: doctor.isActive,
      },
    });
  } catch (error) {
    console.error("Update doctor error:", error);

    res.status(500).json({
      message: "Failed to update doctor",
      error: error.message,
    });
  }
};

const toggleDoctorStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const doctor = await User.findOne({
      _id: id,
      role: "doctor",
    });

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    doctor.isActive = !doctor.isActive;

    await doctor.save();

    res.status(200).json({
      message: doctor.isActive
        ? "Doctor activated successfully"
        : "Doctor deactivated successfully",

      isActive: doctor.isActive,
    });
  } catch (error) {
    console.error("Toggle doctor status error:", error);

    res.status(500).json({
      message: "Failed to update doctor status",
      error: error.message,
    });
  }
};

module.exports = {
  createDoctor,
  getDoctors,
  updateDoctor,
  toggleDoctorStatus,
};
