import { useEffect, useState } from "react";
import { CalendarDays, Clock3, Stethoscope } from "lucide-react";
import api from "../services/api";

const statusClass = {
  confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
  completed: "bg-blue-50 text-blue-700 border-blue-200",
  cancelled: "bg-slate-100 text-slate-600 border-slate-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
};

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get("/appointments/my");
        setAppointments(response.data.appointments || []);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500">Loading appointments...</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-11">
          <p className="text-blue-100 font-semibold">MediBridge Patient Portal</p>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">My Appointments</h1>
          <p className="text-blue-100 mt-2">Keep track of your upcoming consultations and appointment status.</p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {appointments.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
            <CalendarDays className="mx-auto text-slate-300" size={48} />
            <h2 className="text-xl font-bold text-slate-800 mt-4">No appointments yet</h2>
            <p className="text-slate-500 mt-2">Book a doctor from the Doctors page and your appointment will appear here.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {appointments.map((appointment) => (
              <article key={appointment._id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-2xl">👨‍⚕️</div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Dr. {appointment.doctor?.user?.name || "Doctor"}</h2>
                      <p className="text-blue-600 font-medium">{appointment.doctor?.specialization || "Healthcare Professional"}</p>
                      <p className="text-slate-500 text-sm mt-2 flex items-center gap-2"><CalendarDays size={15} /> {new Date(appointment.date).toLocaleDateString()}</p>
                      <p className="text-slate-500 text-sm mt-1 flex items-center gap-2"><Clock3 size={15} /> {appointment.time}</p>
                    </div>
                  </div>
                  <span className={`self-start px-3 py-1.5 rounded-full border text-sm font-semibold capitalize ${statusClass[appointment.status] || statusClass.pending}`}>{appointment.status}</span>
                </div>
                <div className="mt-5 pt-5 border-t border-slate-100 flex gap-2 text-sm text-slate-600">
                  <Stethoscope size={17} className="text-blue-600" />
                  <span><strong className="text-slate-700">Reason:</strong> {appointment.reason}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyAppointments;
