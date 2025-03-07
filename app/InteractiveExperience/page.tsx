"use client";

import React, { useState } from 'react';
import { Info, ChevronLeft, PenLine, Save } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Types
interface Hurdle {
  year: string;
  event: string;
}

interface Person {
  id: string;
  name: string;
  description: string;
  hurdles: Hurdle[];
  isAvailable: boolean;
  image?: string;
}

interface UserResponses {
  [key: number]: string;
}

const InteractiveExperience = () => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [showPersonalJourney, setShowPersonalJourney] = useState(false);
  const [userResponses, setUserResponses] = useState<UserResponses>({});
  const [submitted, setSubmitted] = useState(false);
  const [showJourneyButton, setShowJourneyButton] = useState(true);
  const router = useRouter();

  const people: Person[] = [
    {
      id: 'malala',
      name: 'Malala Yousafzai',
      description: 'Pakistani activist for female education and the youngest Nobel Prize laureate',
      image: '/images/Malala_Yousafzai.jpg',
      hurdles: [
        { year: '1997', event: 'Born in Pakistan, a baby girl was not cause for celebration' },
        { year: '2007', event: 'Taliban took control of the town, banned amenities like television and music' },
        { year: '2008', event: 'Malala, and all girls, were banned from going to school' },
        { year: '2010', event: 'Spoke publicly for girls education, was shot by Taliban' },
        { year: '2011', event: 'Months in surgeries and rehabilitation, moved to UK' },
        { year: '2014', event: 'Becomes youngest Nobel laureate, establishes Malala Fund' },
        { year: '2020', event: 'Graduates from Oxford University' }
      ],
      isAvailable: true
    },
    {
      id: 'rbg',
      name: 'Ruth Bader Ginsburg',
      description: 'Supreme Court Justice and champion for gender equality and women\'s rights',
      image: '/images/Ruth-Bader-Ginsburg.webp',
      hurdles: [
        { year: '1933', event: 'Born during Great Depression in Jewish immigrant household' },
        { year: '1950', event: 'Mother passes away from cancer day before graduation' },
        { year: '1954', event: 'Marriage and education pause for family' },
        { year: '1959', event: 'Graduates first in Columbia Law class despite discrimination' },
        { year: '1972', event: 'Struggled for work, becomes Columbia professor' },
        { year: '1980', event: 'Nominated to US Court of Appeals' },
        { year: '1993', event: 'Nominated to US Supreme Court' }
      ],
      isAvailable: true
    },
    {
      id: 'KM',
      name: 'Kamala Harris',
      description: 'Coming Soon',
      hurdles: [],
      isAvailable: false
    },
    {
      id: 'KM',
      name: 'Tarana Burke',
      description: 'Coming Soon',
      hurdles: [],
      isAvailable: false
    },
    {
      id: 'KM',
      name: 'Nadia Murad',
      description: 'Coming Soon',
      hurdles: [],
      isAvailable: false
    },
    {
      id: 'KM',
      name: 'Sheryl Sandberg',
      description: 'Coming Soon',
      hurdles: [],
      isAvailable: false
    },
    {
      id: 'KM',
      name: 'Chimamanda Ngozi Adichie',
      description: 'Coming Soon',
      hurdles: [],
      isAvailable: false
    },
    {
      id: 'KM',
      name: 'Serena Williams',
      description: 'Coming Soon',
      hurdles: [],
      isAvailable: false
    },
    {
      id: 'KM',
      name: 'Ada Lovelace',
      description: 'Coming Soon',
      hurdles: [],
      isAvailable: false
    },
    {
      id: 'KM',
      name: 'Jacinda Ardern',
      description: 'Coming Soon',
      hurdles: [],
      isAvailable: false
    },
    {
      id: 'KM',
      name: 'Dr. Elizabeth Blackwell',
      description: 'Coming Soon',
      hurdles: [],
      isAvailable: false
    },
    {
      id: 'KM',
      name: 'Beyoncé',
      description: 'Coming Soon',
      hurdles: [],
      isAvailable: false
    },
    {
      id: 'KM',
      name: 'Harriet Tubman',
      description: 'Coming Soon',
      hurdles: [],
      isAvailable: false
    },
    {
      id: 'KM',
      name: 'Sojourner Truth',
      description: 'Coming Soon',
      hurdles: [],
      isAvailable: false
    },
    {
      id: 'KM',
      name: 'Frida Kahlo',
      description: 'Coming Soon',
      hurdles: [],
      isAvailable: false
    },
    {
      id: 'KM',
      name: 'Gloria Steinem',
      description: 'Coming Soon',
      hurdles: [],
      isAvailable: false
    },
    {
      id: 'KM',
      name: 'Marie Curie',
      description: 'Coming Soon',
      hurdles: [],
      isAvailable: false
    },
    {
      id: 'KM',
      name: 'Maya Angelou',
      description: 'Coming Soon',
      hurdles: [],
      isAvailable: false
    },
  ];

  const reflectionQuestions = [
    'Were there hurdles you were born into?',
    'Were there hurdles you grew up with?',
    'Were there people who added hurdles?',
    'Were there big events that became hurdles?',
    'Were there actions you took that became hurdles?',
    'Were there actions you took to reduce or surpass hurdles?',
    'Were you ever rewarded for surpassing your hurdles?'
  ];

  const handleResponseChange = (questionIndex: number, value: string) => {
    setUserResponses(prev => ({
      ...prev,
      [questionIndex]: value
    }));
    setSubmitted(false);
  };

  const handleSubmit = async () => {
    try {
      console.log('Submitted responses:', userResponses);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting responses:', error);
    }
  };

  const handlePrevPage = () => {
    router.push('/IngressRitual');
  };

  const handleNextPage = () => {
    router.push('/EgressRitual');
  };

  const handlePersonalJourneyClick = () => {
    setShowJourneyButton(false);
    setShowPersonalJourney(true);
  };

  const handleBackToSelection = () => {
    setSelectedPerson(null);
    setShowPersonalJourney(false);
    setShowJourneyButton(true);
  };

  const MainSelection = () => (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Inspirational Journeys</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {people.map((person) => (
            <div
              key={person.id}
              onClick={() => person.isAvailable && setSelectedPerson(person)}
              className={`p-6 rounded-xl transition-all text-left flex items-center justify-between ${
                person.isAvailable 
                  ? 'bg-slate-800/50 hover:bg-slate-700/50 cursor-pointer' 
                  : 'bg-slate-800/30 text-gray-500 cursor-not-allowed'
              }`}
            >
              <div>
                <h3 className="text-xl font-semibold mb-2">{person.name}</h3>
                <p className="text-gray-400 text-sm">{person.description}</p>
                <div className={`mt-4 text-sm ${person.isAvailable ? 'text-blue-400' : 'text-gray-500'}`}>
                  <Info className="inline-block mr-2 h-4 w-4" />
                  {person.isAvailable ? 'View journey' : 'Coming Soon'}
                </div>
              </div>
              {person.image && (
                <div className="ml-4 flex-shrink-0">
                  <Image
                    src={person.image}
                    alt={person.name}
                    width={100}
                    height={100}
                    className="rounded-xl object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const HistoricalJourney = () => (
    <div className="space-y-8">
      <button
        onClick={handleBackToSelection}
        className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
      >
        <ChevronLeft className="inline-block mr-2" />
        Back to Selection
      </button>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="flex flex-row justify-between items-end">
          <div>
            <CardTitle className="text-2xl">{selectedPerson?.name}'s Journey</CardTitle>
          </div>
          {selectedPerson?.image && (
            <div className="flex-shrink-0">
              <Image
                src={selectedPerson.image}
                alt={selectedPerson.name}
                width={140}
                height={140}
                className="rounded-xl object-cover"
              />
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="relative py-8">
            <div className="absolute left-0 right-0 h-4 bg-blue-500/20 rounded-full" />
            
            <div className="flex flex-col md:flex-row justify-between relative gap-12 md:gap-4">
              {selectedPerson?.hurdles.map((hurdle, index) => (
                <div key={index} className="relative flex flex-col items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center relative z-10">
                    {index + 1}
                  </div>
                  
                  <div className="mt-8 bg-slate-700 p-4 rounded-lg shadow-lg w-full md:w-36">
                    <div className="font-bold text-blue-400">{hurdle.year}</div>
                    <div className="text-sm mt-2">{hurdle.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {showJourneyButton && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Your Journey</h2>
          <button
            onClick={handlePersonalJourneyClick}
            className="w-full p-8 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border-2 border-dashed border-blue-500 transition-all"
          >
            <PenLine className="w-12 h-12 mb-4 mx-auto text-blue-400" />
            <h3 className="text-xl font-semibold mb-2">Document Your Path</h3>
            <p className="text-gray-400">
              Reflect on your personal journey and document the hurdles you've faced and overcome
            </p>
          </button>
        </div>
      )}
    </div>
  );

  const PersonalJourney = () => (
    <div className="space-y-8">
    <button
      onClick={handleBackToSelection}
      className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
    >
      <ChevronLeft className="inline-block mr-2" />
      Back to Selection
    </button>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-2xl">Your Personal Journey</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* <div className="absolute left-0 right-0 h-4 bg-blue-500/20 rounded-full hidden md:block" /> */}
            
            <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
                
              {reflectionQuestions.map((question, index) => (
                <div key={index} className="relative bg-slate-700/50 p-6 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center absolute -top-4 left-6">
                    {index + 1}
                  </div>
                  
                  <div className="mt-4">
                    <label className="text-sm text-gray-300 font-medium block mb-3">
                      {question}
                    </label>
                    <textarea
                      value={userResponses[index] || ''}
                      onChange={(e) => handleResponseChange(index, e.target.value)}
                      className="w-full h-32 bg-slate-600 rounded-lg p-3 text-sm resize-none"
                      placeholder="Share your experience..."
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={submitted}
                className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors ${
                  submitted 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                <Save className="w-4 h-4" />
                {submitted ? 'Responses Saved!' : 'Save Responses'}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center">Interactive Experience</h1>
        
        {!selectedPerson && !showPersonalJourney && <MainSelection />}
        {selectedPerson && !showPersonalJourney && <HistoricalJourney />}
        {showPersonalJourney && <PersonalJourney />}
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


export default InteractiveExperience;