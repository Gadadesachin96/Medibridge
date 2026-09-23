import { useEffect, useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, Clock3, LogOut, Stethoscope, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../services/api";
import { logout } from "../redux/slices/auth/authSlice";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState("");
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    try {
      const response = await api.get("/appointments/doctor");
      setAppointments(response.data.appointments || []);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAppointments(); }, []);

  const updateStatus = async (id, status) => {
    try {
      setUpdating(id);
      await api.patch(`/appointments/${id}/status`, { status });
      await fetchAppointments();
    } catch (error) {
      alert(error.response?.data?.message || "Could not update appointment");
    } finally {
      setUpdating("");
    }
  };

  const stats = useMemo(() => ({
    total: appointments.length,
    pending: appointments.filter((a) => a.status === "pending").length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
    completed: appointments.filter((a) => a.status === "completed").length,
  }), [appointments]);

  const handleLogout = async () => {
    try { await api.post("/auth/logout"); } catch (error) { console.error(error); }
    dispatch(logout());
    navigate("/login");
  };

  if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500">Loading doctor dashboard...</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">M</div><div><p className="font-bold text-slate-900">MediBridge</p><p className="text-xs text-slate-500">Doctor Portal</p></div></div>
          <div className="flex items-center gap-4"><span className="hidden sm:block text-sm text-slate-600">Dr. {user?.name || "Doctor"}</span><button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"><LogOut size={16} /> Logout</button></div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8"><p className="text-blue-600 font-semibold">Good to see you</p><h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-1">Doctor Dashboard</h1><p className="text-slate-500 mt-2">Review patient requests and manage appointment status.</p></div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[["Total", stats.total, CalendarDays, "text-slate-800"],["Pending", stats.pending, Clock3, "text-amber-600"],["Confirmed", stats.confirmed, CheckCircle2, "text-blue-600"],["Completed", stats.completed, CheckCircle2, "text-emerald-600"]].map(([label, value, Icon, color]) => (
            <div key={label} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"><Icon className={color} size={22}/><p className="text-sm text-slate-500 mt-4">{label}</p><p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p></div>
          ))}
        </div>

        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200"><h2 className="text-xl font-bold text-slate-900">Patient Appointments</h2><p className="text-sm text-slate-500 mt-1">Appointments booked with you will appear here.</p></div>
          {appointments.length === 0 ? <div className="p-12 text-center text-slate-500">No appointments found.</div> : <div className="divide-y divide-slate-100">
            {appointments.map((appointment) => <div key={appointment._id} className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-xl">👤</div><div><h3 className="font-bold text-slate-900">{appointment.patient?.name || "Patient"}</h3><p className="text-sm text-slate-500">{appointment.patient?.email || ""}</p><div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-600"><span className="flex items-center gap-1.5"><CalendarDays size={15}/>{new Date(appointment.date).toLocaleDateString()}</span><span className="flex items-center gap-1.5"><Clock3 size={15}/>{appointment.time}</span></div><p className="text-sm text-slate-600 mt-2"><strong>Reason:</strong> {appointment.reason}</p></div></div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-3 py-1.5 rounded-full text-sm font-semibold capitalize ${appointment.status === "confirmed" ? "bg-blue-50 text-blue-700" : appointment.status === "completed" ? "bg-emerald-50 text-emerald-700" : appointment.status === "rejected" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}`}>{appointment.status}</span>
                {appointment.status === "pending" && <><button disabled={updating === appointment._id} onClick={() => updateStatus(appointment._id, "confirmed")} className="px-3 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50">Confirm</button><button disabled={updating === appointment._id} onClick={() => updateStatus(appointment._id, "rejected")} className="px-3 py-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 disabled:opacity-50">Reject</button></>}
                {appointment.status === "confirmed" && <button disabled={updating === appointment._id} onClick={() => updateStatus(appointment._id, "completed")} className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50">Mark Completed</button>}
              </div>
            </div>)}
          </div>}
        </section>
      </main>
    </div>
  );
};

export default DoctorDashboard;
