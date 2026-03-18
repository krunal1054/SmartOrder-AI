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

  const impulseCount = logs.filter(
    (l) => l.decisionTag === "Impulse Purchase"
  ).length;

  const rationalCount = logs.filter(
    (l) => l.decisionTag === "Rational Purchase"
  ).length;

  const avgScore =
    logs.length > 0
      ? (
          logs.reduce((sum, l) => sum + (l.finalScore || 0), 0) /
          logs.length
        ).toFixed(1)
      : 0;

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8">
          SMARTORDER AI – LIVE ANALYTICS DASHBOARD
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* LIVE SESSION LOGS */}
          <div className="border rounded-lg p-4 sm:p-6 shadow-sm max-h-[400px] sm:max-h-[520px] overflow-y-auto">
            <h2 className="font-semibold mb-4">LIVE SESSION LOGS</h2>

            {logs.length === 0 && (
              <p className="text-sm text-gray-500">No Data Yet</p>
            )}

            {logs.map((log) => (
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
                  <span className="ml-1 text-red-500">
                    {log.impulseScore}
                  </span>
                </p>

                <p className="text-sm">
                  Compatibility Score:
                  <span className="ml-1 text-green-600">
                    {log.compatibilityScore}
                  </span>
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
          <div className="border rounded-lg p-4 sm:p-6 shadow-sm">
            <h2 className="font-semibold mb-4">
              TREND SIMULATOR
            </h2>

            <p className="text-sm">
              Total Sessions: <b>{logs.length}</b>
            </p>

            <p className="text-sm text-red-500 mt-2">
              Impulse Purchases: <b>{impulseCount}</b>
            </p>

            <p className="text-sm text-green-600">
              Rational Purchases: <b>{rationalCount}</b>
            </p>

            <hr className="my-4" />

            <p className="text-sm">
              Average Decision Score: <b>{avgScore}</b>
            </p>

            <p className="text-xs mt-4 text-gray-500">
              Trends generated from real AI behavioral logs.
            </p>
          </div>

          {/* AI SCORE CONFIGURATOR */}
          <div className="border rounded-lg p-4 sm:p-6 shadow-sm max-h-[400px] sm:max-h-[520px] overflow-y-auto">
            <h2 className="font-semibold mb-4">
              AI SCORE CONFIGURATOR
            </h2>

            {logs.map((log) => (
              <div key={log._id} className="mb-4 border-b pb-3">

                <p className="font-semibold text-sm">
                  {log.productName}
                </p>

                <p className="text-xs">
                  Final Score: <b>{log.finalScore}</b>
                </p>

                <p className="text-xs">
                  Impulse Score: {log.impulseScore}
                </p>

                <p className="text-xs">
                  Compatibility Score: {log.compatibilityScore}
                </p>

                <p className="text-xs text-blue-600">
                  Decision Engine: {log.decisionTag}
                </p>

              </div>
            ))}
          </div>

        </div>

        {/* AI VISUAL ANALYTICS */}
        <div className="mt-10">
          <AnalyticsChart logs={logs} />
        </div>

      </div>
    </>
  );
}

export default Decision;