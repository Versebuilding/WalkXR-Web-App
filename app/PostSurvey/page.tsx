"use client";

import { useEffect, useState } from 'react';
import { ArrowRight, ArrowLeft, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Question {
    id: number;
    type: string;
    component?: React.ReactNode;
    options?: string[];
  }
  
// interface Answers { 
//     [key: number]: string;
// }  

const PostSurveyComponent = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
//   const [rating, setRating] = useState(0);
  const router = useRouter();

  // Load and play the background sound
  useEffect(() => {
    const audio = new Audio('/sounds/Post Survey Sound.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audio.play().catch(error => console.log('Audio play failed:', error));

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const questions = [
    {
      id: 1,
      type: 'rating',
      question: "How would you rate your overall experience?",
      component: (
        <div className="flex justify-center gap-2 my-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleAnswer(1, star)}
              className="transition-transform hover:scale-110"
            >
            <Star
            className={`w-8 h-8 ${
                star <= Number(answers[1] || 0) 
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-slate-500'
            }`}
            />
            </button>
          ))}
        </div>
      )
    },
    {
      id: 2,
      type: 'choice',
      question: "How do you feel after completing this experience?",
      options: ["More Relaxed", "More Aware", "More Energized", "More Focused", "No Change"],
    },
    {
      id: 3,
      type: 'choice',
      question: "Which aspect of the experience did you find most valuable?",
      options: ["Breathing Exercise", "Gender Equality Pledge", "Interactive Elements", "Sound Design", "Visual Design"],
    },
    {
      id: 4,
      type: 'choice',
      question: "Would you recommend this experience to others?",
      options: ["Definitely Yes", "Probably Yes", "Not Sure", "Probably Not", "Definitely Not"],
    },
    {
      id: 5,
      type: 'choice',
      question: "How likely are you to apply the insights gained from this experience in your daily life?",
      options: ["Very Likely", "Somewhat Likely", "Neutral", "Somewhat Unlikely", "Very Unlikely"],
    }
  ];

  const handleAnswer = (questionId: number, answer: string | number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      router.push('/');
    }
  };

  const handlePrevPage = () => {
    router.push('/Pledge');
  };


  const renderQuestion = (question: Question) => {
    if (question.type === 'rating') {
      return question.component;
    }
  
    return (
      <div className="space-y-4">
        {question.options?.map((option: string, index: number) => (
          <button
            key={index}
            onClick={() => handleAnswer(question.id, option)}
            className={`w-full p-4 rounded-lg text-left transition-all duration-300 ${
              answers[question.id] === option
                ? 'bg-blue-500 text-white'
                : 'bg-slate-700 hover:bg-slate-600'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    );
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

        <div className="bg-slate-800/50 rounded-2xl p-8 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4 bg-blue-400 inline-block text-transparent bg-clip-text">
              Exit Survey
            </h2>
            <p className="text-slate-300">Thank you for participating! Please take a moment to reflect on your experience.</p>
          </div>

          <h3 className="text-xl mb-6">
            {questions[currentQuestion].question}
          </h3>

          {renderQuestion(questions[currentQuestion])}

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
              disabled={!answers[questions[currentQuestion].id]}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                answers[questions[currentQuestion].id]
                  ? 'bg-blue-500 hover:bg-blue-600'
                  : 'bg-slate-700 text-slate-500 cursor-not-allowed'
              }`}
            >
              {currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="fixed top-2 left-0 right-0 px-8 flex justify-between mt-8">
        <button
          onClick={handlePrevPage}
          className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors font-bold text-xl"
        >
          {'<'}
        </button>
      </div>
    </div>
  );
};

export default PostSurveyComponent;