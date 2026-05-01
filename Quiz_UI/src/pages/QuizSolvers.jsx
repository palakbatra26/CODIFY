import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Users, Trophy, Mail, Calendar } from "lucide-react";
import API from "../utils/api";

const QuizSolvers = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [solvers, setSolvers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSolvers = async () => {
      try {
        const res = await API.get(`/results/quiz/${quizId}`);
        setSolvers(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSolvers();
  }, [quizId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a192f] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a192f] text-white selection:bg-cyan-500/30 p-10">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-cyan-400 font-bold hover:text-cyan-300 transition mb-12">
            <ArrowLeft size={20} /> BACK TO DASHBOARD
        </button>

        <div className="flex items-center gap-4 mb-12">
            <div className="w-16 h-16 rounded-2xl bg-cyan-600/10 border border-cyan-500/20 flex items-center justify-center">
                <Users className="text-cyan-400" size={32} />
            </div>
            <div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">Quiz Solvers</h1>
                <p className="text-cyan-100/40 font-medium">Tracking engagement and performance analytics.</p>
            </div>
        </div>

        {solvers.length === 0 ? (
          <div className="py-20 text-center bg-[#112240] rounded-[40px] border border-white/5">
            <Users size={60} className="text-white/5 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-2">No attempts yet</h2>
            <p className="text-cyan-100/40">This quiz hasn't been solved by anyone in the community yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {solvers.map((r) => (
              <div
                key={r._id}
                className="group bg-[#112240] p-8 rounded-[32px] border border-white/5 hover:border-cyan-500/30 transition-all flex flex-col md:flex-row justify-between items-center gap-8"
              >
                <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-xl font-black shadow-lg shadow-cyan-500/20">
                        {r.userId?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-white group-hover:text-cyan-400 transition-colors">
                            {r.userId?.name}
                        </h2>
                        <div className="flex items-center gap-4 mt-1 text-cyan-100/40 text-sm">
                            <span className="flex items-center gap-1"><Mail size={14} /> {r.userId?.email}</span>
                            <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(r.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-8 bg-[#0a192f] p-6 rounded-2xl border border-white/5">
                    <div className="text-center">
                        <div className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Score</div>
                        <div className="text-2xl font-black text-cyan-400">{r.score}<span className="text-sm text-gray-600">/{r.totalQuestions}</span></div>
                    </div>
                    <div className="h-8 w-[1px] bg-white/10"></div>
                    <div className="text-center">
                        <div className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Performance</div>
                        <div className="text-2xl font-black text-white">{r.percentage}%</div>
                    </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizSolvers;
