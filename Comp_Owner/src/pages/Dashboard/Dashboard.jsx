// import "./dashboard.css";

// const Dashboard = () => {
//   return (
//     <div className="dashboard">
//       <h1 className="dashboard-title">Dashboard</h1>

//       <div className="stats-grid">
//         <div className="stat-card">
//           <p className="stat-label">Total Users</p>
//           <h2 className="stat-value">0</h2>
//         </div>

//         <div className="stat-card">
//           <p className="stat-label">Total Creators</p>
//           <h2 className="stat-value">0</h2>
//         </div>

//         <div className="stat-card">
//           <p className="stat-label">Total Quizzes</p>
//           <h2 className="stat-value">0</h2>
//         </div>

//         <div className="stat-card">
//           <p className="stat-label">Active Quizzes</p>
//           <h2 className="stat-value">0</h2>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import "./dashboard.css";
import {
  getToalNoUserQuizCreators,
  getQuizGrowthData,
  getTechWiseQuizData,
} from "../../utils/API";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [quizGrowthData, setQuizGrowthData] = useState([]);
  const [techWiseData, setTechWiseData] = useState([]);
  useEffect(() => {
    getToalNoUserQuizCreators()
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getQuizGrowthData()
      .then((res) => setQuizGrowthData(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getTechWiseQuizData()
      .then((res) => setTechWiseData(res.data.data))
      .catch((err) => console.log(err));
  }, []);

 
    const stats = [
      { label: "Total Users", value: data.totalUsers },
      { label: "Total Creators", value: data.totalCreators },
      { label: "Total Quizzes", value: data.totalQuizzes },
      { label: "Active Quizzes", value: data.totalQuizzes },
    ];

  const formattedTechData = useMemo(() => {
    return techWiseData.map((item) => ({
      ...item,
      tech:
        item.tech === "Java Programming"
          ? "Java"
          : item.tech === "C Programming"
            ? "C"
            : item.tech,
    }));
  }, [techWiseData]);

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard Overview</h1>

      <div className="stats-grid">
        {stats.map((item, index) => (
          <div className="stat-card" key={index}>
            <p className="stat-label">{item.label}</p>
            <h2 className="stat-value">{item.value}</h2>
          </div>
        ))}
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Quiz Growth</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={quizGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="quizzes"
                stroke="#4f46e5"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Technology-wise Quizzes</h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={formattedTechData}
              margin={{ top: 10, right: 20, left: 10, bottom: 70 }}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="tech"
                interval={0}
                angle={-35}
                textAnchor="end"
                tickMargin={12}
                tick={{ fontSize: 11 }}
              />

              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar
                dataKey="quizzes"
                fill="#22c55e"
                radius={[6, 6, 0, 0]}
                barSize={28}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
