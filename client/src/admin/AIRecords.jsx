import { useEffect, useState } from "react";

function AIRecords() {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    rational: 0,
    impulse: 0,
  });

  const fetchLogs = async () => {
    const res = await fetch("http://localhost:5000/api/behavior/logs");
    const data = await res.json();

    setLogs(data.reverse());

    const rationalCount = data.filter(
      (l) => l.decisionTag === "Rational Purchase"
    ).length;

    const impulseCount = data.filter(
      (l) => l.decisionTag === "Impulse Purchase"
    ).length;

    setStats({
      total: data.length,
      rational: rationalCount,
      impulse: impulseCount,
    });
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-4 sm:px-6 md:px-10 py-6 w-full">

      <h1 className="text-2xl sm:text-3xl font-bold mb-8">
        AI Behavior Logs (Live)
      </h1>

      {/* ===== TOP STATS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-5 sm:p-6 rounded shadow">
          <h3 className="text-sm text-gray-600">Total Sessions</h3>
          <p className="text-2xl font-bold text-blue-600">
            {stats.total}
          </p>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded shadow">
          <h3 className="text-sm text-gray-600">Rational Purchases</h3>
          <p className="text-2xl font-bold text-green-600">
            {stats.rational}
          </p>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded shadow">
          <h3 className="text-sm text-gray-600">Impulse Purchases</h3>
          <p className="text-2xl font-bold text-red-600">
            {stats.impulse}
          </p>
        </div>

      </div>

      {/* ===== LOG LIST ===== */}
      <div className="space-y-6">

        {logs.map((log) => (
          <div
            key={log._id}
            className="bg-white p-5 sm:p-6 rounded shadow border"
          >

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">

              <h3 className="font-semibold text-base sm:text-lg">
                {log.productName}
              </h3>

              <span
                className={`px-3 py-1 rounded text-white text-xs sm:text-sm w-fit ${
                  log.decisionTag === "Rational Purchase"
                    ? "bg-green-600"
                    : "bg-red-600"
                }`}
              >
                {log.decisionTag}
              </span>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-sm">

              <p><strong>Impulse Score:</strong> {log.impulseScore}</p>
              <p><strong>Compatibility:</strong> {log.compatibilityScore}</p>
              <p><strong>Time Spent:</strong> {log.timeSpent}s</p>
              <p><strong>Color:</strong> {log.colorSelected}</p>
              <p><strong>Size:</strong> {log.sizeSelected}</p>
              <p><strong>Quantity:</strong> {log.quantity}</p>
              <p><strong>Action:</strong> {log.action}</p>

              <p className="sm:col-span-2 text-xs sm:text-sm text-gray-600">
                <strong>Date:</strong>{" "}
                {new Date(log.createdAt).toLocaleString()}
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default AIRecords;