import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import API from "../utils/api";
import QusComp from "../components/QusComp";
import { AnswersContext } from "../context/AnswersContext";

const Qus = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const { checkedAnswer, setCurrentSubjectQusAns } =
    useContext(AnswersContext);

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await API.get(`/quizzes/${quizId}`);
        setQuiz(res.data.data);
        setCurrentSubjectQusAns(res.data.data.questions);
        setTimeLeft(res.data.data.timer * 60); // Convert minutes to seconds
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) {
      if (timeLeft === 0) submitQuiz();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  const submitQuiz = async () => {
    try {
      const payload = {
        quizId: quiz._id,
        answers: checkedAnswer.map((a) => ({
          questionId: a.id,
          selectedAnswer: a.ans,
        })),
      };

      const res = await API.post("/quizzes/submit", payload);

      navigate("/result", {
        state: { result: res.data.result },
      });
    } catch (err) {
      console.error("Submit failed", err);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  const progress = (checkedAnswer.length / (quiz?.questions?.length || 1)) * 100;

  return (
    <div className="min-h-screen bg-[#0a192f] text-white pb-32">
      {/* STICKY HEADER WITH PROGRESS */}
      <div className="sticky top-0 z-50 bg-[#0a192f]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-cyan-100/40 tracking-widest uppercase">
                        {quiz.tech} QUIZ
                    </span>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-lg border ${timeLeft < 60 ? 'border-red-500/50 bg-red-500/10 text-red-400 animate-pulse' : 'border-cyan-500/20 bg-cyan-500/5 text-cyan-400'}`}>
                        <div className="w-2 h-2 rounded-full bg-current"></div>
                        <span className="font-mono font-black">{formatTime(timeLeft)}</span>
                    </div>
                </div>
                <span className="text-sm font-black text-cyan-400">
                    {checkedAnswer.length} / {quiz.questions.length} ANSWERED
                </span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
      </div>

      {/* QUIZ CONTENT */}
      <div className="max-w-4xl mx-auto px-6 pt-16">
        <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-white">{quiz.title}</h1>
            <p className="text-cyan-100/40 font-medium">Please select the correct answer for each question below.</p>
        </div>

        <QusComp qus={quiz.questions} />

        {/* FINAL SUBMIT SECTION */}
        <div className="mt-20 p-12 rounded-[40px] bg-gradient-to-b from-cyan-600/10 to-transparent border border-cyan-500/10 text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">All Done?</h2>
            <p className="text-cyan-100/40 mb-8 max-w-md mx-auto">Make sure you've answered all questions before submitting your results.</p>
            <button
                onClick={submitQuiz}
                className="w-full max-w-md py-6 rounded-2xl text-2xl font-black bg-cyan-600 text-[#0a192f] hover:bg-cyan-500 transition-all shadow-3xl shadow-cyan-500/20 active:scale-95"
            >
                Submit My Answers
            </button>
        </div>
      </div>
    </div>
  );
};

export default Qus;
