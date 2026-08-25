import React from "react";
import {
  LayoutDashboard,
  Stethoscope,
  CalendarDays,
  Users,
  LogOut,
  Hospital,
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white shadow-xl">
      
      {/* Logo */}
      <div className="flex h-20 items-center gap-3 border-b border-slate-700 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
          <Hospital size={24} />
        </div>

        <div>
          <h2 className="text-xl font-bold">MediBridge</h2>
          <p className="text-xs text-slate-400">Admin Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-3">

        {/* Dashboard */}
        <Link
          to="/admin/dashboard"
          className="mb-2 flex items-center gap-3 rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium shadow-md"
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>

        {/* Doctors */}
        <Link
          to="/admin/doctors"
          className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
        >
          <Stethoscope size={20} />
          <span>Doctors</span>
        </Link>

        {/* Appointments */}
        <Link
          to="/admin/appointment"
          className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
        >
          <CalendarDays size={20} />
          <span>Appointments</span>
        </Link>

        {/* Patients */}
        <Link
          to="/admin/patient"
          className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
        >
          <Users size={20} />
          <span>Patients</span>
        </Link>

      </nav>

      {/* Bottom Logout */}
      <div className="absolute bottom-0 w-full border-t border-slate-700 p-4">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

    </aside>
  );
};

export default AdminSidebar;