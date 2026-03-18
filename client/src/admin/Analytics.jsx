import { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell,
  LineChart, Line,
  BarChart, Bar,
  XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer
} from "recharts";

function Analytics() {
  const [logs, setLogs] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const logRes = await fetch("http://localhost:5000/api/behavior/logs");
      const logData = await logRes.json();
      setLogs(logData);

      const orderRes = await fetch("http://localhost:5000/api/orders");
      const orderData = await orderRes.json();
      setOrders(orderData);
    };

    fetchData();
  }, []);

  const rational = logs.filter(l => l.decisionTag === "Rational Purchase").length;
  const impulse = logs.filter(l => l.decisionTag === "Impulse Purchase").length;

  const pieData = [
    { name: "Rational", value: rational },
    { name: "Impulse", value: impulse }
  ];

  const COLORS = ["#16a34a", "#dc2626"];

  const lineData = logs.slice(-10).map((l, i) => ({
    name: i + 1,
    score: l.finalScore
  }));

  const revenueData = orders.slice(-10).map((o, i) => ({
    name: i + 1,
    revenue: o.totalAmount
  }));

  const productMap = {};
  logs.forEach(l => {
    productMap[l.productName] = (productMap[l.productName] || 0) + 1;
  });

  const productData = Object.keys(productMap).map(p => ({
    name: p,
    count: productMap[p]
  }));

  const timeData = logs.slice(-10).map((l, i) => ({
    name: i + 1,
    time: l.timeSpent
  }));

  return (
    <div className="px-4 sm:px-6 md:px-10 py-6 w-full">

      <h1 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-10">
        Analytics Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">

        {/* PIE */}
        <div className="bg-white p-4 sm:p-6 rounded shadow">
          <h2 className="mb-4 font-semibold text-sm sm:text-base">
            Rational vs Impulse
          </h2>

          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={100}>
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* AI SCORE TREND */}
        <div className="bg-white p-4 sm:p-6 rounded shadow">
          <h2 className="mb-4 font-semibold text-sm sm:text-base">
            AI Score Trend
          </h2>

          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={lineData}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid stroke="#eee" />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#2563eb" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* REVENUE TREND */}
        <div className="bg-white p-4 sm:p-6 rounded shadow">
          <h2 className="mb-4 font-semibold text-sm sm:text-base">
            Revenue Trend
          </h2>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={revenueData}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid stroke="#eee" />
              <Tooltip />
              <Bar dataKey="revenue" fill="#16a34a" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PRODUCT POPULARITY */}
        <div className="bg-white p-4 sm:p-6 rounded shadow overflow-x-auto">
          <h2 className="mb-4 font-semibold text-sm sm:text-base">
            Product Popularity
          </h2>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={productData}>
              <XAxis dataKey="name" hide={window.innerWidth < 500} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#9333ea" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* TIME SPENT */}
        <div className="bg-white p-4 sm:p-6 rounded shadow lg:col-span-2">
          <h2 className="mb-4 font-semibold text-sm sm:text-base">
            User Time Spent
          </h2>

          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={timeData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="time" stroke="#f59e0b" />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
}

export default Analytics;