"use client"

import { useEffect, useState } from 'react';
import { Heart, ThumbsUp} from 'lucide-react';
import { useRouter } from 'next/navigation';

const JournalRitual = () => {
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const [response, setResponse] = useState<string>(''); 
  const [messages, setMessages] = useState<string[]>([]);
  const [reactions, setReactions] = useState<{[key: string]: string[]}>({});
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const prompts = [
    "Do you have any messages for any of the women who have struggled with gender inequality?",
    "Write a letter of encouragement addressed to yourself as a friend giving words of encouragement to overcome a challenge.",
    "Do you have any questions or messages for a woman in your life?",
  ] as const;

  const letters = [
    {
      id: '1',
      content: "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
      author: "Anonymous",
      date: "2024-02-01"
    },
    {
      id: '2',
      content: "You are stronger than you think. Keep pushing forward and never give up! Your resilience is your superpower.",
      author: "Anonymous",
      date: "2024-02-02"
    },
    {
      id: '3',
      content: "Remember, every challenge is an opportunity for growth. Embrace it! The journey might be tough, but you're tougher.",
      author: "Anonymous",
      date: "2024-02-03"
    },
    {
      id: '4',
      content: "To all the women fighting battles in silence - your strength doesn't go unnoticed. You inspire more people than you know.",
      author: "Anonymous",
      date: "2024-02-04"
    },
    {
      id: '5',
      content: "Don't let anyone dim your light. You were born to shine and make a difference in this world.",
      author: "Anonymous",
      date: "2024-02-05"
    },
    {
      id: '6',
      content: "Your voice matters. Your dreams matter. Your existence matters. Never let anyone tell you otherwise.",
      author: "Anonymous",
      date: "2024-02-06"
    },
    {
      id: '7',
      content: "Every small step you take is a step towards a brighter future. Keep going!",
      author: "Anonymous",
      date: "2024-02-07"
    },
    {
      id: '8',
      content: "You are capable of amazing things. Believe in your potential and never stop dreaming.",
      author: "Anonymous",
      date: "2024-02-08"
    },
    {
      id: '9',
      content: "The world is a better place because you are in it. Keep shining!",
      author: "Anonymous",
      date: "2024-02-09"
    },
    {
      id: '10',
      content: "You are not alone in your struggles. There are people who care and support you.",
      author: "Anonymous",
      date: "2024-02-10"
    },
    {
      id: '11',
      content: "Your courage is inspiring. Keep fighting for what you believe in.",
      author: "Anonymous",
      date: "2024-02-11"
    },
    {
      id: '12',
      content: "You are a beacon of hope and strength. Never underestimate your impact.",
      author: "Anonymous",
      date: "2024-02-12"
    }
  ];

  const reactionEmojis = [
    { icon: ThumbsUp, label: 'Like', color: 'text-blue-400' },
    { icon: Heart, label: 'Love', color: 'text-red-400' },
  ];

  const handleReaction = (letterId: string, reactionType: string) => {
    setReactions(prev => {
      const letterReactions = prev[letterId] || [];
      const updatedReactions = letterReactions.includes(reactionType)
        ? letterReactions.filter(r => r !== reactionType)
        : [...letterReactions, reactionType];
      
      return {
        ...prev,
        [letterId]: updatedReactions
      };
    });
  };

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === letters.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  // const prevSlide = () => {
  //   if (isAnimating) return;
  //   setIsAnimating(true);
  //   setCurrentIndex((prevIndex) => 
  //     prevIndex === 0 ? letters.length - 1 : prevIndex - 1
  //   );
  //   setTimeout(() => setIsAnimating(false), 500);
  // };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  type Prompt = typeof prompts[number];

  const handlePromptSelect = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setResponse('');
  };

  const handleResponseSubmit = () => {
    if (response.trim()) {
      setMessages([...messages, response]);
      setResponse('');
    }
  };

  const handlePrevPage = () => {
    router.push('/EgressRitual');
  };

  const handleNextPage = () => {
    router.push('/Pledge');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Journal Ritual</h1>

        {/* Prompt Selection */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <h2 className="text-xl font-semibold mb-4 col-span-full">Leave a message</h2>
          {prompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => handlePromptSelect(prompt)}
              className={`p-4 rounded-lg transition-all duration-300 bg-slate-800 hover:bg-slate-700 shadow-lg ${
                selectedPrompt === prompt ? 'bg-blue-500/20 border-2 border-blue-500' : ''
              }`}
            >
              <div className="p-4 bg-slate-700 rounded-lg shadow-md">
                {prompt}
              </div>
            </button>
          ))}
        </div>

        {/* Response Input */}
        {selectedPrompt && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Your Response</h2>
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              rows={5}
              placeholder="Write your response here..."
              className="w-full p-4 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none"
            />
            <button
              onClick={handleResponseSubmit}
              className="mt-2 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Submit
            </button>
          </div>
        )}

        {/* Messages Display */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Messages from Others</h2>
          <div className="space-y-4">
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div key={index} className="p-4 bg-slate-800 rounded-lg shadow-md flex items-center">
                  <Heart className="inline h-5 w-5 text-red-500 mr-2" />
                  {msg}
                </div>
              ))
            ) : (
              <p className='font-semibold text-lg'>No messages yet.</p>
            )}
          </div>
        </div>

        {/* Wall of Shares */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">Wall of Shares</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
            {letters.map((letter) => (
              <div 
                key={letter.id} 
                className={`bg-slate-800 rounded-xl p-6 shadow-lg ${
                  Math.random() > 0.5 ? 'row-span-2' : 'row-span-1'
                }`}
              >
                <p className="text-lg mb-4">{letter.content}</p>
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>{letter.author}</span>
                  <span>{letter.date}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {reactionEmojis.map(({ icon: Icon, label, color }) => (
                    <button
                      key={label}
                      onClick={() => handleReaction(letter.id, label)}
                      className={`p-2 rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-1 ${
                        reactions[letter.id]?.includes(label) ? 'bg-slate-700' : ''
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${color}`} />
                      <span className="text-xs">
                        {reactions[letter.id]?.filter(r => r === label).length || 0}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
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

export default JournalRitual;