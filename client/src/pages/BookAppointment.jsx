import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const BookAppointment = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    reason: "",
  });

  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  const fetchDoctor = async () => {
    try {
      const response = await api.get("/doctors");

      const foundDoctor = response.data.doctors.find(
        (item) => item._id === doctorId
      );

      setDoctor(foundDoctor);

    } catch (error) {
      console.error("Failed to fetch doctor:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, [doctorId]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("========== BOOK APPOINTMENT ==========");
  console.log("Doctor ID:", doctorId);
  console.log("Date:", formData.date);
  console.log("Time:", formData.time);
  console.log("Reason:", formData.reason);

  try {
    setBooking(true);

    const response = await api.post("/appointments", {
      doctor: doctorId,
      date: formData.date,
      time: formData.time,
      reason: formData.reason,
    });

    console.log("SUCCESS:", response.data);

    alert("Appointment booked successfully!");

    navigate("/my-appointments");

  } catch (error) {
    console.error("APPOINTMENT ERROR:", error);
    console.error("SERVER RESPONSE:", error.response?.data);

    alert(
      error.response?.data?.message ||
      "Failed to book appointment"
    );

  } finally {
    setBooking(false);
  }
};

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }


  if (!doctor) {
    return (
      <div className="p-10 text-center">
        <p>Doctor not found.</p>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-2xl mx-auto">

        <div className="bg-white rounded-2xl shadow p-8">

          <h1 className="text-2xl font-bold text-gray-800">
            Book Appointment
          </h1>


          {/* Doctor Information */}

          <div className="bg-blue-50 rounded-xl p-5 mt-6">

            <h2 className="text-xl font-semibold">
              {doctor.user?.name}
            </h2>

            <p className="text-blue-600">
              {doctor.specialization}
            </p>

            <p className="text-gray-600 mt-2">
              {doctor.qualification}
            </p>

            <p className="font-semibold mt-2">
              Consultation Fee: ₹{doctor.fees}
            </p>

          </div>


          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-5"
          >

            {/* Date */}

            <div>

              <label className="block font-medium mb-2">
                Appointment Date
              </label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3"
              />

            </div>


            {/* Time */}

            <div>

              <label className="block font-medium mb-2">
                Appointment Time
              </label>

              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3"
              />

            </div>


            {/* Reason */}

            <div>

              <label className="block font-medium mb-2">
                Reason for Visit
              </label>

              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Describe your problem..."
                className="w-full border rounded-lg p-3"
              />

            </div>


            <button
              type="submit"
              disabled={booking}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {booking
                ? "Booking..."
                : "Confirm Appointment"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default BookAppointment;