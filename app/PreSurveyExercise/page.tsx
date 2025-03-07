"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Pause, Play, RotateCcw, ChevronRight, Headphones } from 'lucide-react';
import { useRouter } from 'next/navigation';

const PreSurveyBreathingExperience = () => {
  const [stage, setStage] = useState<'headphone' | 'intro' | 'breathing' | 'survey'>('headphone');
  const [timer, setTimer] = useState(30);
  const [isTimerPaused, setIsTimerPaused] = useState(true); // Timer is paused initially
  const audioRef = useRef<HTMLAudioElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Start headphone animation timer
    if (stage === 'headphone') {
      const headphoneTimer = setTimeout(() => {
        setStage('intro');
        // Start playing audio when transitioning to intro, but only if audio is not already playing
        if (audioRef.current && audioRef.current.paused) {
          audioRef.current.volume = 0.5;
          audioRef.current.play().catch((error) => {
            console.error("Error playing audio:", error);
          });
        }
      }, 3000);

      return () => clearTimeout(headphoneTimer);
    }

    // Clean up when the component unmounts
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [stage]);

  // Separate effect for handling the breathing stage timer
  useEffect(() => {
    if (stage === 'breathing' && !isTimerPaused) {
      startBreathingTimer();
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerPaused, stage]); // Add isTimerPaused to dependency

  const startBreathingTimer = () => {
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          setStage('survey');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startBreathingExercise = () => {
    setStage('breathing');
    setIsTimerPaused(true); // Keep the timer paused initially
  };

  const pauseBreathingExercise = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      setIsTimerPaused(true);
    }
  };

  const resumeBreathingExercise = () => {
    setIsTimerPaused(false); // Resume timer
    startBreathingTimer();
  };

  const restartBreathingExercise = () => {
    // Clear existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Reset timer and stage
    setTimer(30);
    setIsTimerPaused(false); // Timer is not paused after restart
    startBreathingTimer();
  };

  const navigateToPreSurvey = () => {
    router.push('/LiminalSpace');
  };

  const handlePrevPage = () => {
    router.push('/PreSurvey');
  };

  const handleNextPage = () => {
    router.push('/LiminalSpace');
  };

  // Updated breathing instructions with line breaks
  const breathingInstructions = {
    headphone: "",
    intro: "Take a moment for a simple mindfulness breathing exercise.",
    breathing: `Breathe In: Slowly inhale through your nose for a count of four.
                Hold: Gently hold your breath for a count of four.
                Breathe Out: Exhale slowly through your mouth for a count of six.
                Repeat: Continue for three to five cycles, focusing on your breath.`,
    survey: "You're now ready to begin the pre-survey."
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex items-center justify-center">
      <audio 
        ref={audioRef} 
        src="/sounds/Pre Survey Sound.mp3" 
        loop 
        preload="metadata"
        autoPlay
      />
      <div className="max-w-3xl w-full mx-auto p-8 text-center">
        <div className="bg-slate-800/50 rounded-2xl p-8 backdrop-blur-sm">
          {stage === 'headphone' && (
            <div className="flex flex-col items-center justify-center">
              <Headphones className="w-24 h-24 text-blue-400 mb-4 animate-pulse" />
              <p className="text-2xl font-bold">Headphones Recommended</p>
            </div>
          )}

          {stage !== 'headphone' && (
            <>
              <h2 className="text-3xl font-bold mb-6">Gender Walk Experience</h2>
              
              <p className="text-xl mb-6 whitespace-pre-line">
                {breathingInstructions[stage]}
              </p>

              {stage === 'intro' && (
                <button 
                  onClick={startBreathingExercise}
                  className="mx-auto flex items-center gap-2 px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Click to begin
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}

              {stage === 'breathing' && (
                <div className="flex flex-col items-center">
                  <div className="text-6xl font-bold text-blue-400 mb-6">
                    {timer}
                  </div>
                  <div className="flex gap-4">
                    {isTimerPaused ? (
                      <button 
                        onClick={resumeBreathingExercise}
                        className="flex items-center gap-2 px-6 py-3 bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-colors"
                      >
                        <Play className="w-5 h-5" />
                        Resume
                      </button>
                    ) : (
                      <button 
                        onClick={pauseBreathingExercise}
                        className="flex items-center gap-2 px-6 py-3 bg-indigo-500 rounded-lg hover:bg-indigo-600 transition-colors"
                      >
                        <Pause className="w-5 h-5" />
                        Pause
                      </button>
                    )}
                    <button 
                      onClick={restartBreathingExercise}
                      className="flex items-center gap-2 px-6 py-3 bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <RotateCcw className="w-5 h-5" />
                      Restart
                    </button>
                    <button 
                      onClick={navigateToPreSurvey}
                      className="flex items-center gap-2 px-6 py-3 bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-colors"
                    >
                      Next
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {stage === 'survey' && (
                <button 
                  onClick={navigateToPreSurvey}
                  className="mx-auto flex items-center gap-2 px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Begin Pre-Survey
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </>
          )}
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

export default PreSurveyBreathingExperience;
