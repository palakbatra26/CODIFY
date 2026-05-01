import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trophy, ArrowLeft, Star, Zap, Award, Crown, User, TrendingUp } from "lucide-react";
import API from "../utils/api";

const Leaderboard = () => {
  const navigate = useNavigate();
  const [globalData, setGlobalData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await API.get("/leaderboard/global");
        setGlobalData(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a192f] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a192f] text-white selection:bg-cyan-500/30 p-10">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-cyan-400 font-bold hover:text-cyan-300 transition mb-12">
            <ArrowLeft size={20} /> BACK
        </button>

        <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-xs font-black tracking-widest mb-6 uppercase">
                <Trophy size={14} className="animate-bounce" />
                <span>Global Rankings</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6">Hall of <span className="text-cyan-500">Mastery.</span></h1>
            <p className="text-cyan-100/40 text-xl font-medium max-w-2xl mx-auto leading-relaxed">The top 1% of engineers who have achieved elite status through consistent logical excellence.</p>
        </div>

        {/* TOP 3 HIGHLIGHTS */}
        {globalData.length >= 3 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 items-end">
                {/* 2nd Place */}
                <TopThreeCard 
                    rank={2} 
                    name={globalData[1]?._id?.name} 
                    score={globalData[1]?.avgScore.toFixed(1)} 
                    attempts={globalData[1]?.attempts}
                    color="text-blue-400"
                    bg="bg-blue-500/10"
                    border="border-blue-500/20"
                />
                {/* 1st Place */}
                <div className="relative order-first md:order-none">
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                        <Crown size={60} className="text-yellow-500 animate-pulse" />
                    </div>
                    <TopThreeCard 
                        rank={1} 
                        name={globalData[0]?._id?.name} 
                        score={globalData[0]?.avgScore.toFixed(1)} 
                        attempts={globalData[0]?.attempts}
                        color="text-cyan-400"
                        bg="bg-cyan-500/10"
                        border="border-cyan-500/30"
                        isLarge={true}
                    />
                </div>
                {/* 3rd Place */}
                <TopThreeCard 
                    rank={3} 
                    name={globalData[2]?._id?.name} 
                    score={globalData[2]?.avgScore.toFixed(1)} 
                    attempts={globalData[2]?.attempts}
                    color="text-purple-400"
                    bg="bg-purple-500/10"
                    border="border-purple-500/20"
                />
            </div>
        )}

        {/* LIST VIEW */}
        <div className="bg-[#112240] rounded-[48px] border border-white/5 overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/5 bg-white/[0.02] flex justify-between items-center px-12">
                <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Rank & Engineer</span>
                <div className="flex gap-20">
                    <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Avg Efficiency</span>
                    <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Attempts</span>
                </div>
            </div>
            
            <div className="divide-y divide-white/5">
                {globalData.slice(3).map((u, i) => (
                    <div key={i} className="flex justify-between items-center p-8 px-12 hover:bg-cyan-500/[0.02] transition-colors group">
                        <div className="flex items-center gap-8">
                            <span className="text-2xl font-black text-gray-700 w-8">{i + 4}</span>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-xl text-cyan-400">
                                    {u._id?.name?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-white group-hover:text-cyan-400 transition-colors">{u._id?.name}</h3>
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Verified Master</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-24 items-center">
                            <div className="text-right">
                                <span className="text-2xl font-black text-cyan-400">{u.avgScore.toFixed(1)}%</span>
                            </div>
                            <div className="text-right w-20">
                                <span className="text-xl font-black text-white/40">{u.attempts}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {globalData.length === 0 && (
            <div className="py-20 text-center bg-[#112240] rounded-[48px] border border-dashed border-white/10">
                <p className="text-cyan-100/40 text-xl font-medium">The leaderboard is currently empty. Be the first to claim elite status!</p>
            </div>
        )}
      </div>
    </div>
  );
};

const TopThreeCard = ({ rank, name, score, attempts, color, bg, border, isLarge = false }) => (
    <div className={`${bg} ${border} rounded-[48px] border p-10 text-center flex flex-col items-center transition-all hover:scale-[1.02] ${isLarge ? 'md:py-20' : ''}`}>
        <div className={`text-6xl font-black mb-4 ${color} opacity-20`}>#{rank}</div>
        <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-6 border border-white/5 shadow-xl">
            <User size={32} className={color} />
        </div>
        <h2 className={`text-2xl font-black mb-2 uppercase tracking-tighter ${isLarge ? 'md:text-4xl' : ''}`}>{name}</h2>
        <div className="flex flex-col gap-1">
            <span className={`text-3xl font-black ${color}`}>{score}%</span>
            <span className="text-xs font-black text-gray-500 uppercase tracking-widest">{attempts} Assessments</span>
        </div>
    </div>
);

export default Leaderboard;
