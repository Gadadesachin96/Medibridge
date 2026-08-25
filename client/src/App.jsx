import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import PatientSignup from "./pages/PatientSignup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Mlayout from "./layouts/Mlayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Doctors from "./pages/admin/Doctors";
import Patient from "./pages/admin/Patient";
import Appointment from "./pages/admin/Appointment";
import AdminLayout from "./layouts/AdminLayout";
import AddDoctor from "./pages/admin/AddDoctor";
import Pdoctor from "./pages/Pdoctor";
import BookAppointment from "./pages/BookAppointment";
import MyAppointments from "./pages/MyAppointments";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}

        <Route element={<Mlayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/patientSignup" element={<PatientSignup />} />
          <Route path="/pDoctor" element={<Pdoctor />} />
          <Route
            path="/book-appointment/:doctorId"
            element={<BookAppointment />}
          />

          <Route path="/my-appointments" element={<MyAppointments />} />

          {/* Admin Layout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />

            <Route path="doctors" element={<Doctors />} />
            <Route path="doctors/add" element={<AddDoctor />} />

            <Route path="appointment" element={<Appointment />} />

            <Route path="patient" element={<Patient />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
