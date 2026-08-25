import { useEffect, useState } from "react";
import api from "../services/api";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const response = await api.get("/appointments/my");

      setAppointments(
        response.data.appointments || []
      );

    } catch (error) {
      console.error(
        "Failed to fetch appointments:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);


  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading appointments...
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-800">
          My Appointments
        </h1>

        <p className="text-gray-500 mt-2 mb-8">
          View and track your appointments
        </p>


        {appointments.length === 0 ? (

          <div className="bg-white rounded-xl shadow p-10 text-center">

            <p className="text-gray-500">
              You don't have any appointments yet.
            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {appointments.map((appointment) => (

              <div
                key={appointment._id}
                className="bg-white rounded-xl shadow p-6"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h2 className="text-xl font-semibold">
                      {appointment.doctor?.user?.name ||
                        "Doctor"}
                    </h2>

                    <p className="text-blue-600">
                      {appointment.doctor?.specialization}
                    </p>

                    <p className="text-gray-600 mt-3">
                      Date:{" "}
                      {new Date(
                        appointment.date
                      ).toLocaleDateString()}
                    </p>

                    <p className="text-gray-600">
                      Time:{" "}
                      {appointment.time}
                    </p>

                    <p className="text-gray-600 mt-2">
                      Reason: {appointment.reason}
                    </p>

                  </div>


                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      appointment.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : appointment.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : appointment.status === "completed"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {appointment.status}
                  </span>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default MyAppointments;