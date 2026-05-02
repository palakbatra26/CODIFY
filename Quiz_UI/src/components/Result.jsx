import { useLocation, useNavigate } from "react-router-dom";
import { Trophy, Download, ArrowRight, CheckCircle, XCircle, Award, Star } from "lucide-react";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";

const Result = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const certificateRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user"));

  if (!state?.result) {
    return (
      <div className="min-h-screen bg-[#0a192f] flex flex-col items-center justify-center text-white">
        <p className="text-2xl font-bold mb-6">No result found</p>
        <button onClick={() => navigate("/technology")} className="px-8 py-3 bg-cyan-600 rounded-xl">Go Back</button>
      </div>
    );
  }

  const { score, totalQuestions, percentage, answers, quizId } = state.result;

  let performance = "Keep Pushing! 😐";
  let colorClass = "text-red-400";
  let glowClass = "shadow-red-500/20";

  if (percentage >= 80) {
    performance = "Elite Status Achieved 🎉";
    colorClass = "text-cyan-400";
    glowClass = "shadow-cyan-500/40";
  } else if (percentage >= 50) {
    performance = "Solid Effort 👍";
    colorClass = "text-blue-400";
    glowClass = "shadow-blue-500/20";
  }

  const downloadCertificate = async () => {
    if (percentage < 50) {
        alert("You need at least 50% to earn a certificate!");
        return;
    }
    const canvas = await html2canvas(certificateRef.current);
    const link = document.createElement("a");
    link.download = `Codify_Certificate_${user.name}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#0a192f] text-white py-20 px-6 selection:bg-cyan-500/30">
      <div className="max-w-4xl mx-auto">
        {/* SUMMARY CARD */}
        <div className={`bg-[#112240] rounded-[48px] p-12 border border-white/5 shadow-2xl ${glowClass} transition-all duration-700 mb-12`}>
            <div className="flex flex-col items-center text-center mb-12">
                <div className="w-24 h-24 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-8">
                    <Trophy size={48} className={colorClass} />
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 uppercase">Assessment Result</h1>
                <p className={`text-2xl font-bold tracking-widest uppercase ${colorClass}`}>{performance}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                <div className="bg-[#0a192f] p-10 rounded-[32px] border border-white/5 text-center group hover:border-cyan-500/30 transition-all">
                    <span className="text-xs font-black text-gray-500 uppercase tracking-widest block mb-2">Accuracy Score</span>
                    <div className="text-6xl font-black text-cyan-400 group-hover:scale-110 transition-transform">
                        {score}<span className="text-2xl text-gray-700">/{totalQuestions}</span>
                    </div>
                </div>
                <div className="bg-[#0a192f] p-10 rounded-[32px] border border-white/5 text-center group hover:border-blue-500/30 transition-all">
                    <span className="text-xs font-black text-gray-500 uppercase tracking-widest block mb-2">Performance Ratio</span>
                    <div className="text-6xl font-black text-blue-400 group-hover:scale-110 transition-transform">
                        {percentage}<span className="text-2xl text-gray-700">%</span>
                    </div>
                </div>
            </div>

            {/* PROGRESS BAR */}
            <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden mb-16">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-1000 ease-out" style={{ width: `${percentage}%` }}></div>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                {percentage >= 50 && (
                    <button 
                        onClick={downloadCertificate}
                        className="flex-1 px-8 py-5 rounded-2xl bg-white text-[#0a192f] font-black text-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-xl"
                    >
                        <Award size={20} /> GET CERTIFICATE
                    </button>
                )}
                <button 
                    onClick={() => navigate('/leaderboard')}
                    className="flex-1 px-8 py-5 rounded-2xl bg-cyan-600 text-[#0a192f] font-black text-lg hover:bg-cyan-500 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-xl shadow-cyan-600/20"
                >
                    <Star size={20} /> LEADERBOARD
                </button>
                <button 
                    onClick={() => navigate('/technology')}
                    className="flex-1 px-8 py-5 rounded-2xl bg-[#0a192f] border border-white/10 font-black text-lg hover:bg-white/5 transition-all flex items-center justify-center gap-3"
                >
                    TRY NEXT <ArrowRight size={20} />
                </button>
            </div>
        </div>

        {/* DETAILED ANALYSIS */}
        <div className="space-y-6">
            <h3 className="text-2xl font-black uppercase tracking-widest text-cyan-100/40 ml-4">Logical Breakdown</h3>
            {answers.map((a, i) => (
                <div key={i} className={`p-8 rounded-[32px] border transition-all duration-500 ${a.isCorrect ? 'bg-[#112240] border-green-500/10' : 'bg-[#112240] border-red-500/10'}`}>
                    <div className="flex justify-between items-start gap-4">
                        <div className="flex-grow">
                            <span className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2 block">Question {i + 1}</span>
                            <p className="text-xl font-bold text-white mb-4 leading-tight">{a.question || `Question ID: ${a.questionId}`}</p>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-500">Your Answer:</span>
                                <span className={`text-sm font-bold ${a.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{a.selectedAnswer}</span>
                            </div>
                            {!a.isCorrect && (
                                <div className="mt-2 flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-500">Correct:</span>
                                    <span className="text-sm font-bold text-cyan-400">{a.correctAnswer}</span>
                                </div>
                            )}
                        </div>
                        <div className={a.isCorrect ? 'text-green-500' : 'text-red-500'}>
                            {a.isCorrect ? <CheckCircle size={32} /> : <XCircle size={32} />}
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* HIDDEN CERTIFICATE TEMPLATE FOR EXPORT */}
      <div className="fixed left-[-9999px] top-[-9999px]">
        <div
            ref={certificateRef}
            className="w-[1200px] h-[850px] bg-[#0a192f] text-[#ffffff] p-20 flex flex-col items-center justify-center border-[20px] border-[#112240] relative"
            style={{ fontFamily: "'Inter', sans-serif" }}
        >
            <div className="absolute top-10 right-10 opacity-10">
                <Award size={300} className="text-[#06b6d4]" />
            </div>
            <div className="absolute bottom-10 left-10 opacity-10">
                <Star size={300} className="text-[#3b82f6]" />
            </div>

            <div className="text-[#22d3ee] font-black tracking-[0.3em] uppercase text-xl mb-10">Certificate of Excellence</div>
            <h1 className="text-8xl font-black tracking-tighter mb-10 uppercase">Mastery Achieved.</h1>
            <p className="text-2xl text-[#9ca3af] mb-12 italic">This document officially recognizes the logical depth and technical proficiency of</p>
            <div className="text-7xl font-black text-[#ffffff] mb-12 border-b-8 border-[#06b6d4] pb-4 px-20">{user.name}</div>
            <p className="text-2xl text-[#9ca3af] mb-16 text-center max-w-3xl leading-relaxed">For successfully completing the engineering assessment in                      <span className="text-[#ffffff] font-bold uppercase">{state.result.tech || "Advanced Technology"}</span> with a performance ratio of <span className="text-[#22d3ee] font-black">{percentage}%</span>.</p>

            <div className="flex justify-between w-full mt-10 px-20">
                <div className="text-center">
                    <div className="w-48 h-[2px] bg-[#374151] mb-4 mx-auto"></div>
                    <div className="text-sm font-black text-[#6b7280] uppercase tracking-widest">Date Issued</div>
                    <div className="font-bold">{new Date().toLocaleDateString()}</div>
                </div>
                <div className="text-center">
                    <div className="text-4xl font-black text-[#22d3ee] mb-2 tracking-tighter">CODIFY.</div>
                    <div className="text-xs font-black text-[#6b7280] uppercase tracking-widest">Elite Learning Engine</div>
                </div>
                <div className="text-center">
                    <div className="w-48 h-[2px] bg-[#374151] mb-4 mx-auto"></div>
                    <div className="text-sm font-black text-[#6b7280] uppercase tracking-widest">Platform Verify</div>
                    <div className="font-bold">#CF-{Math.floor(Math.random()*1000000)}</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
