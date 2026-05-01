import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Sparkles, User, Play } from "lucide-react";
import API from "../utils/api";

const TechQuizzes = () => {
  const { tech } = useParams();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await API.get(`/quizzes?tech=${tech}`);
        setQuizzes(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, [tech]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a192f] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a192f] text-white selection:bg-cyan-500/30 p-10 pt-20">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => navigate("/technology")} className="flex items-center gap-2 text-cyan-400 font-bold hover:text-cyan-300 transition mb-12">
            <ArrowLeft size={20} /> ALL TECHNOLOGIES
        </button>

        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-black tracking-widest uppercase mb-4">
                    <Sparkles size={14} /> Available Labs
                </div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">{tech}</h1>
            </div>
            <div className="text-cyan-100/40 font-bold text-right hidden md:block">
                {quizzes.length} ACTIVE MODULES
            </div>
        </div>

        {quizzes.length === 0 ? (
          <div className="py-32 text-center bg-[#112240] rounded-[40px] border border-dashed border-cyan-500/20">
            <h2 className="text-3xl font-bold mb-4">No Quizzes Available</h2>
            <p className="text-cyan-100/40">Our creators are working on new content for {tech}. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quizzes.map((q) => (
              <div
                key={q._id}
                className="group relative bg-[#112240] p-10 rounded-[40px] border border-white/5 hover:border-cyan-500/50 transition-all duration-500 flex flex-col"
              >
                <div className="mb-8">
                    <h2 className="text-3xl font-black mb-2 group-hover:text-cyan-400 transition-colors leading-tight">{q.title}</h2>
                    <div className="flex items-center gap-2 text-cyan-100/30 text-sm font-bold">
                        <User size={14} />
                        <span>By {q.createdBy?.name || "System Elite"}</span>
                    </div>
                </div>

                <div className="mt-auto flex flex-col gap-6">
                    <div className="h-[1px] bg-white/5 w-full"></div>
                    <button
                        onClick={() => navigate(`/quiz/${q._id}`)}
                        className="w-full py-5 rounded-2xl bg-cyan-600 text-[#0a192f] font-black text-lg hover:bg-cyan-500 hover:shadow-xl hover:shadow-cyan-500/20 transition-all active:scale-95 flex items-center justify-center gap-3"
                    >
                        <Play size={20} fill="currentColor" />
                        START MODULE
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

export default TechQuizzes;
