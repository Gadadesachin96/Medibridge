const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Patient = require("../models/Patient");

// const register = async (req, res) => {
//   try {
//     const {
//       name,
//       email,
//       password,
//       photo,
//       phone,
//       dateOfBirth,
//       gender,
//       address,
//     } = req.body;

//     if (!name || !email || !password || !phone) {
//       return res.status(400).json({
//         message: "Name, email, password and phone are required",
//       });
//     }

//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return res.status(400).json({
//         message: "User already exists",
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create User
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       photo,
//       role: "patient",
//     });

//     // Create Patient profile
//     const patient = await Patient.create({
//       user: user._id,
//       phone,
//       dateOfBirth,
//       gender,
//       address,
//     });

//     res.status(201).json({
//       message: "Patient registered successfully",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         photo: user.photo,
//       },
//       patient,
//     });

//   } catch (error) {
//     res.status(500).json({
//       message: "Registration failed",
//       error: error.message,
//     });
//   }
// };



const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Only registration-required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "patient",
    });

    res.status(201).json({
      message: "Patient registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};


const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({
      message: "Logout failed",
    });
  }
};

module.exports = {
  register,
  login,
  logout,
};