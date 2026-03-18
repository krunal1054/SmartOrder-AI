import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

function Admin() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/behavior/logs");
      const data = await res.json();
      setLogs(data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching logs:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 3000);
    return () => clearInterval(interval);
  }, []);

  const totalSessions = logs.length;

  const impulseCount = logs.filter(
    (l) => l.decisionTag === "Impulse Purchase"
  ).length;

  const rationalCount = logs.filter(
    (l) => l.decisionTag === "Rational Purchase"
  ).length;

  const avgImpulseScore =
    totalSessions > 0
      ? (
          logs.reduce((sum, l) => sum + (l.impulseScore || 0), 0) /
          totalSessions
        ).toFixed(1)
      : 0;

  const avgCompatibilityScore =
    totalSessions > 0
      ? (
          logs.reduce((sum, l) => sum + (l.compatibilityScore || 0), 0) /
          totalSessions
        ).toFixed(1)
      : 0;

  const productStats = {};

  logs.forEach((log) => {
    if (!productStats[log.productName]) {
      productStats[log.productName] = {
        views: 0,
        impulse: 0,
        rational: 0,
      };
    }

    productStats[log.productName].views++;

    if (log.decisionTag === "Impulse Purchase")
      productStats[log.productName].impulse++;
    else
      productStats[log.productName].rational++;
  });

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 md:mb-8">
          ADMIN CONTROL CENTER : SMARTORDER AI
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* LIVE SESSION LOGS */}
          <div className="border rounded-lg p-4 sm:p-6 shadow-sm overflow-y-auto max-h-[400px] sm:max-h-[500px]">
            <h2 className="font-semibold mb-4">LIVE SESSION LOGS</h2>

            {loading && <p>Loading...</p>}

            {!loading &&
              logs.map((log) => (
                <div key={log._id} className="mb-4 border-b pb-3">
                  <p className="font-semibold">{log.productName}</p>

                  <p className="text-sm">
                    Decision:
                    <b className="ml-1 text-blue-600">
                      {log.decisionTag}
                    </b>
                  </p>

                  <p className="text-sm">
                    Final Score:
                    <b className="ml-1">{log.finalScore}</b>
                  </p>

                  <p className="text-sm">
                    Impulse Score:
                    <b className="ml-1 text-red-500">
                      {log.impulseScore}
                    </b>
                  </p>

                  <p className="text-sm">
                    Compatibility:
                    <b className="ml-1 text-green-600">
                      {log.compatibilityScore}
                    </b>
                  </p>

                  <p className="text-sm">
                    Time Spent: {log.timeSpent}s
                  </p>

                  <p className="text-xs text-gray-500">
                    {log.insight}
                  </p>
                </div>
              ))}
          </div>

          {/* TREND SIMULATOR */}
          <div className="border rounded-lg p-4 sm:p-6 shadow-sm overflow-y-auto max-h-[400px] sm:max-h-[500px]">
            <h2 className="font-semibold mb-4">TREND SIMULATOR</h2>

            <p>Total Sessions: {totalSessions}</p>
            <p className="text-red-500">
              Impulse Purchases: {impulseCount}
            </p>
            <p className="text-green-600">
              Rational Purchases: {rationalCount}
            </p>

            <hr className="my-4" />

            {Object.entries(productStats).map(([name, data], i) => (
              <div key={i} className="mb-4">
                <p className="font-semibold">{name}</p>
                <p className="text-sm">Views: {data.views}</p>
                <p className="text-sm text-red-500">
                  Impulse: {data.impulse}
                </p>
                <p className="text-sm text-green-600">
                  Rational: {data.rational}
                </p>
              </div>
            ))}
          </div>

          {/* AI SCORE ANALYTICS */}
          <div className="border rounded-lg p-4 sm:p-6 shadow-sm">
            <h2 className="font-semibold mb-4">AI SCORE ANALYTICS</h2>

            <p>Total Sessions: {totalSessions}</p>
            <p>Avg Impulse Score: {avgImpulseScore}</p>
            <p>Avg Compatibility Score: {avgCompatibilityScore}</p>
          </div>

        </div>
      </div>
    </>
  );
}

export default Admin;