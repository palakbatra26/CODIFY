import { useEffect, useState, useContext } from "react";
import { AnswersContext } from "../context/AnswersContext";

const QusComp = ({ qus }) => {
  const {
    setRightAnswers,
    setCheckedAnswer,
    setCurrentSubjectQusAns,
    checkedAnswer,
  } = useContext(AnswersContext);

  const [newAns, setNewAns] = useState(null);

  useEffect(() => {
    setCurrentSubjectQusAns(qus);

    const answers = qus.map((ans) => ({
      id: ans.id,
      ans: ans.answer,
    }));
    setRightAnswers(answers);
  }, [qus]);

  useEffect(() => {
    if (!newAns) return;
    setCheckedAnswer((pre) =>
      pre.some((a) => a.id === newAns.id)
        ? pre.map((a) => (a.id === newAns.id ? newAns : a))
        : [...pre, newAns]
    );
  }, [newAns]);

  return (
    <div className="space-y-10 max-w-3xl mx-auto">
      {qus.map((q, i) => {
        const isAnswered = checkedAnswer.find((a) => a.id === q.id);
        
        return (
          <div
            key={q.id}
            className="group bg-[#112240] border border-cyan-500/10 rounded-[32px] p-8 md:p-12 transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
          >
            {/* Question Header */}
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-12 flex items-center justify-center rounded-2xl bg-cyan-600/10 text-cyan-400 font-black text-xl border border-cyan-500/20">
                {i + 1}
              </span>
              <div className="h-[1px] flex-grow bg-white/5"></div>
            </div>

            <h2 className="text-white text-2xl md:text-3xl font-bold mb-10 leading-tight">
              {q.question}
            </h2>

            {/* Options Grid */}
            <div className="grid grid-cols-1 gap-4">
              {q.options.map((op, index) => {
                const isSelected = isAnswered?.ans === op;
                
                return (
                  <label
                    key={index}
                    className={`relative flex items-center gap-6 p-6 rounded-2xl border transition-all duration-200 cursor-pointer group/opt
                      ${isSelected 
                        ? "bg-cyan-600/10 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.1)]" 
                        : "bg-white/[0.03] border-white/5 hover:bg-white/[0.06] hover:border-white/20"
                      }`}
                  >
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={op}
                      checked={isSelected}
                      onChange={(e) =>
                        setNewAns({ id: q.id, ans: e.target.value })
                      }
                      className="hidden"
                    />
                    
                    {/* CUSTOM RADIO BUTTON */}
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                      ${isSelected ? "border-cyan-500" : "border-gray-600 group-hover/opt:border-gray-400"}`}>
                      {isSelected && <div className="w-3 h-3 rounded-full bg-cyan-500 animate-scale-in" />}
                    </div>

                    <span className={`text-xl font-medium transition-colors
                      ${isSelected ? "text-white" : "text-cyan-100/40 group-hover/opt:text-cyan-100/80"}`}>
                      {op}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QusComp;
