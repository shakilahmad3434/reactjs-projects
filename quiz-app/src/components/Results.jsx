import React from 'react';
import { Trophy, RotateCcw } from 'lucide-react';

export default function Results({ score, totalQuestions, onRestart }) {
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
      <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
      <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
      <div className="text-6xl font-bold text-indigo-600 mb-4">{percentage}%</div>
      <p className="text-xl mb-8">
        You got {score} out of {totalQuestions} questions correct
      </p>
      <button
        onClick={onRestart}
        className="flex items-center justify-center space-x-2 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
      >
        <RotateCcw className="w-5 h-5" />
        <span>Try Again</span>
      </button>
    </div>
  );
}