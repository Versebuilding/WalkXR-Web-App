"use client";

import { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation'; // Import the useRouter hook

const SurveyComponent = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const router = useRouter(); // Initialize the useRouter hook

  const questions = [
    {
      id: 1,
      question: "How would you describe your current emotional state?",
      options: ["Calm", "Anxious", "Excited", "Contemplative", "Uncertain"],
    },
    {
      id: 2,
      question: "What brings you to WalkXR today?",
      options: ["Self-discovery", "Stress relief", "Personal growth", "Curiosity", "Other"],
    },
    {
      id: 3,
      question: "How much time can you dedicate to your journey today?",
      options: ["5-10 minutes", "15-20 minutes", "30+ minutes", "Unsure"],
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
      // Navigate to /Entrance when the last question is completed
      router.push('/Entrance');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto p-8">
        {/* Progress Bar */}
        <div className="w-full bg-slate-700 rounded-full h-2 mb-8">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question Card */}
        <div className="bg-slate-800/50 rounded-2xl p-8 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold mb-6">
            {questions[currentQuestion].question}
          </h2>

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

          {/* Navigation Buttons */}
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
    </div>
  );
};

export default SurveyComponent;
