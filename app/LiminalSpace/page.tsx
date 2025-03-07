"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Circle } from 'lucide-react';
import Image from 'next/image';
import Hallway1 from '../../public/images/Hallway1.jpg';
import Hallway2 from '../../public/images/Hallway2.jpg';

const LiminalSpace = () => {
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [ratings, setRatings] = useState<Record<number, Record<number, number>>>({});
  const [showOverlay, setShowOverlay] = useState(false);
  const router = useRouter();

  const sections = [
    {
      backgroundImage: Hallway1,
      statements: [
        "I feel grounded in my current space",
        "My thoughts are clear and focused",
        "I can sense the weight of my body",
        "I feel connected to my breath",
        "My mind feels open to new experiences"
      ],
      title: "Inner Landscape"
    },
    {
      backgroundImage: Hallway2,
      statements: [
        "I feel a sense of natural connection",
        "My emotions are flowing freely",
        "I am aware of my inner stillness",
        "I sense a deeper intuitive understanding",
        "I feel at peace with my surroundings"
      ],
      title: "Natural Resonance"
    }
  ];

  const [currentStatementIndex, setCurrentStatementIndex] = useState<number>(0);

  const handleRating = (rating: number) => {
    // Store rating for current section and statement
    setRatings((prev) => ({
      ...prev,
      [currentSection]: {
        ...(prev[currentSection] || {}),
        [currentStatementIndex]: rating
      }
    }));

    setShowOverlay(true);

    setTimeout(() => {
      setShowOverlay(false);
      
      // If not the last statement in current section, move to next statement
      if (currentStatementIndex < sections[currentSection].statements.length - 1) {
        setCurrentStatementIndex((prev) => prev + 1);
      } 
      // If last statement in current section, move to next section
      else if (currentSection < sections.length - 1) {
        setCurrentSection((prev) => prev + 1);
        setCurrentStatementIndex(0);
      }
      // If last section, navigate to next page
      else {
        router.push('/IngressRitual');
      }
    }, 1000);
  };

  const handlePrevPage = () => {
    router.push('/PreSurveyExercise');
  };

  const handleNextPage = () => {
    router.push('/IngressRitual');
  };

  const currentSectionData = sections[currentSection];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={currentSectionData.backgroundImage}
          alt={`${currentSectionData.title} Background`}
          fill
          className="object-cover object-center"
        />
      </div>

      {/* Statement Card */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl">
        <div 
          className={`bg-slate-800/90 backdrop-blur-md pb-20 rounded-xl p-8 shadow-xl transition-all duration-500 ${
            showOverlay ? 'opacity-0 transform translate-y-[-20px]' : 'opacity-100'
          }`}
        >
          {/* Progress Indicator */}
          <div className="flex gap-2 justify-center mb-6">
            {currentSectionData.statements.map((_, index) => (
              <div
                key={index}
                className={`h-1 w-8 rounded-full transition-all duration-300 ${
                  index === currentStatementIndex
                    ? 'bg-blue-500'
                    : index < currentStatementIndex
                    ? 'bg-blue-800'
                    : 'bg-slate-700'
                }`}
              />
            ))}
          </div>

          {/* Section Title */}
          <h1 className="text-3xl text-center text-white mb-4 font-bold">
            {currentSectionData.title}
          </h1>

          {/* Current Statement */}
          <h2 className="text-2xl text-center text-white mb-8 font-medium">
            {currentSectionData.statements[currentStatementIndex]}
          </h2>

          {/* Rating Scale */}
          <div className="flex justify-between items-center px-4">
            {[...Array(10)].map((_, index) => (
              <button
                key={index}
                onClick={() => handleRating(index + 1)}
                className="group relative transition-transform duration-200 hover:scale-110"
              >
                <Circle
                  className={`w-8 h-8 transition-all duration-300 ${
                    ratings[currentSection]?.[currentStatementIndex] === index + 1
                      ? 'text-blue-500 fill-blue-500'
                      : 'text-slate-600 hover:text-blue-400'
                  }`}
                />
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {index + 1}
                </span>
              </button>
            ))}
          </div>

          {/* Scale Labels */}
          <div className="flex justify-between mt-8 text-sm text-slate-400">
            <span>Not at all</span>
            <span>Completely</span>
          </div>
        </div>

         {/* Navigation Hints */}
        <div className="absolute bottom-8 font-semibold left-1/2 mt-20 transform -translate-x-1/2 text-center text-white/80">
          <p>Rate each statement on a scale of 1–10</p>
          <p className="text-sm mt-2">
            Statement {currentStatementIndex + 1} of {currentSectionData.statements.length} 
            {' '}(Section {currentSection + 1} of {sections.length})
          </p>
        </div>
      </div>

      {/* Transition Overlay */}
      <div
        className={`absolute inset-0 bg-blue-500/20 backdrop-blur-sm transition-opacity duration-500 pointer-events-none ${
          showOverlay ? 'opacity-100' : 'opacity-0'
        }`}
      />

     

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

export default LiminalSpace;