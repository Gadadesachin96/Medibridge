import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Stethoscope, Clock3, BriefcaseMedical, IndianRupee } from "lucide-react";
import api from "../services/api";

const Pdoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get("/doctors");
        setDoctors(response.data.doctors || []);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const specializations = useMemo(
    () => [...new Set(doctors.map((doctor) => doctor.specialization).filter(Boolean))],
    [doctors]
  );

  const filteredDoctors = doctors
    .filter((doctor) => doctor.isActive !== false)
    .filter((doctor) => specialization === "all" || doctor.specialization === specialization)
    .filter((doctor) => {
      const query = search.toLowerCase().trim();
      if (!query) return true;
      return `${doctor.user?.name || ""} ${doctor.specialization || ""} ${doctor.qualification || ""}`
        .toLowerCase()
        .includes(query);
    });

  if (loading) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500">Loading doctors...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <p className="text-blue-100 font-semibold flex items-center gap-2"><Stethoscope size={18} /> MediBridge Care Network</p>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">Find a doctor you can trust</h1>
          <p className="text-blue-100 mt-2 max-w-2xl">Browse doctors added by the MediBridge admin team and book an appointment that fits your schedule.</p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-5 flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search doctor, specialization or qualification" className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <select value={specialization} onChange={(e) => setSpecialization(e.target.value)} className="px-4 py-3 rounded-xl border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-blue-500">
            <option value="all">All Specializations</option>
            {specializations.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>

        {filteredDoctors.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
            <Stethoscope className="mx-auto text-slate-300" size={44} />
            <h2 className="text-xl font-semibold text-slate-800 mt-4">No doctors found</h2>
            <p className="text-slate-500 mt-2">Add a doctor from the admin dashboard or change your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <article key={doctor._id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-blue-600 to-cyan-500" />
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center text-3xl shrink-0">👨‍⚕️</div>
                    <div className="min-w-0">
                      <h2 className="text-xl font-bold text-slate-900 truncate">Dr. {doctor.user?.name || "Doctor"}</h2>
                      <p className="text-blue-600 font-semibold mt-1">{doctor.specialization || "General Physician"}</p>
                      <p className="text-sm text-slate-500 mt-1">{doctor.qualification || "Medical Professional"}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <div className="rounded-xl bg-slate-50 p-3"><div className="flex items-center gap-2 text-slate-500 text-xs"><BriefcaseMedical size={15} /> Experience</div><p className="font-semibold mt-1">{doctor.experience || 0} years</p></div>
                    <div className="rounded-xl bg-slate-50 p-3"><div className="flex items-center gap-2 text-slate-500 text-xs"><IndianRupee size={15} /> Consultation</div><p className="font-semibold mt-1">₹{doctor.fees || 0}</p></div>
                  </div>

                  <div className="mt-4 flex items-start gap-2 text-sm text-slate-600">
                    <Clock3 size={17} className="text-blue-600 mt-0.5 shrink-0" />
                    <div><p className="font-medium text-slate-700">Available</p><p>{doctor.availableDays?.length ? doctor.availableDays.join(" • ") : "By appointment"}</p>{doctor.availableTime && <p className="text-slate-500">{doctor.availableTime}</p>}</div>
                  </div>

                  <button onClick={() => navigate(`/book-appointment/${doctor._id}`)} className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">Book Appointment</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Pdoctor;
