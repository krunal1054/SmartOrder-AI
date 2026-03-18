import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
} from "recharts";

function AnalyticsChart({ logs }) {

  const impulse = logs.filter(
    l => l.decisionTag === "Impulse Purchase"
  ).length;

  const rational = logs.filter(
    l => l.decisionTag === "Rational Purchase"
  ).length;

  const avgScore =
    logs.length > 0
      ? (
          logs.reduce((sum, l) => sum + (l.finalScore || 0), 0) /
          logs.length
        ).toFixed(1)
      : 0;

  const decisionData = [
    { name: "Impulse", value: impulse },
    { name: "Rational", value: rational },
  ];

  const productData = logs.map(l => ({
    name: l.productName.substring(0, 12),
    score: l.finalScore,
  }));

  const timeData = logs.map((l, i) => ({
    session: i + 1,
    time: l.timeSpent,
  }));

  const impulseTrend = logs.map((l, i) => ({
    session: i + 1,
    impulse: l.impulseScore,
  }));

  const radialData = [
    {
      name: "Avg Score",
      value: Number(avgScore),
      fill: "#3b82f6",
    },
  ];

  const COLORS = ["#ef4444", "#22c55e"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">

      {/* PIE */}
      <div className="border rounded-lg p-4 shadow-sm h-[280px] sm:h-[300px]">
        <h3 className="font-semibold mb-2 text-sm sm:text-base">
          Decision Distribution
        </h3>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={decisionData}
              dataKey="value"
              outerRadius={90}
              label
            >
              {decisionData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* BAR */}
      <div className="border rounded-lg p-4 shadow-sm h-[280px] sm:h-[300px]">
        <h3 className="font-semibold mb-2 text-sm sm:text-base">
          Product Decision Score
        </h3>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={productData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" hide={window.innerWidth < 500}/>
            <YAxis />
            <Tooltip />
            <Bar dataKey="score" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* LINE */}
      <div className="border rounded-lg p-4 shadow-sm h-[280px] sm:h-[300px]">
        <h3 className="font-semibold mb-2 text-sm sm:text-base">
          User Time Spent Trend
        </h3>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={timeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="session" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="time"
              stroke="#22c55e"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* AREA */}
      <div className="border rounded-lg p-4 shadow-sm h-[280px] sm:h-[300px]">
        <h3 className="font-semibold mb-2 text-sm sm:text-base">
          Impulse Score Trend
        </h3>

        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={impulseTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="session" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="impulse"
              stroke="#ef4444"
              fill="#fecaca"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* RADIAL */}
      <div className="border rounded-lg p-4 shadow-sm h-[280px] sm:h-[300px] md:col-span-2 xl:col-span-2">
        <h3 className="font-semibold mb-2 text-sm sm:text-base">
          Average AI Decision Score
        </h3>

        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="70%"
            outerRadius="100%"
            data={radialData}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar
              minAngle={15}
              background
              clockWise
              dataKey="value"
            />
            <Legend />
            <Tooltip />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default AnalyticsChart;