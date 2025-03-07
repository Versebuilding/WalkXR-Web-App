"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Pause, Play, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';

const EgressRitual = () => {
  const [isNightMode, setIsNightMode] = useState(true);
  const [timer, setTimer] = useState(30);
  const [isTimerPaused, setIsTimerPaused] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Start playing ambient sound when component mounts
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(error => console.error("Error playing audio:", error));
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    if (!isTimerPaused) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
            }
            setShowMessage(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerPaused]);

  const toggleTimer = () => {
    setIsTimerPaused(!isTimerPaused);
  };

  const restartTimer = () => {
    setTimer(30);
    setIsTimerPaused(false);
    setShowMessage(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

//   const handleExit = () => {
//     router.push('/Exit');
//   };

  const handlePrevPage = () => {
    router.push('/InteractiveExperience');
  };

  const handleNextPage = () => {
    router.push('/JournalRitual');
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${
      isNightMode ? 'bg-gradient-to-b from-slate-900 to-slate-800' : 'bg-gradient-to-b from-blue-300 to-blue-100'
    }`}>
      <audio 
        ref={audioRef} 
        src="/sounds/meditation-ambient.mp3" 
        loop 
        preload="metadata"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className={`backdrop-blur-lg border-0 ${
            isNightMode ? 'bg-slate-800/50 text-white' : 'bg-white/50 text-slate-800'
          }`}>
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Closing Meditation</h1>
                <button
                  onClick={() => setIsNightMode(!isNightMode)}
                  className="p-2 rounded-full hover:bg-slate-700/20"
                >
                  {isNightMode ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                </button>
              </div>

              <div className={`text-center p-8 rounded-xl mb-8 ${
                isNightMode ? 'bg-slate-700/30' : 'bg-white/30'
              }`}>
                <div className="text-6xl font-bold mb-4">
                  {formatTime(timer)}
                </div>

                <div className="flex justify-center gap-4 mb-6">
                  <button
                    onClick={toggleTimer}
                    className={`p-4 rounded-full ${
                      isNightMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-400 hover:bg-blue-500'
                    }`}
                  >
                    {isTimerPaused ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
                  </button>
                  <button
                    onClick={restartTimer}
                    className={`p-4 rounded-full ${
                      isNightMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-400 hover:bg-blue-500'
                    }`}
                  >
                    <RotateCcw className="w-6 h-6" />
                  </button>
                </div>

                <p className="text-lg mb-4">
                  Take these moments to reflect on your experience and ground yourself.
                </p>
                
                {showMessage && (
                  <div className="mt-6 p-4 rounded-lg bg-green-500/20">
                    <p className="text-lg">
                      Your meditation is complete. Feel free to take a few more moments or proceed when you're ready.
                    </p>
                  </div>
                )}
              </div>

              {/* <button
                onClick={handleExit}
                className={`w-full p-4 rounded-lg ${
                  isNightMode 
                    ? 'bg-blue-500 hover:bg-blue-600' 
                    : 'bg-blue-400 hover:bg-blue-500'
                } flex items-center justify-center gap-2`}
              >
                <ChevronLeft className="w-5 h-5" />
                Exit Experience
              </button> */}
            </CardContent>
          </Card>
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

export default EgressRitual;