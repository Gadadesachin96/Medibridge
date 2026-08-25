import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchDoctors = async () => {
    try {
      const response = await api.get("/doctors");

      setDoctors(response.data.doctors);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleStatusToggle = async (id) => {
    try {
      await api.patch(`/doctors/${id}/status`);

      fetchDoctors();
    } catch (error) {
      console.error("Failed to update doctor status:", error);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <p>Loading doctors...</p>
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Doctors
          </h1>

          <p className="text-gray-500 mt-1">
            Manage MediBridge doctors
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/doctors/add")}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
        >
          + Add Doctor
        </button>

      </div>


      {/* Doctors Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-6 py-4">
                DoctorName
              </th>

              <th className="text-left px-6 py-4">
                Specialization
              </th>

              <th className="text-left px-6 py-4">
                Experience
              </th>

              <th className="text-left px-6 py-4">
                Fees
              </th>

              <th className="text-left px-6 py-4">
                Status
              </th>

              <th className="text-left px-6 py-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {doctors.length === 0 ? (

              <tr>
                <td
                  colSpan="6"
                  className="text-center py-10 text-gray-500"
                >
                  No doctors found
                </td>
              </tr>

            ) : (

              doctors.map((doctor) => (

                <tr
                  key={doctor._id}
                  className="border-t"
                >

                  <td className="px-6 py-4">

                    <div>
                      <p className="font-semibold text-gray-800">
                        {doctor.user?.name||"N/A"}
                      </p>

                      <p className="text-sm text-gray-500">
                        {/* {doctor.user?.email||"N/A"} */}
                      </p>
                    </div>

                  </td>


                  <td className="px-6 py-4">
                    {doctor.specialization || "N/A"}
                  </td>


                  <td className="px-6 py-4">
                    {doctor.experience || 0} years
                  </td>


                  <td className="px-6 py-4">
                    ₹{doctor.fees || 0}
                  </td>


                  <td className="px-6 py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        doctor.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {doctor.isActive ? "Active" : "Inactive"}
                    </span>

                  </td>


                  <td className="px-6 py-4">

                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          navigate(`/admin/doctors/edit/${doctor._id}`)
                        }
                        className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleStatusToggle(doctor._id)
                        }
                        className={`px-3 py-2 rounded-lg ${
                          doctor.isActive
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {doctor.isActive
                          ? "Deactivate"
                          : "Activate"}
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Doctors;