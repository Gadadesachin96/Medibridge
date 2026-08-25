import { Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white min-h-screen">

        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold">
            MediBridge
          </h1>

          <p className="text-sm text-slate-400 mt-1">
            Admin Panel
          </p>
        </div>

        <nav className="p-4 space-y-2">

          <button
            onClick={() => navigate("/admin")}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-800"
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/admin/doctors")}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-800"
          >
            Doctors
          </button>

          <button
            onClick={() => navigate("/admin/patients")}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-800"
          >
            Patients
          </button>

          <button
            onClick={() => navigate("/admin/appointments")}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-800"
          >
            Appointments
          </button>

        </nav>

      </aside>

      {/* Main Content */}
      <main className="flex-1">

        <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
          <h2 className="font-semibold text-gray-700">
            Admin Dashboard
          </h2>

          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </header>

        <Outlet />

      </main>

    </div>
  );
};

export default AdminLayout;