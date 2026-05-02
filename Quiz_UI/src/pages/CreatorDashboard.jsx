import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, LogOut, Trash2, Users, Layout, Zap, Award, Shield } from "lucide-react";
import API from "../utils/api";

const CreatorDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchQuizzes = async () => {
    try {
      const res = await API.get("/quizzes/creator/me");
      setQuizzes(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteQuiz = async (id) => {
    if (!confirm("Are you sure you want to delete this quiz permanently?")) return;
    try {
      await API.delete(`/quizzes/${id}`);
      fetchQuizzes();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const totalAttempts = quizzes.reduce(
    (sum, q) => sum + (q.totalAttempts || 0),
    0
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a192f] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a192f] text-white selection:bg-cyan-500/30">
      {/* BACKGROUND DECORATION */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* HEADER / PROFILE SECTION */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 bg-[#112240] p-8 md:p-12 rounded-[40px] border border-cyan-500/10 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-4xl font-black shadow-xl shadow-cyan-500/20 group-hover:rotate-6 transition-transform">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-[#112240] rounded-full"></div>
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2">{user?.name}</h1>
              <p className="text-cyan-400 font-bold tracking-widest uppercase text-xs mb-4">Official Platform Creator</p>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-bold inline-flex">
                <Users size={16} />
                <span>{user?.email}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <button
                onClick={() => navigate("/admin")}
                className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold hover:bg-cyan-500 hover:text-[#0a192f] transition-all active:scale-95"
            >
                <Shield size={20} />
                ADMIN PANEL
            </button>
            <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 font-bold hover:bg-red-500 hover:text-white transition-all active:scale-95"
            >
                <LogOut size={20} />
                LOGOUT
            </button>
          </div>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
          <CreatorStatCard icon={<Layout className="text-cyan-400" />} label="Quizzes Created" value={quizzes.length} />
          <CreatorStatCard icon={<Zap className="text-yellow-400" />} label="Total Attempts" value={totalAttempts} />
          <CreatorStatCard icon={<Award className="text-purple-400" />} label="Platform Credits" value="1,250" />
        </div>

        {/* ACTIONS & LIST */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
          <div>
            <h2 className="text-4xl font-black tracking-tight mb-2 uppercase">My Content</h2>
            <p className="text-cyan-100/40 font-medium">Manage and monitor your existing quizzes.</p>
          </div>
          <button
            onClick={() => navigate("/creator")}
            className="group px-10 py-5 rounded-full bg-cyan-500 text-[#0a192f] font-black text-xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_rgba(6,182,212,0.3)]"
          >
            <Plus size={24} />
            NEW QUIZ
          </button>
        </div>

        {quizzes.length === 0 ? (
          <div className="py-32 text-center bg-[#112240] rounded-[40px] border border-dashed border-cyan-500/20">
            <Layout size={80} className="text-cyan-500/10 mx-auto mb-8" />
            <h2 className="text-3xl font-bold mb-4">No Quizzes Found</h2>
            <p className="text-cyan-100/40 mb-10 max-w-md mx-auto">Build your first quiz to start engaging with the global developer community.</p>
            <button
              onClick={() => navigate("/creator")}
              className="px-10 py-4 rounded-full border-2 border-cyan-500 text-cyan-500 font-black hover:bg-cyan-500 hover:text-[#0a192f] transition-all"
            >
              CREATE NOW →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quizzes.map((q) => (
              <div
                key={q._id}
                className="group relative bg-[#112240] p-8 rounded-[40px] border border-white/5 hover:border-cyan-500/50 transition-all duration-500"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-black tracking-widest">
                    {q.tech.toUpperCase()}
                  </div>
                  <button
                    onClick={() => deleteQuiz(q._id)}
                    className="p-3 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <h3 className="text-2xl font-black mb-2 group-hover:text-cyan-400 transition-colors">{q.title}</h3>
                <p className="text-cyan-100/40 text-sm font-medium mb-8">Generated by elite creator engine.</p>
                
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                        <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Attempts</span>
                        <span className="text-xl font-black">{q.totalAttempts}</span>
                    </div>
                    <button
                        onClick={() => navigate(`/creator/quiz/${q._id}`)}
                        className="px-6 py-3 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 text-cyan-500 font-bold hover:bg-cyan-500 hover:text-[#0a192f] transition-all text-sm"
                    >
                        VIEW SOLVERS
                    </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const CreatorStatCard = ({ icon, label, value }) => (
  <div className="bg-[#112240] p-8 rounded-[32px] border border-cyan-500/10 flex items-center gap-6 group hover:bg-cyan-500/5 transition-all">
    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div>
      <div className="text-3xl font-black tracking-tighter">{value}</div>
      <div className="text-xs font-black text-gray-500 uppercase tracking-widest">{label}</div>
    </div>
  </div>
);

export default CreatorDashboard;
