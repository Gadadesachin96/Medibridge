import { useNavigate, NavLink } from "react-router-dom";
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
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const linkClass = ({ isActive }) =>
    `font-medium transition ${isActive ? "text-blue-600" : "text-slate-600 hover:text-blue-600"}`;

  return (
    <nav className="bg-white/95 backdrop-blur border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 text-left">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm">
            M
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 leading-none">
              Medi<span className="text-blue-600">Bridge</span>
            </h1>
            <p className="text-[11px] text-slate-500 mt-1">Healthcare Management</p>
          </div>
        </button>

        <div className="hidden md:flex items-center gap-7">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/pDoctor" className={linkClass}>Doctors</NavLink>
          <NavLink to="/my-appointments" className={linkClass}>Appointments</NavLink>
          <NavLink to="/about" className={linkClass}>About Us</NavLink>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden sm:block font-medium text-slate-700 capitalize">{user.name}</span>
              <button onClick={handleLogout} className="px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition font-medium">
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/login")} className="px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition font-medium">
                Login
              </button>
              <button onClick={() => navigate("/register")} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                Register
              </button>
            </>
          )}
        </div>
      </div>

      <div className="md:hidden px-6 pb-3 flex gap-5 overflow-x-auto text-sm">
        <NavLink to="/" className={linkClass}>Home</NavLink>
        <NavLink to="/pDoctor" className={linkClass}>Doctors</NavLink>
        <NavLink to="/my-appointments" className={linkClass}>Appointments</NavLink>
        <NavLink to="/about" className={linkClass}>About</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
