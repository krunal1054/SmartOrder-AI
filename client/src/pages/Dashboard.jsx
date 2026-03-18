import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [mode, setMode] = useState("sessions");
  const navigate = useNavigate();

  const fetchLogs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/behavior/logs");
      const data = await res.json();
      setLogs(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const uniqueSessions = [...new Set(logs.map(l => l.sessionId))];
  const totalSessions = uniqueSessions.length;

  const sessionTime = logs.reduce((sum, l) => sum + (l.timeSpent || 0), 0);

  const totalInteractions = logs.reduce(
    (sum, l) => sum + (l.interactions || 0),
    0
  );

  const interactionProducts = logs.length;

  const productMap = {};

  logs.forEach((log) => {
    if (!productMap[log.productName]) {
      productMap[log.productName] = {
        views: 0,
        totalTime: 0,
        totalScore: 0,
        impulse: 0,
        rational: 0,
        interactions: 0,
      };
    }

    productMap[log.productName].views++;
    productMap[log.productName].totalTime += log.timeSpent || 0;
    productMap[log.productName].totalScore += log.finalScore || 0;
    productMap[log.productName].interactions += log.interactions || 0;

    if (log.decisionTag === "Impulse Purchase")
      productMap[log.productName].impulse++;

    if (log.decisionTag === "Rational Purchase")
      productMap[log.productName].rational++;
  });

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 sm:mb-10">
          LIVE SMARTORDER USER INSIGHTS
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* LEFT PANEL */}
          <div className="border rounded-lg p-5 sm:p-6 shadow-sm min-h-[400px] sm:min-h-[600px]">

            <button
              onClick={() => setMode("sessions")}
              className={`py-3 rounded mb-4 w-full text-sm sm:text-base ${
                mode === "sessions"
                  ? "bg-blue-900 text-white"
                  : "border"
              }`}
            >
              Total Sessions: {totalSessions}
            </button>

            <button
              onClick={() => setMode("interactions")}
              className={`py-3 rounded w-full text-sm sm:text-base ${
                mode === "interactions"
                  ? "bg-blue-900 text-white"
                  : "border"
              }`}
            >
              Total Interactions: {totalInteractions}
            </button>

            {/* NEW BUTTON ADDED */}
            <button
              onClick={() => navigate("/decision")}
              className="py-3 rounded w-full text-sm sm:text-base border mt-4 bg-purple-600 text-white hover:bg-purple-700"
            >
              Proceed to Intelligent Validation
            </button>

            <div className="mt-6 sm:mt-8 text-sm">

              {mode === "sessions" && (
                <>
                  <p className="font-semibold mb-2">
                    Session Intelligence
                  </p>
                  <p>Unique Sessions: {totalSessions}</p>
                  <p>Total Session Time: {sessionTime}s</p>
                  <p>
                    Avg Session Time:{" "}
                    {totalSessions > 0
                      ? (sessionTime / totalSessions).toFixed(1)
                      : 0}s
                  </p>
                  <p className="text-gray-500 mt-2">
                    Measures decision depth per visit.
                  </p>
                </>
              )}

              {mode === "interactions" && (
                <>
                  <p className="font-semibold mb-2">
                    Engagement Intelligence
                  </p>
                  <p>Total Clicks: {totalInteractions}</p>
                  <p>Products Engaged: {interactionProducts}</p>
                  <p>
                    Avg Clicks Per Product:{" "}
                    {interactionProducts > 0
                      ? (totalInteractions / interactionProducts).toFixed(1)
                      : 0}
                  </p>
                  <p className="text-gray-500 mt-2">
                    Measures behavioral engagement signals.
                  </p>
                </>
              )}

            </div>
          </div>

          {/* AI PROFILE */}
          <div className="border rounded-lg p-5 sm:p-6 shadow-sm max-h-[400px] sm:max-h-[600px] overflow-y-auto">
            <h2 className="font-semibold mb-4">
              AI BEHAVIOR PROFILE
            </h2>

            {Object.entries(productMap).map(([name, data], i) => {
              const avgTime = (data.totalTime / data.views).toFixed(1);
              const avgScore = (data.totalScore / data.views).toFixed(1);

              return (
                <div key={i} className="border p-3 rounded mb-3">
                  <p className="font-semibold text-sm">{name}</p>
                  <p>Views: {data.views}</p>
                  <p>Avg Time: {avgTime}s</p>
                  <p>Decision Score: {avgScore}</p>
                </div>
              );
            })}
          </div>

          {/* DECISION SPLIT */}
          <div className="border rounded-lg p-5 sm:p-6 shadow-sm max-h-[400px] sm:max-h-[600px] overflow-y-auto">
            <h2 className="font-semibold mb-4">
              DECISION DISTRIBUTION
            </h2>

            {Object.entries(productMap).map(([name, data], i) => (
              <div key={i} className="border p-3 rounded mb-3">
                <p className="font-semibold text-sm">{name}</p>
                <p className="text-green-600">
                  Rational: {data.rational}
                </p>
                <p className="text-red-500">
                  Impulse: {data.impulse}
                </p>
              </div>
            ))}
          </div>

          {/* HESITATION */}
          <div className="border rounded-lg p-5 sm:p-6 shadow-sm max-h-[400px] sm:max-h-[600px] overflow-y-auto">
            <h2 className="font-semibold mb-4">
              HESITATION ANALYTICS
            </h2>

            {Object.entries(productMap).map(([name, data], i) => {
              const avgTime = data.totalTime / data.views;

              const level =
                avgTime > 20 ? "High" :
                avgTime > 10 ? "Medium" : "Low";

              return (
                <div key={i} className="border p-3 rounded mb-3">
                  <p className="font-semibold text-sm">{name}</p>
                  <p>Avg Time: {avgTime.toFixed(1)}s</p>
                  <p>Hesitation: {level}</p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;
