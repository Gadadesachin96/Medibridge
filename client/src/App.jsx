import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Public pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import PatientSignup from "./pages/PatientSignup";
import Pdoctor from "./pages/Pdoctor";
import BookAppointment from "./pages/BookAppointment";
import MyAppointments from "./pages/MyAppointments";
import About from "./pages/About";

// Layouts
import Mlayout from "./layouts/Mlayout";
import AdminLayout from "./layouts/AdminLayout";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import Doctors from "./pages/admin/Doctors";
import Patient from "./pages/admin/Patient";
import Appointment from "./pages/admin/Appointment";
import AddDoctor from "./pages/admin/AddDoctor";

// Doctor
import DoctorDashboard from "./pages/DoctorDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            PUBLIC / PATIENT ROUTES
        ========================= */}

        <Route element={<Mlayout />}>

          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route
            path="/patientSignup"
            element={<PatientSignup />}
          />

          <Route path="/pDoctor" element={<Pdoctor />} />

          <Route path="/about" element={<About />} />

          <Route
            path="/book-appointment/:doctorId"
            element={<BookAppointment />}
          />

          <Route
            path="/my-appointments"
            element={<MyAppointments />}
          />

        </Route>


        {/* =========================
            ADMIN ROUTES
        ========================= */}

        <Route path="/admin" element={<AdminLayout />}>

          <Route
            index
            element={<AdminDashboard />}
          />

          <Route
            path="dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="doctors"
            element={<Doctors />}
          />

          <Route
            path="doctors/add"
            element={<AddDoctor />}
          />

          <Route
            path="appointments"
            element={<Appointment />}
          />

          <Route
            path="patients"
            element={<Patient />}
          />

        </Route>


        {/* =========================
            DOCTOR ROUTES
        ========================= */}

        <Route
          path="/doctor/dashboard"
          element={<DoctorDashboard />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;