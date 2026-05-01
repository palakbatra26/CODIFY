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

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await API.get(`/quizzes/${quizId}`);
        setQuiz(res.data.data);
        setCurrentSubjectQusAns(res.data.data.questions);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchQuiz();
  }, [quizId]);

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
      alert("Submit failed");
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  const progress = (checkedAnswer.length / (quiz?.questions?.length || 1)) * 100;

  return (
    <div className="min-h-screen bg-[#050505] text-white pb-32">
      {/* STICKY HEADER WITH PROGRESS */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-bold text-gray-500 tracking-widest uppercase">
                    {quiz.tech} QUIZ
                </span>
                <span className="text-sm font-black text-blue-500">
                    {checkedAnswer.length} / {quiz.questions.length} ANSWERED
                </span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
      </div>

      {/* QUIZ CONTENT */}
      <div className="max-w-4xl mx-auto px-6 pt-16">
        <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">{quiz.title}</h1>
            <p className="text-gray-500 font-medium">Please select the correct answer for each question below.</p>
        </div>

        <QusComp qus={quiz.questions} />

        {/* FINAL SUBMIT SECTION */}
        <div className="mt-20 p-12 rounded-[40px] bg-gradient-to-b from-blue-600/10 to-transparent border border-blue-500/10 text-center">
            <h2 className="text-3xl font-bold mb-4">All Done?</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">Make sure you've answered all questions before submitting your results.</p>
            <button
                onClick={submitQuiz}
                className="w-full max-w-md py-6 rounded-2xl text-2xl font-black bg-blue-600 hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/20 active:scale-95"
            >
                Submit My Answers
            </button>
        </div>
      </div>
    </div>
  );
};

export default Qus;
