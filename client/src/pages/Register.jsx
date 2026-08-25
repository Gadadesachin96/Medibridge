import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/register", formData);
      console.log("REGISTER RESPONSE:", response.data);

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              M
            </div>
          </div>

          <h1 className="text-3xl font-bold text-slate-800">Create Account</h1>

          <p className="text-slate-500 mt-2">
            Register yourself with MediBridge
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Full Name
            </label>

            <input
              type="text"
              onChange={handleChange}
              name="name"
              value={formData.name}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg 
              outline-none transition 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg 
              outline-none transition 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              placeholder="Create a password"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg 
              outline-none transition 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              name="cpassword"
              onChange={handleChange}
              value={formData.cpassword}
              placeholder="Confirm your password"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg 
              outline-none transition 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Register As
            </label>

            <select
              className="w-full px-4 py-3 border border-slate-300 rounded-lg 
              bg-white outline-none transition
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select role</option>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-3">
            <input type="checkbox" className="mt-1 w-4 h-4 accent-blue-600" />

            <p className="text-sm text-slate-500">
              I agree to the{" "}
              <span className="text-blue-600 cursor-pointer">
                Terms & Conditions
              </span>{" "}
              and{" "}
              <span className="text-blue-600 cursor-pointer">
                Privacy Policy
              </span>
            </p>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 
            text-white font-semibold py-3 rounded-lg 
            transition duration-200 shadow-md hover:shadow-lg"
          >
            Create Account
          </button>
        </form>

        {/* Login */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
