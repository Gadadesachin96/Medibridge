import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import api from "../services/api";
import { logout } from "../redux/slices/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");

      // Redux clear
      dispatch(logout());

      // Login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };



  return (
    <div>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              M
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Medi<span className="text-blue-600">Bridge</span>
              </h1>
              <p className="text-xs text-gray-500">Healthcare Management</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="/"
              className="text-blue-600 font-medium hover:text-blue-700 transition"
            >
              Home
            </a>

            <a
              href="/admin/doctors"
              className="text-gray-600 font-medium hover:text-blue-600 transition"
            >
              Doctors
            </a>

            <a
              href="/appointments"
              className="text-gray-600 font-medium hover:text-blue-600 transition"
            >
              Appointments
            </a>

            <a
              href="/about"
              className="text-gray-600 font-medium hover:text-blue-600 transition"
            >
              About
            </a>
          </div>

          {/* Right Side */}
          {/* { !user && 

          <div className="flex items-center gap-3">
          <button  onClick={()=>navigate("/login")} className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition">
            Login
          </button>

          <button onClick={()=>navigate("/register")}  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Register
          </button>
        </div>
        } */}

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="font-medium text-gray-700 capitalize">{user.name}</span>

                {/* <span className="text-sm text-gray-500 capitalize">
                  ({user.role})
                </span> */}

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition"
                >
                  Login
                </button>

                <button
                  onClick={() => navigate("/register")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
