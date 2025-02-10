import React from 'react';
import { Share2, Copy, Star, Volume2 } from 'lucide-react';


export function JokeCard({
  joke,
  isLoading,
  onShare,
  onCopy,
  onSpeak,
  showAnswer,
  onToggleAnswer,
}) {
  if (isLoading) {
    return (
      <div className="animate-pulse bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg min-h-[200px] flex items-center justify-center">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      </div>
    );
  }

  if (!joke) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
        <p className="text-gray-500 dark:text-gray-400">Select a category and generate a joke!</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-sm font-medium px-2.5 py-0.5 rounded">
          {joke.category}
        </span>
        <div className="flex items-center space-x-2">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm text-gray-600 dark:text-gray-300">{joke.rating}</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <p className="text-lg font-medium text-gray-800 dark:text-white">{joke.text}</p>
        
        {joke.answer && (
          <div className="mt-4">
            <button
              onClick={onToggleAnswer}
              className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
            >
              {showAnswer ? 'Hide answer' : 'Show answer'}
            </button>
            
            {showAnswer && (
              <p className="mt-2 text-gray-700 dark:text-gray-300 animate-fade-in">
                {joke.answer}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-2 mt-6">
        <button
          onClick={onSpeak}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          title="Text to speech"
        >
          <Volume2 className="w-5 h-5" />
        </button>
        <button
          onClick={onCopy}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          title="Copy to clipboard"
        >
          <Copy className="w-5 h-5" />
        </button>
        <button
          onClick={onShare}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          title="Share"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}