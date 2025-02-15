export const categories = [
    { id: 'tech', name: 'Technology', icon: 'Cpu' },
    { id: 'science', name: 'Science', icon: 'Flask' },
    { id: 'history', name: 'History', icon: 'Landmark' },
  ];
  
  export const questions = [
    {
      id: 1,
      category: 'tech',
      question: 'Which company developed TypeScript?',
      options: ['Google', 'Microsoft', 'Facebook', 'Apple'],
      correctAnswer: 1,
    },
    {
      id: 2,
      category: 'tech',
      question: 'What does CSS stand for?',
      options: [
        'Computer Style Sheets',
        'Creative Style Sheets',
        'Cascading Style Sheets',
        'Colorful Style Sheets',
      ],
      correctAnswer: 2,
    },
    {
      id: 3,
      category: 'science',
      question: 'What is the chemical symbol for gold?',
      options: ['Ag', 'Au', 'Fe', 'Cu'],
      correctAnswer: 1,
    },
    {
      id: 4,
      category: 'science',
      question: 'Which planet is known as the Red Planet?',
      options: ['Venus', 'Jupiter', 'Mars', 'Saturn'],
      correctAnswer: 2,
    },
    {
      id: 5,
      category: 'history',
      question: 'In which year did World War II end?',
      options: ['1943', '1944', '1945', '1946'],
      correctAnswer: 2,
    },
    {
      id: 6,
      category: 'history',
      question: 'Who was the first President of the United States?',
      options: [
        'Thomas Jefferson',
        'John Adams',
        'Benjamin Franklin',
        'George Washington',
      ],
      correctAnswer: 3,
    },
  ];