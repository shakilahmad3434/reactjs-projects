import React, { useState, useEffect } from 'react';
import { Timer, CheckCircle, XCircle } from 'lucide-react';

export default function Quiz({ questions, onFinish }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleNextQuestion();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion]);

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setTimeRemaining(30);
    } else {
      onFinish(score);
    }
  };

  const question = questions[currentQuestion];
  const progressPercentage = (timeRemaining / 30) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="text-lg font-semibold">
            Question {currentQuestion + 1}/{questions.length}
          </div>
          <div className="flex items-center space-x-2 text-indigo-600">
            <Timer className="w-5 h-5" />
            <span>{timeRemaining}s</span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 transition-all duration-1000 ease-linear"
            style={{ 
              width: `${progressPercentage}%`,
              backgroundColor: progressPercentage <= 20 ? '#ef4444' : progressPercentage <= 50 ? '#eab308' : '#4f46e5'
            }}
          />
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-8">{question.question}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            disabled={selectedAnswer !== null}
            className={`p-4 rounded-lg text-left transition-all duration-300 ${
              selectedAnswer === null
                ? 'hover:bg-indigo-50 border-2 border-gray-200 hover:border-indigo-300 hover:shadow-md'
                : selectedAnswer === index
                ? index === question.correctAnswer
                  ? 'bg-green-100 border-2 border-green-500 shadow-md'
                  : 'bg-red-100 border-2 border-red-500 shadow-md'
                : index === question.correctAnswer
                ? 'bg-green-100 border-2 border-green-500 shadow-md'
                : 'border-2 border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{option}</span>
              {selectedAnswer !== null && index === question.correctAnswer && (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
              {selectedAnswer === index && index !== question.correctAnswer && (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
            </div>
          </button>
        ))}
      </div>

      {selectedAnswer !== null && (
        <button
          onClick={handleNextQuestion}
          className="mt-8 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-md hover:shadow-lg"
        >
          {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
        </button>
      )}
    </div>
  );
}