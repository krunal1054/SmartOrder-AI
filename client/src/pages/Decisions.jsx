import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import AnalyticsChart from "../admin/AnalyticsChart";

function Decision() {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/behavior/logs");
      const data = await res.json();
      setLogs(data);
    } catch (err) {
      console.log("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8">
          SMARTORDER AI – LIVE ANALYTICS DASHBOARD
        </h1>

        {/* AI VISUAL ANALYTICS */}
        <div className="mt-10">
          <AnalyticsChart logs={logs} />
        </div>

      </div>
    </>
  );
}

export default Decision;