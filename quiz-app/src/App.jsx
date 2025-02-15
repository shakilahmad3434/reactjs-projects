import React, { useState } from 'react';
import { categories, questions } from './data';
import CategorySelection from './components/CategorySelection';
import Quiz from './components/Quiz';
import Results from './components/Results';
import { Brain } from 'lucide-react';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [score, setScore] = useState(null);

  const filteredQuestions = selectedCategory
    ? questions.filter((q) => q.category === selectedCategory)
    : [];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setScore(null);
  };

  const handleQuizFinish = (finalScore) => {
    setScore(finalScore);
  };

  const handleRestart = () => {
    setSelectedCategory(null);
    setScore(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {!selectedCategory ? (
          <>
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <Brain className="w-16 h-16 text-indigo-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Welcome to QuizMaster
              </h1>
              <p className="text-xl text-gray-600">
                Test your knowledge across various categories
              </p>
            </div>
            <CategorySelection
              categories={categories}
              onSelect={handleCategorySelect}
            />
          </>
        ) : score === null ? (
          <Quiz
            questions={filteredQuestions}
            onFinish={handleQuizFinish}
          />
        ) : (
          <Results
            score={score}
            totalQuestions={filteredQuestions.length}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
}

export default App;