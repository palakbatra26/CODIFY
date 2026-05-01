import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../utils/api";

const Profile = () => {
  const [results, setResults] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchResults = async () => {
      const res = await API.get("/results/me");
      setResults(res.data.data);
    };
    fetchResults();
  }, []);
  
  const totalSolved = results.length;
  const avgScore =
    totalSolved === 0
      ? 0
      : Math.round(results.reduce((a, b) => a + b.percentage, 0) / totalSolved);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black text-white px-10 py-12">
      {/* PROFILE HEADER */}
      {/* PROFILE HEADER */}
      <div className="flex items-center justify-between mb-12">
        {/* LEFT → User Info */}
        <div className="flex items-center gap-6">
          <div
            className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600
                    flex items-center justify-center text-3xl font-bold"
          >
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-4xl font-extrabold">{user?.name}</h1>
            <p className="text-gray-400">{user?.email}</p>

            <span
              className="inline-block mt-2 px-4 py-1 text-sm rounded-full
                       bg-blue-600/20 text-blue-400"
            >
              Learner
            </span>
          </div>
        </div>

        {/* RIGHT → Logout */}
        <button
          onClick={handleLogout}
          className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700
               transition font-semibold"
        >
          Logout
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
        <StatCard title="Quizzes Solved" value={totalSolved} />
        <StatCard title="Average Score" value={`${avgScore}%`} />
      </div>

      {/* QUIZ HISTORY */}
      <h2 className="text-3xl font-bold mb-6">Solved Quizzes</h2>

      {results.length === 0 ? (
        <p className="text-gray-400">No quizzes solved yet.</p>
      ) : (
        <div className="space-y-6">
          {results.map((r) => (
            <div
              key={r._id}
              className="bg-gradient-to-r from-gray-900 to-gray-800
                         border border-gray-700 rounded-2xl p-6
                         hover:border-blue-500 transition"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-2xl font-semibold">{r.quizId.title}</h3>

                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold
                  ${
                    r.percentage >= 70
                      ? "bg-green-600/20 text-green-400"
                      : r.percentage >= 40
                      ? "bg-yellow-600/20 text-yellow-400"
                      : "bg-red-600/20 text-red-400"
                  }`}
                >
                  {r.percentage}%
                </span>
              </div>

              <p className="text-gray-400">Technology: {r.quizId.tech}</p>

              <p className="text-sm text-gray-500">
                Created by: {r.quizId.createdBy?.name}
              </p>

              <p className="mt-2 text-lg">
                Score:{" "}
                <span className="font-bold text-green-400">
                  {r.score}/{r.totalQuestions}
                </span>
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Solved on: {new Date(r.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center mt-2.5">
        <button
          onClick={() => navigate("/technology")}
          className="px-10 py-4 rounded-full bg-blue-600 text-white text-lg"
        >
          Try next
        </button>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
    <p className="text-gray-400 text-sm mb-2">{title}</p>
    <p className="text-4xl font-bold">{value}</p>
  </div>
);

export default Profile;
