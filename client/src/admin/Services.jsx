import { useState, useEffect } from "react";

function Services() {
  const [maintenance, setMaintenance] = useState(false);
  const [aiThreshold, setAiThreshold] = useState(60);
  const [ordersCount, setOrdersCount] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch("http://localhost:5000/api/orders");
      const data = await res.json();

      setOrdersCount(data.length);
      const totalRevenue = data.reduce((acc, o) => acc + o.totalAmount, 0);
      setRevenue(totalRevenue);
    };

    fetchStats();
  }, []);

  const handleSave = () => {
    alert("Settings Saved Successfully ✅");
  };

  return (
    <div className="px-4 sm:px-6 md:px-10 py-6 w-full">

      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
        Services & Settings
      </h1>

      {/* ===== Dashboard Stats ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-5 sm:p-6 rounded shadow">
          <h3 className="text-base sm:text-lg font-semibold">
            Total Orders
          </h3>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            {ordersCount}
          </p>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded shadow">
          <h3 className="text-base sm:text-lg font-semibold">
            Total Revenue
          </h3>
          <p className="text-2xl font-bold text-green-600 mt-2">
            ₹{revenue.toFixed(2)}
          </p>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded shadow">
          <h3 className="text-base sm:text-lg font-semibold">
            System Status
          </h3>
          <p
            className={`text-base sm:text-lg mt-2 font-semibold ${
              maintenance ? "text-red-600" : "text-green-600"
            }`}
          >
            {maintenance ? "Maintenance Mode ON" : "Live & Running"}
          </p>
        </div>

      </div>

      {/* ===== Settings Panel ===== */}
      <div className="bg-white p-5 sm:p-8 rounded shadow space-y-8">

        {/* AI Configuration */}
        <div>
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            AI Configuration
          </h2>

          <label className="block mb-2">
            AI Decision Threshold (%)
          </label>

          <input
            type="range"
            min="0"
            max="100"
            value={aiThreshold}
            onChange={(e) => setAiThreshold(e.target.value)}
            className="w-full"
          />

          <p className="mt-2 font-medium">
            Current Threshold: {aiThreshold}%
          </p>
        </div>

        {/* Maintenance Mode */}
        <div>
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            Website Maintenance Mode
          </h2>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={maintenance}
              onChange={() => setMaintenance(!maintenance)}
            />
            Enable Maintenance Mode
          </label>
        </div>

        {/* Admin Account */}
        <div>
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            Admin Account Settings
          </h2>

          <input
            type="text"
            placeholder="Admin Name"
            className="border p-3 w-full mb-3"
          />

          <input
            type="email"
            placeholder="Admin Email"
            className="border p-3 w-full mb-3"
          />

          <input
            type="password"
            placeholder="New Password"
            className="border p-3 w-full"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 w-full sm:w-auto"
        >
          Save All Settings
        </button>

      </div>

      {/* ===== System Info ===== */}
      <div className="mt-10 bg-gray-50 p-5 sm:p-6 rounded">
        <h3 className="text-base sm:text-lg font-semibold mb-2">
          System Information
        </h3>
        <p>Version: SmartOrder AI v1.0</p>
        <p>Server: Running on Port 5000</p>
        <p>Database: MongoDB Connected</p>
      </div>

    </div>
  );
}

export default Services;