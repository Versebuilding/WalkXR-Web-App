"use client";

import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, ChevronRight } from "lucide-react";
import HumanBody from "../../public/images/Body Figure.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

const IngressRitual = () => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [selectedBodyParts, setSelectedBodyParts] = useState<string[]>([]);
  const router = useRouter();

  interface Exercise {
    id: number;
    name: string;
    duration: number; // duration in seconds
    description: string;
    animation?: string;
    isAvailable: boolean;
  }

  const exercises = [
    {
      id: 1,
      name: "Mindful Breathing",
      duration: 30,
      description: "Deep diaphragmatic breathing with focus on breath awareness",
      animation: "breathing-animation",
      isAvailable: true,
    },
    {
      id: 2,
      name: "Body Scan",
      duration: 0,
      description: "Coming Soon",
      animation: "scan-animation",
      isAvailable: false,
    },
    {
      id: 3,
      name: "Gentle Movement",
      duration: 0,
      description: "Coming Soon",
      animation: "movement-animation",
      isAvailable: false,
    },
  ];

  const bodyParts = [
    { id: "head", label: ["Head & Face"], position: { top: "4.5%", left: "50%" } },
    { id: "leftShoulder", label: ["Left", "Shoulder"], position: { top: "15%", left: "40.5%" } },
    { id: "rightShoulder", label: ["Right", "Shoulder"], position: { top: "15%", left: "60%" } },
    { id: "chest", label: ["Chest"], position: { top: "22%", left: "50%" } },
    { id: "leftArm", label: ["Left Arm"], position: { top: "30%", left: "36.25%" } },
    { id: "rightArm", label: ["Right Arm"], position: { top: "30%", left: "63.85%" } },
    { id: "core", label: ["Core"], position: { top: "34%", left: "50%" } },
    { id: "leftLeg", label: ["Left", "Leg"], position: { top: "60%", left: "44.75%" } },
    { id: "rightLeg", label: ["Right", "Leg"], position: { top: "60%", left: "55.5%" } },
  ];

  const handleExerciseSelect = (exercise: Exercise) => {
    if (exercise.isAvailable) {
      setSelectedExercise(exercise);
      setTimeRemaining(exercise.duration);
      setIsPlaying(false);
      setSelectedBodyParts([]);
    }
  };

  const toggleTimer = () => {
    setIsPlaying(!isPlaying);
  };

  const resetTimer = () => {
    setIsPlaying(false);
    setTimeRemaining(selectedExercise ? selectedExercise.duration : 0);
  };

  const toggleBodyPart = (partId: string) => {
    setSelectedBodyParts((prev) =>
      prev.includes(partId)
        ? prev.filter((id) => id !== partId) // Deselect if already selected
        : [...prev, partId] // Select if not selected
    );
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
  
    if (isPlaying && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsPlaying(false);
    }
  
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, timeRemaining]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleNextExercise = () => {
    if (selectedExercise) {
      const currentIndex = exercises.findIndex((exercise) => exercise.id === selectedExercise.id);
      const nextAvailableIndex = exercises.slice(currentIndex + 1).findIndex(ex => ex.isAvailable);
      const finalIndex = nextAvailableIndex !== -1 
        ? (currentIndex + 1 + nextAvailableIndex) % exercises.length 
        : currentIndex;
      handleExerciseSelect(exercises[finalIndex]);
    }
  };

  const handlePrevExercise = () => {
    if (selectedExercise) {
      const currentIndex = exercises.findIndex((exercise) => exercise.id === selectedExercise.id);
      const prevAvailableIndex = exercises.slice(0, currentIndex).reverse().findIndex(ex => ex.isAvailable);
      const finalIndex = prevAvailableIndex !== -1 
        ? (currentIndex - 1 - prevAvailableIndex + exercises.length) % exercises.length 
        : currentIndex;
      handleExerciseSelect(exercises[finalIndex]);
    }
  };

  const handlePrevPage = () => {
    router.push('/LiminalSpace');
  };

  const handleNextPage = () => {
    router.push('/InteractiveExperience');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Exercise Selection */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              className={`p-6 rounded-xl transition-all duration-300 text-left ${
                exercise.isAvailable
                  ? (selectedExercise?.id === exercise.id
                      ? "bg-blue-500/20 border-2 border-blue-500"
                      : "bg-slate-800/50 hover:bg-slate-700/50 cursor-pointer")
                  : "bg-slate-800/30 text-gray-500 cursor-not-allowed"
              }`}
              onClick={() => handleExerciseSelect(exercise)}
            >
              <h3 className="text-xl font-semibold mb-2">{exercise.name}</h3>
              <p className="text-gray-400 mb-2">{exercise.description}</p>
              <span className="text-sm text-blue-400">
                {exercise.isAvailable 
                  ? `Duration: ${formatTime(exercise.duration)}` 
                  : "Not Available"}
              </span>
            </div>
          ))}
        </div>

        {selectedExercise && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Exercise Visualization */}
            <div className="bg-slate-800/50 rounded-xl p-6">
              <h2 className="text-2xl font-semibold mb-4">{selectedExercise.name}</h2>

              {/* Animation Placeholder */}
              <div className="aspect-square rounded-lg bg-slate-700/50 flex items-center justify-center mb-6">
                <div className={`w-32 h-32 ${selectedExercise.animation}`}>
                  {/* Animation placeholder - would be replaced with actual animation */}
                  {/* <Heart className="w-full h-full text-blue-500 animate-pulse" /> */}
                </div>
              </div>

              {/* Timer Controls */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={resetTimer}
                  className="p-3 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors"
                >
                  <RotateCcw className="w-6 h-6" />
                </button>
                <button
                  onClick={toggleTimer}
                  className="p-4 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors"
                >
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                </button>
                <div className="text-2xl font-mono">{formatTime(timeRemaining)}</div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={handlePrevExercise}
                  disabled={!selectedExercise}
                  className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-600"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextExercise}
                  disabled={!selectedExercise}
                  className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-600"
                >
                  Next
                </button>
              </div>
            </div>

            {/* Body Part Selection */}
            <div className="bg-slate-800/50 rounded-xl p-6">
              <h2 className="text-2xl font-semibold mb-4">Select Affected Areas</h2>

              <div className="relative aspect-[2/3] bg-slate-700/30 rounded-lg mt-4">
                <Image src={HumanBody} alt="Human Body" width={1000} className="h-[550px]" />

                {bodyParts.map((part) => (
                  <button
                    key={part.id}
                    onClick={() => toggleBodyPart(part.id)}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-3 rounded-full transition-all duration-300 ${
                      selectedBodyParts.includes(part.id)
                        ? "bg-blue-500 scale-110"
                        : "bg-slate-600 hover:bg-slate-500"
                    }`}
                    style={{
                      top: part.position.top,
                      left: part.position.left,
                    }}
                  >
                    <span className="absolute top-full left-[50%] transform -translate-x-[50%] mt-[1px] text-sm whitespace-nowrap">
                      {part.label.map((line, index) => (
                        <div key={index}>{line}</div>
                      ))}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Continue Button */}
        {selectedExercise && selectedBodyParts.length > 0 && timeRemaining === 0 && (
          <div className="mt-8 flex justify-center">
            <button className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg">
              Continue
              <ChevronRight className="inline-block ml-2" />
            </button>
          </div>
        )}

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
    </div>
  );
};

export default IngressRitual;