import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const AddDoctor = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    qualification: "",
    experience: "",
    phone: "",
    fees: "",
    availableDays: [],
    availableTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleDayChange = (e) => {
    const { value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      availableDays: checked
        ? [...prev.availableDays, value]
        : prev.availableDays.filter(
            (day) => day !== value
          ),
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/doctors", {
        ...formData,
        experience: Number(formData.experience),
        fees: Number(formData.fees),
      });

      navigate("/admin/doctors");

    } catch (error) {
      console.error("Create doctor failed:", error);

      alert(
        error.response?.data?.message ||
          "Failed to create doctor"
      );
    }
  };


  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold text-gray-800">
        Add Doctor
      </h1>

      <p className="text-gray-500 mt-1 mb-6">
        Add a new doctor to MediBridge
      </p>


      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow max-w-4xl"
      >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <input
            name="name"
            placeholder="Doctor Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border p-3 rounded-lg"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border p-3 rounded-lg"
          />

          <input
            name="password"
            type="password"
            placeholder="Temporary Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border p-3 rounded-lg"
          />

          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            name="specialization"
            placeholder="Specialization"
            value={formData.specialization}
            onChange={handleChange}
            required
            className="border p-3 rounded-lg"
          />

          <input
            name="qualification"
            placeholder="Qualification"
            value={formData.qualification}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            name="experience"
            type="number"
            placeholder="Experience (years)"
            value={formData.experience}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            name="fees"
            type="number"
            placeholder="Consultation Fees"
            value={formData.fees}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            name="availableTime"
            placeholder="10:00 AM - 4:00 PM"
            value={formData.availableTime}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

        </div>


        <div className="mt-6">

          <p className="font-semibold mb-3">
            Available Days
          </p>

          <div className="flex flex-wrap gap-4">

            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day) => (

              <label
                key={day}
                className="flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  value={day}
                  checked={formData.availableDays.includes(day)}
                  onChange={handleDayChange}
                />

                {day}
              </label>

            ))}

          </div>

        </div>


        <div className="flex gap-3 mt-8">

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Create Doctor
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/doctors")}
            className="border px-6 py-3 rounded-lg"
          >
            Cancel
          </button>

        </div>

      </form>

    </div>
  );
};

export default AddDoctor;