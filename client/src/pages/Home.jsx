import { useNavigate } from "react-router-dom";
import { ArrowRight, CalendarCheck, Search, ShieldCheck, Stethoscope } from "lucide-react";
import heroImage from "../assets/hero.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50 text-slate-800">
      <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
              <Stethoscope size={16} /> Healthcare made simple
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mt-5 text-slate-900">
              Find the right doctor and book your care with confidence.
            </h1>
            <p className="text-lg text-slate-600 mt-5 max-w-xl">
              MediBridge makes it easy to discover doctors, check their availability,
              and manage your appointments from one simple platform.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={() => navigate("/pDoctor")}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-sm"
              >
                Find a Doctor <ArrowRight size={18} />
              </button>
              <button
                onClick={() => navigate("/my-appointments")}
                className="px-6 py-3 rounded-xl font-semibold border border-slate-300 bg-white hover:bg-slate-100 transition"
              >
                My Appointments
              </button>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="bg-white rounded-3xl shadow-xl p-5 border border-blue-100 max-w-md w-full">
              <img src={heroImage} alt="MediBridge healthcare" className="w-full h-72 object-contain" />
              <div className="grid grid-cols-3 gap-3 mt-3">
                <div className="bg-blue-50 rounded-xl p-3 text-center">
                  <Search className="mx-auto text-blue-600" size={22} />
                  <p className="text-xs font-semibold mt-2">Find Doctors</p>
                </div>
                <div className="bg-cyan-50 rounded-xl p-3 text-center">
                  <CalendarCheck className="mx-auto text-cyan-600" size={22} />
                  <p className="text-xs font-semibold mt-2">Book Easily</p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-3 text-center">
                  <ShieldCheck className="mx-auto text-emerald-600" size={22} />
                  <p className="text-xs font-semibold mt-2">Manage Care</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-blue-600 font-semibold">Why MediBridge?</p>
          <h2 className="text-3xl font-bold text-slate-900 mt-2">A simpler way to manage healthcare</h2>
          <p className="text-slate-600 mt-3">
            Everything you need to discover a doctor and keep track of your appointments.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {[
            ["Easy Doctor Discovery", "Browse doctors by specialization, experience and consultation fees."],
            ["Convenient Booking", "Choose an available date and time and request an appointment in a few clicks."],
            ["Appointment Tracking", "Keep your upcoming and past appointments organized in one place."],
          ].map(([title, text]) => (
            <div key={title} className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">✓</div>
              <h3 className="text-xl font-bold text-slate-900 mt-5">{title}</h3>
              <p className="text-slate-600 mt-3 leading-7">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <h2 className="text-3xl font-bold">Ready to find your doctor?</h2>
            <p className="text-blue-100 mt-2">Explore available doctors and book your next appointment.</p>
          </div>
          <button
            onClick={() => navigate("/pDoctor")}
            className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition"
          >
            Explore Doctors
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
