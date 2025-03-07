"use client";

import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';

interface StickyNote {
    id: number;
    text: string;
    color: string;
    rotate: number;
  }  

const PledgePage = () => {
  const [name, setName] = useState('');
  const [stickies, setStickies] = useState<StickyNote[]>([]);
  const [newStickyText, setNewStickyText] = useState('');
  const router = useRouter();

  const colors = [
    'bg-yellow-200',
    'bg-pink-200',
    'bg-blue-200',
    'bg-green-200',
    'bg-purple-200',
  ];

  const addSticky = () => {
    if (newStickyText.trim()) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomRotate = Math.random() * 6 - 3; // Random rotation between -3 and 3 degrees
      setStickies([
        ...stickies,
        {
          id: Date.now(),
          text: newStickyText,
          color: randomColor,
          rotate: randomRotate
        }
      ]);
      setNewStickyText('');
    }
  };

  const removeSticky = (id: number) => {
    setStickies(stickies.filter(sticky => sticky.id !== id));
  };

  const handlePrevPage = () => {
    router.push('/EgressRitual');
  };

  const handleNextPage = () => {
    router.push('/PostSurvey');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-8">
      <div className="max-w-4xl mx-auto text-white">
        <Card className="bg-slate-800/50 backdrop-blur-sm border-0">
          <CardContent className="p-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Gender Equality Pledge</h1>

            <div className="mb-8">
              <label className="block mb-2">Your Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6 mb-8">
              <p className="mb-4">I, <span className="font-bold">{name || '[Name]'}</span>, pledge to support and advocate for gender equality in all areas of life. I commit to:</p>
              
              <ol className="list-decimal pl-6 space-y-4">
                <li><strong>Promote Equal Opportunities:</strong> Advocate for and support equal opportunities for all genders in education, employment, and leadership.</li>
                <li><strong>Challenge Stereotypes and Bias:</strong> Actively challenge gender stereotypes, biases, and discrimination in all forms, including in my personal and professional life.</li>
                <li><strong>Support Equal Pay:</strong> Support initiatives and policies that aim to close the gender pay gap and ensure fair compensation for all.</li>
                <li><strong>Create Inclusive Environments:</strong> Foster inclusive and respectful environments where everyone feels valued, heard, and safe.</li>
                <li><strong>Educate and Raise Awareness:</strong> Continuously educate myself and others about gender equality issues and promote awareness in my community.</li>
                <li><strong>Advocate for Policy Changes:</strong> Support and advocate for policies and laws that promote gender equality and protect against gender-based violence and discrimination.</li>
                <li><strong>Mentor and Empower:</strong> Mentor and empower individuals of all genders to achieve their full potential and pursue their goals.</li>
                <li><strong>Respect and Support:</strong> Show respect and support to all individuals regardless of their gender identity, and stand against any form of harassment or violence.</li>
              </ol>

              <p className="mt-4">I understand that achieving gender equality requires ongoing effort and commitment. I will hold myself accountable to these principles and strive to make a positive impact in my community and beyond.</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Leave your signature below!</h2>
              
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newStickyText}
                  onChange={(e) => setNewStickyText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSticky()}
                  className="flex-1 p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Write your signature or message"
                />
                <button
                  onClick={addSticky}
                  className="p-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Plus className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {stickies.map((sticky) => (
                  <div
                    key={sticky.id}
                    className={`relative p-4 rounded-lg shadow-lg ${sticky.color} text-slate-800`}
                    style={{
                      transform: `rotate(${sticky.rotate}deg)`,
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    <button
                      onClick={() => removeSticky(sticky.id)}
                      className="absolute top-2 right-2 text-slate-600 hover:text-slate-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <p className="font-medium">{sticky.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
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

export default PledgePage;