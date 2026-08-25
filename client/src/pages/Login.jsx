import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import api from "../services/api";
import { setUser } from "../redux/slices/auth/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", loginData);

      console.log("LOGIN RESPONSE:", response.data);

      const user = response.data.user;

      // Redux me user save
      dispatch(setUser(user));
      // alert("Login successful");
      // navigate("/admin/dashboard");
      // navigate("/admin/dashboard");navigate

      // Role based navigation
    if (user.role === "admin") {
      navigate("/admin/dashboard");
    } else if (user.role === "doctor") {
      navigate("/");
    } else if (user.role === "patient") {
      navigate("/pDoctor");
    } else {
      navigate("/");  
    }
    } catch (error) {
      console.log("LOGIN ERROR:", error.response?.data);

      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-2xl">🏥</span>
          </div>

          <h1 className="text-3xl font-bold text-slate-800">Welcome Back</h1>

          <p className="text-slate-500 mt-2">
            Login to your MediBridge account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={loginData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              placeholder="Enter your password"
              value={loginData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>

        {/* Register */}
        <div className="text-center mt-6 pt-6 border-t border-slate-200">
          <p className="text-sm text-slate-500">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-blue-600 font-semibold hover:text-blue-700 hover:underline transition"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
