import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Pdoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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

  useEffect(() => {
    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading doctors...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Find a Doctor
          </h1>

          <p className="text-gray-500 mt-2">
            Choose a doctor and book your appointment
          </p>
        </div>


        {/* Doctors */}
        {doctors.length === 0 ? (

          <div className="bg-white rounded-xl p-10 text-center shadow">
            <p className="text-gray-500">
              No doctors available right now.
            </p>
          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {doctors
              .filter((doctor) => doctor.isActive !== false)
              .map((doctor) => (

                <div
                  key={doctor._id}
                  className="bg-white rounded-2xl shadow-sm border p-6"
                >

                  {/* Doctor Icon */}
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <span className="text-2xl">
                      👨‍⚕️
                    </span>
                  </div>


                  {/* Doctor Name */}
                  <h2 className="text-xl font-semibold text-gray-800">
                    {doctor.user?.name || "Doctor"}
                  </h2>


                  {/* Specialization */}
                  <p className="text-blue-600 font-medium mt-1">
                    {doctor.specialization}
                  </p>


                  {/* Qualification */}
                  <p className="text-gray-500 text-sm mt-3">
                    {doctor.qualification}
                  </p>


                  {/* Experience */}
                  <p className="text-gray-600 mt-3">
                    {doctor.experience} years experience
                  </p>


                  {/* Fees */}
                  <p className="text-gray-800 font-semibold mt-2">
                    Consultation: ₹{doctor.fees}
                  </p>


                  {/* Available Days */}
                  {doctor.availableDays?.length > 0 && (
                    <p className="text-sm text-gray-500 mt-3">
                      Available:{" "}
                      {doctor.availableDays.join(", ")}
                    </p>
                  )}


                  {/* Button */}
                  <button
                    onClick={() =>
                      navigate(`/book-appointment/${doctor._id}`)
                    }
                    className="w-full mt-5 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                  >
                    Book Appointment
                  </button>

                </div>

              ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default Pdoctor;