"use client"

import { useState } from 'react';
import { ChevronRight, Heart, Brain, Stars } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from "next/navigation";

const WelcomeComponent = () => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleNextPage = () => {
    router.push('/Entrance');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Navigation */}
      <nav className="p-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">WalkXR</div>
          <div className="space-x-6">
            {/* <button className="hover:text-blue-400 transition-colors">About</button>
            <button className="hover:text-blue-400 transition-colors">Community</button> */}
            {/* <button className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">
              Sign In
            </button> */}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-20 pb-32">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-6xl font-bold leading-tight">
            Redefine Your Wellness Journey
          </h1>
          <p className="text-xl text-gray-300">
            Experience interactive journeys that blend therapeutic storytelling and community
            in an immersive digital space.
          </p>
          
          {/* Start Journey Button */}
         <Link href="/Entrance"> <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative inline-flex items-center gap-2 px-8 py-4 my-4 bg-blue-500 rounded-full text-lg font-medium hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
          >
            Begin Your Journey
            <ChevronRight className={`transition-transform duration-300 ${
              isHovered ? 'translate-x-1' : ''
            }`} />
          </button> </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
        <Link href="/Entrance"> <div className="p-6 bg-slate-800/50 cursor-pointer rounded-xl backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300">
            <Heart className="w-12 h-12 text-red-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Gender Walk</h3>
            <p className="text-gray-400">
              A journey of purpose, designed to inspire and create change.
            </p>
          </div> </Link>

          <div className="p-6 bg-slate-800/50 cursor-pointer rounded-xl backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300">
            <Brain className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">DEI Walk</h3>
            <p className="text-gray-400">
            Coming Soon
            </p>
          </div>

          <div className="p-6 bg-slate-800/50 cursor-pointer rounded-xl backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300">
            <Stars className="w-12 h-12 text-yellow-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Climate Change Walk</h3>
            <p className="text-gray-400">
            Coming Soon
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div className="p-6 bg-slate-800/50 cursor-pointer rounded-xl backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300">
            <Heart className="w-12 h-12 text-red-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Age Walk</h3>
            <p className="text-gray-400">
            Coming Soon
            </p>
          </div>

          <div className="p-6 bg-slate-800/50 cursor-pointer rounded-xl backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300">
            <Brain className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Joy</h3>
            <p className="text-gray-400">
            Coming Soon
            </p>
          </div>

          <div className="p-6 bg-slate-800/50 cursor-pointer rounded-xl backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300">
            <Stars className="w-12 h-12 text-yellow-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Walk 6</h3>
            <p className="text-gray-400">
              Coming Soon
            </p>
          </div>
        </div>

        <div className="fixed bottom-8 right-8 mt-8">
          <button
            onClick={handleNextPage}
            className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors font-bold text-xl"
          >
            &gt;
          </button>
        </div>
      </main>
    </div>
  );
};

export default WelcomeComponent;