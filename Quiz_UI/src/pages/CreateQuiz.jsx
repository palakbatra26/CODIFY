import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, CheckCircle, ArrowLeft, Send, Sparkles, Layout } from "lucide-react";
import API from "../utils/api";
import { technologies } from "../data/technologies";

const CreateQuiz = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [tech, setTech] = useState("");
  const [timer, setTimer] = useState(30);
  const [questions, setQuestions] = useState([
    { question: "", options: ["", ""], answer: "" }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index].question = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const addOption = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].options.push("");
    setQuestions(updated);
  };

  const removeOption = (qIndex, oIndex) => {
    const updated = [...questions];
    if (updated[qIndex].options.length > 2) {
      updated[qIndex].options.splice(oIndex, 1);
      setQuestions(updated);
    }
  };

  const handleAnswerChange = (qIndex, value) => {
    const updated = [...questions];
    updated[qIndex].answer = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: "", options: ["", ""], answer: "" }]);
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (!tech) { setError("Please select a technology."); setLoading(false); return; }
    
    try {
      const payload = {
        title,
        tech,
        timer,
        questions: questions.map((q, i) => ({
          id: i + 1,
          question: q.question,
          options: q.options,
          answer: q.answer,
        })),
      };

      await API.post("/quizzes", payload);
      alert("Quiz successfully deployed to the cloud! 🚀");
      navigate("/creator/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Deployment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a192f] text-white selection:bg-cyan-500/30 pb-32">
      {/* HEADER */}
      <div className="sticky top-0 z-[100] bg-[#0a192f]/60 backdrop-blur-2xl border-b border-cyan-500/10 px-6 py-6">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-cyan-400 font-bold hover:text-cyan-300 transition">
                <ArrowLeft size={20} /> BACK
            </button>
            <div className="flex items-center gap-2">
                <Sparkles size={20} className="text-cyan-400 animate-pulse" />
                <span className="text-xl font-black tracking-widest uppercase">Quiz Builder v2.0</span>
            </div>
            <div className="w-20"></div> {/* Spacer */}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-16">
        <div className="mb-16 text-center">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 uppercase">Create <span className="text-cyan-500">Mastery.</span></h1>
            <p className="text-cyan-100/40 text-lg font-medium">Design your custom quiz with our dynamic multi-format builder.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-[32px] mb-12 text-center font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* CORE DETAILS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-[#112240] p-10 rounded-[40px] border border-cyan-500/10 shadow-2xl">
            <div className="space-y-4">
                <label className="text-xs font-black text-cyan-500/50 uppercase tracking-widest ml-1">Quiz Title</label>
                <input
                    type="text"
                    placeholder="Enter a catchy title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full p-5 rounded-2xl bg-[#0a192f] text-white outline-none border border-transparent focus:border-cyan-500 transition font-bold"
                />
            </div>
            <div className="space-y-4">
                <label className="text-xs font-black text-cyan-500/50 uppercase tracking-widest ml-1">Target Technology</label>
                <select
                    value={tech}
                    onChange={(e) => setTech(e.target.value)}
                    required
                    className="w-full p-5 rounded-2xl bg-[#0a192f] text-white outline-none border border-transparent focus:border-cyan-500 transition font-bold appearance-none cursor-pointer"
                >
                    <option value="">Select Tech Stack</option>
                    {technologies.map((t, index) => (
                        <option key={index} value={t.name}>{t.name}</option>
                    ))}
                </select>
            </div>
            <div className="space-y-4">
                <label className="text-xs font-black text-cyan-500/50 uppercase tracking-widest ml-1">Timer (Minutes)</label>
                <input
                    type="number"
                    placeholder="Time limit..."
                    value={timer}
                    onChange={(e) => setTimer(e.target.value)}
                    required
                    min="1"
                    className="w-full p-5 rounded-2xl bg-[#0a192f] text-white outline-none border border-transparent focus:border-cyan-500 transition font-bold"
                />
            </div>
          </div>

          {/* DYNAMIC QUESTIONS */}
          <div className="space-y-10">
            {questions.map((q, qIndex) => (
              <div
                key={qIndex}
                className="group relative bg-[#112240] p-10 rounded-[40px] border border-white/5 hover:border-cyan-500/20 transition-all duration-500"
              >
                <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-4">
                        <span className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-black text-xl">
                            {qIndex + 1}
                        </span>
                        <h3 className="text-2xl font-black uppercase tracking-tight">Question Details</h3>
                    </div>
                    {questions.length > 1 && (
                        <button
                            type="button"
                            onClick={() => removeQuestion(qIndex)}
                            className="p-4 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                        >
                            <Trash2 size={20} />
                        </button>
                    )}
                </div>

                <div className="space-y-8">
                    <input
                        type="text"
                        placeholder="Type your question here..."
                        value={q.question}
                        onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                        required
                        className="w-full p-6 rounded-[24px] bg-[#0a192f] text-white outline-none border border-white/5 focus:border-cyan-500 transition text-xl font-bold"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {q.options.map((op, oIndex) => (
                            <div key={oIndex} className="relative group/opt">
                                <input
                                    type="text"
                                    placeholder={`Option ${oIndex + 1}`}
                                    value={op}
                                    onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                    required
                                    className="w-full p-5 pr-16 rounded-2xl bg-[#0a192f] text-white outline-none border border-white/5 focus:border-cyan-500 transition font-medium"
                                />
                                {q.options.length > 2 && (
                                    <button
                                        type="button"
                                        onClick={() => removeOption(qIndex, oIndex)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl text-gray-600 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addOption(qIndex)}
                            className="p-5 rounded-2xl border-2 border-dashed border-cyan-500/20 text-cyan-500 font-black hover:bg-cyan-500/5 hover:border-cyan-500 transition-all flex items-center justify-center gap-2"
                        >
                            <Plus size={20} /> ADD OPTION
                        </button>
                    </div>

                    <div className="pt-8 border-t border-white/5">
                        <label className="text-xs font-black text-cyan-500/50 uppercase tracking-widest ml-1 block mb-4">Correct Answer</label>
                        <select
                            value={q.answer}
                            onChange={(e) => handleAnswerChange(qIndex, e.target.value)}
                            required
                            className="w-full p-5 rounded-2xl bg-[#0a192f] text-cyan-400 outline-none border border-cyan-500/20 focus:border-cyan-500 transition font-black appearance-none cursor-pointer"
                        >
                            <option value="">Select the right one</option>
                            {q.options.map((op, i) => (
                                <option key={i} value={op}>{op || `Option ${i + 1}`}</option>
                            ))}
                        </select>
                    </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-6 pt-10">
            <button
                type="button"
                onClick={addQuestion}
                className="flex-1 p-8 rounded-[32px] bg-white/5 border border-white/10 text-white font-black text-xl hover:bg-white/10 hover:scale-[1.02] transition-all flex items-center justify-center gap-4"
            >
                <Layout size={24} /> ADD ANOTHER QUESTION
            </button>
            <button
                type="submit"
                disabled={loading}
                className="flex-1 p-8 rounded-[32px] bg-cyan-600 text-[#0a192f] font-black text-2xl hover:bg-cyan-500 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 shadow-3xl shadow-cyan-600/30"
            >
                {loading ? "DEPLOYING..." : <><Send size={24} /> DEPLOY QUIZ</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;
