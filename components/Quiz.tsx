
import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { Check, X, RefreshCcw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { ui } from '../data/uiTranslations';

interface Props {
  questions: QuizQuestion[];
}

const Quiz: React.FC<Props> = ({ questions }) => {
  const { t } = useLanguage();
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswer = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === questions[currentQ].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const reset = () => {
    setCurrentQ(0);
    setScore(0);
    setShowResults(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  if (showResults) {
    return (
      <div className="bg-slate-800 rounded-xl p-8 text-center border border-slate-600">
        <h3 className="text-2xl font-bold text-white mb-4">{t(ui.quiz.missionReport)}</h3>
        <div className="text-6xl font-bold text-emerald-400 mb-4">
          {Math.round((score / questions.length) * 100)}%
        </div>
        <p className="text-slate-300 mb-6">
          {score} / {questions.length} {t(ui.quiz.correct)}
        </p>
        <button 
          onClick={reset}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold inline-flex items-center gap-2 transition"
        >
          <RefreshCcw className="w-4 h-4" /> {t(ui.quiz.retry)}
        </button>
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex justify-between items-center mb-4">
         <h4 className="text-slate-400 text-xs font-bold uppercase tracking-wider">
            Simulation {currentQ + 1}/{questions.length}
         </h4>
         <span className="bg-slate-900 px-2 py-1 rounded text-xs text-slate-300 font-mono">
            {t(ui.quiz.xp)}: {score * 100}
         </span>
      </div>

      <h3 className="text-lg font-bold text-white mb-6">{t(q.question)}</h3>

      <div className="space-y-3">
        {q.options.map((opt, idx) => {
          let btnClass = "w-full text-left p-4 rounded-lg border transition-all text-sm font-medium ";
          
          if (isAnswered) {
            if (idx === q.correctAnswer) {
                btnClass += "bg-emerald-900/50 border-emerald-500 text-emerald-300";
            } else if (idx === selectedOption) {
                btnClass += "bg-red-900/50 border-red-500 text-red-300";
            } else {
                btnClass += "bg-slate-900 border-slate-700 text-slate-500 opacity-50";
            }
          } else {
            btnClass += "bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-700 hover:border-slate-500";
          }

          return (
            <button 
                key={idx} 
                onClick={() => handleAnswer(idx)}
                disabled={isAnswered}
                className={btnClass}
            >
                <div className="flex justify-between items-center">
                    <span>{t(opt)}</span>
                    {isAnswered && idx === q.correctAnswer && <Check className="w-5 h-5" />}
                    {isAnswered && idx === selectedOption && idx !== q.correctAnswer && <X className="w-5 h-5" />}
                </div>
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="mt-6 animate-fade-in">
            <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg mb-4">
                <h5 className="text-blue-300 font-bold text-sm mb-1">{t(ui.quiz.debrief)}:</h5>
                <p className="text-blue-100 text-sm">{t(q.explanation)}</p>
            </div>
            <button 
                onClick={nextQuestion}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-bold transition"
            >
                {currentQ === questions.length - 1 ? t(ui.quiz.finish) : t(ui.quiz.next)}
            </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
