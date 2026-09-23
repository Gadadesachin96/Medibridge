import { HeartPulse, ShieldCheck, Users, Target } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <p className="text-blue-100 font-semibold">ABOUT MEDIBRIDGE</p>
          <h1 className="text-4xl md:text-5xl font-bold mt-3">Connecting patients with better healthcare access.</h1>
          <p className="max-w-2xl mx-auto mt-5 text-blue-50 text-lg leading-8">
            MediBridge is a healthcare appointment platform designed to make discovering doctors
            and managing appointments simple, clear and convenient.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <Target className="text-blue-600" size={34} />
            <h2 className="text-2xl font-bold text-slate-900 mt-5">Our Mission</h2>
            <p className="text-slate-600 leading-7 mt-3">
              Our goal is to reduce the friction between patients and healthcare services by
              bringing doctor discovery and appointment management into one easy-to-use experience.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <HeartPulse className="text-cyan-600" size={34} />
            <h2 className="text-2xl font-bold text-slate-900 mt-5">What MediBridge Offers</h2>
            <p className="text-slate-600 leading-7 mt-3">
              Patients can explore doctor profiles, view availability, request appointments and
              keep track of their scheduled consultations from a single platform.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm">
            <Users className="text-blue-600" size={28} />
            <h3 className="font-bold text-xl mt-4">Patient Focused</h3>
            <p className="text-slate-600 mt-2 leading-6">A clean experience built around finding and managing care.</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm">
            <ShieldCheck className="text-emerald-600" size={28} />
            <h3 className="font-bold text-xl mt-4">Secure Access</h3>
            <p className="text-slate-600 mt-2 leading-6">Authentication and role-based access help protect application features.</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm">
            <HeartPulse className="text-rose-500" size={28} />
            <h3 className="font-bold text-xl mt-4">Better Organization</h3>
            <p className="text-slate-600 mt-2 leading-6">Keep doctor information and appointment details easy to access.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
