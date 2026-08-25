const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800">
        Admin Dashboard
      </h1>

      <p className="mt-2 text-gray-600">
        Welcome to MediBridge Admin Panel
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

        <div className="bg-white shadow-md rounded-xl p-6">
          <p className="text-gray-500">Total Doctors</p>
          <h2 className="text-3xl font-bold mt-2">0</h2>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <p className="text-gray-500">Total Patients</p>
          <h2 className="text-3xl font-bold mt-2">0</h2>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <p className="text-gray-500">Appointments</p>
          <h2 className="text-3xl font-bold mt-2">0</h2>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <p className="text-gray-500">Pending</p>
          <h2 className="text-3xl font-bold mt-2">0</h2>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;