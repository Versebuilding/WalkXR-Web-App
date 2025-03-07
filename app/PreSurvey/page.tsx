"use client";

import { useEffect, useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const PreSurveyComponent = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const router = useRouter();

  // Load and play the background sound
  useEffect(() => {
    const audio = new Audio('/sounds/Pre Survey Sound.mp3');
    audio.loop = true; // Optional: make the sound loop
    audio.play();

    // Cleanup when component unmounts
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const questions = [
    {
      id: 1,
      question: "How would you rate your current stress level?",
      options: ["Very Low", "Low", "Moderate", "High", "Very High"],
    },
    {
      id: 2,
      question: "What is your primary goal for this mindfulness session?",
      options: ["Relaxation", "Stress Reduction", "Self-Reflection", "Emotional Balance", "Personal Growth"],
    },
    {
      id: 3,
      question: "How comfortable are you with guided mindfulness experiences?",
      options: ["First Time", "Somewhat Experienced", "Very Experienced", "Regular Practitioner"],
    },
  ];

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers((prev: Record<number, string>) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      router.push('/PreSurveyExercise');
    }
  };

  const handlePrevPage = () => {
    router.push('/Entrance');
  };

  const handleNextPage = () => {
    router.push('/PreSurveyExercise');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto p-8">
        <div className="w-full bg-slate-700 rounded-full h-2 mb-8">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>

        <div className="bg-slate-800/50 rounded-2xl p-8 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold mb-6">Pre-Survey</h2>

          <h3 className="text-xl mb-4">
            {questions[currentQuestion].question}
          </h3>

          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(questions[currentQuestion].id, option)}
                className={`w-full p-4 rounded-lg text-left transition-all duration-300 ${
                  answers[questions[currentQuestion].id] === option
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-700 hover:bg-slate-600'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentQuestion === 0
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  : 'bg-slate-700 hover:bg-slate-600'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
            >
              {currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="fixed top-2 left-0 right-0 px-8 flex justify-between mt-8">
      <button
            onClick={handlePrevPage}
            className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors font-bold text-xl"
          >
            {'<'}
          </button>
      </div>
      <div className="fixed bottom-8 left-0 right-4 px-8 flex justify-end mt-8">
          
          <button
            onClick={handleNextPage}
            className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors font-bold text-xl"
          >
            {'>'}
          </button>
      </div>
    </div>
  );
};

export default PreSurveyComponent;
