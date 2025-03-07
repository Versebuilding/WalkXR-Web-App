"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import Entrance1 from '../../public/images/Magical-Nature-Doorway-3D-Render-41083196-1.png';
import Entrance2 from '../../public/images/Magical-Nature-Doorway-3D-Render-41083527-1.png';
import Entrance3 from '../../public/images/Magical-Nature-Doorway-3D-Render-41083528-1.png';

type Entrance = {
  id: number;
  name: string;
  description: string;
  questions: string[];
  backgroundImage: string;
  isAvailable: boolean;
};

const EntranceComponent = () => {
  const [selectedEntrance, setSelectedEntrance] = useState<Entrance | null>(null);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const entrances: Entrance[] = [
    {
      id: 1,
      name: "Reflection Path",
      description: "A journey of self-discovery and mindfulness",
      questions: [
        "What emotions are you carrying with you today?",
        "What would you like to let go of?",
        "What would you like to cultivate?"
      ],
      backgroundImage: Entrance1.src,
      isAvailable: true
    },
    {
      id: 2,
      name: "Healing Garden",
      description: "Coming Soon",
      questions: [],
      backgroundImage: Entrance2.src,
      isAvailable: false
    },
    {
      id: 3,
      name: "Community Circle",
      description: "Coming Soon",
      questions: [],
      backgroundImage: Entrance3.src,
      isAvailable: false
    }
  ];

  const handleEnterJourney = () => {
    router.push('/PreSurvey');
  };

  const handlePrevPage = () => {
    router.push('/');
  };

  const handleNextPage = () => {
    router.push('/PreSurvey');
  };

  const handleEntranceClick = (entrance: Entrance) => {
    if (entrance.isAvailable) {
      setSelectedEntrance(entrance);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto py-10 px-8">
        <h1 className="text-3xl font-bold mb-8">Choose Your Entrance</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {entrances.map((entrance) => (
            <div
              key={entrance.id}
              className={`relative h-[32rem] rounded-xl overflow-hidden transition-all duration-300 ${
                entrance.isAvailable 
                  ? 'cursor-pointer hover:scale-105 hover:shadow-xl' 
                  : 'cursor-not-allowed opacity-70'
              } ${
                selectedEntrance?.id === entrance.id
                  ? 'scale-105 shadow-xl'
                  : ''
              } scrollbar-hide`}
              onClick={() => handleEntranceClick(entrance)}
            >
              <img
                src={entrance.backgroundImage}
                alt={entrance.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-8 text-center scrollbar-hide">
                <h2 className="text-2xl font-bold mb-2">{entrance.name}</h2>
                <p className="text-gray-400 mb-4">{entrance.description}</p>
                {selectedEntrance?.id === entrance.id && entrance.isAvailable && (
                  <div className="space-y-4 mt-6 h-full w-full overflow-y-auto scrollbar-hide">
                    {entrance.questions.map((question, index) => (
                      <div key={index} className="space-y-2">
                        <label className="text-sm text-gray-300">{question}</label>
                        <textarea
                          className="w-full p-3 bg-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          rows={2}
                          onChange={(e) =>
                            setAnswers(prev => ({
                              ...prev,
                              [`${entrance.id}-${index}`]: e.target.value
                            }))
                          }
                          value={answers[`${entrance.id}-${index}`] || ''}
                        />
                      </div>
                    ))}
                    <button
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors mt-4"
                      onClick={handleEnterJourney}
                    >
                      Enter Journey
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
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

export default EntranceComponent;