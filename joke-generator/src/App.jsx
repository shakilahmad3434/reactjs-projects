import React, { useState, useEffect } from 'react'
import { Sun, Moon, RefreshCw } from 'lucide-react'
import { JokeCard } from './components/JokeCard'
import { jokes, categories } from './data/jokes';

function App() {
  const [darkMode, setDarkMode] = useState(() => 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentJoke, setCurrentJoke] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [usedJokes, setUsedJokes] = useState(new Set());

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const generateJoke = () => {
    setIsLoading(true);
    setShowAnswer(false);
    
    // Simulate network delay
    setTimeout(() => {
      const categoryJokes = jokes.filter(joke => 
        selectedCategory ? joke.category === selectedCategory : true
      );
      
      const availableJokes = categoryJokes.filter(joke => !usedJokes.has(joke.id));
      
      if (availableJokes.length === 0) {
        // Reset used jokes if all jokes have been shown
        setUsedJokes(new Set());
        const randomJoke = categoryJokes[Math.floor(Math.random() * categoryJokes.length)];
        setCurrentJoke(randomJoke);
        setUsedJokes(new Set([randomJoke.id]));
      } else {
        const randomJoke = availableJokes[Math.floor(Math.random() * availableJokes.length)];
        setCurrentJoke(randomJoke);
        setUsedJokes(prev => new Set([...prev, randomJoke.id]));
      }
      
      setIsLoading(false);
    }, 500);
  };

  const handleShare = () => {
    if (currentJoke) {
      const text = currentJoke.answer 
        ? `${currentJoke.text}\n\nAnswer: ${currentJoke.answer}`
        : currentJoke.text;
      
      if (navigator.share) {
        navigator.share({
          title: 'Funny Joke',
          text: text,
        }).catch(console.error);
      } else {
        // Fallback to clipboard
        navigator.clipboard.writeText(text);
        alert('Joke copied to clipboard!');
      }
    }
  };

  const handleCopy = () => {
    if (currentJoke) {
      const text = currentJoke.answer 
        ? `${currentJoke.text}\n\nAnswer: ${currentJoke.answer}`
        : currentJoke.text;
      navigator.clipboard.writeText(text);
      alert('Joke copied to clipboard!');
    }
  };

  const handleSpeak = () => {
    if (currentJoke && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        currentJoke.answer 
          ? `${currentJoke.text}... ${currentJoke.answer}`
          : currentJoke.text
      );
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Joke Generator
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md"
          >
            {darkMode ? (
              <Sun className="w-6 h-6 text-yellow-500" />
            ) : (
              <Moon className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <button
              onClick={generateJoke}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md flex items-center gap-2 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              Generate
            </button>
          </div>

          <JokeCard
            joke={currentJoke}
            isLoading={isLoading}
            onShare={handleShare}
            onCopy={handleCopy}
            onSpeak={handleSpeak}
            showAnswer={showAnswer}
            onToggleAnswer={() => setShowAnswer(!showAnswer)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;