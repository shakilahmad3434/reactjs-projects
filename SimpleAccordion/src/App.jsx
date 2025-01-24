import React, { useState } from 'react'
const App = () => {

  const [active, setActive] = useState(null);

  const accordionObj = [
    {
      "question": "What is ReactJS?",
      "answer": "ReactJS is an open-source JavaScript library developed by Facebook for building user interfaces, especially for single-page applications. It focuses on creating dynamic and reusable components."
    },
    {
      "question": "What are the main features of ReactJS?",
      "answer": "ReactJS offers features like component-based architecture, Virtual DOM for efficient updates, JSX syntax, one-way data binding, and state management through libraries like Redux and Context API."
    },
    {
      "question": "How does ReactJS differ from other frameworks?",
      "answer": "Unlike full-fledged frameworks, ReactJS focuses solely on the view layer of an application, offering flexibility and requiring integration with other tools for routing and state management."
    },
    {
      "question": "What is the purpose of the Virtual DOM in React?",
      "answer": "The Virtual DOM is a lightweight representation of the real DOM. React uses it to apply updates efficiently by calculating the minimal number of changes required, enhancing performance."
    },
    {
      "question": "Why is ReactJS popular among developers?",
      "answer": "ReactJS is popular due to its simplicity, performance, reusability of components, strong community support, and compatibility with both web and mobile app development via React Native."
    },
    {
      "question": "What are some common challenges with ReactJS?",
      "answer": "Challenges include an initial steep learning curve, rapid changes in its ecosystem, and the need to rely on additional libraries for features like routing and state management."
    },
    {
      "question": "What is JSX in React?",
      "answer": "JSX (JavaScript XML) is a syntax extension in React that allows developers to write HTML-like code directly within JavaScript, making the code more readable and easier to manage."
    },
    {
      "question": "Can ReactJS be used for mobile app development?",
      "answer": "Yes, React Native, built on ReactJS principles, enables developers to create mobile applications for iOS and Android using the same component-based architecture."
    }
  ];

  const handleAccordion = (key) => {
    setActive(active === key ? null : key);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-emerald-500 to-rose-200 flex justify-center items-center p-4">
      <div className="bg-white/90 backdrop-blur p-6 rounded-lg shadow-xl w-full max-w-3xl flex flex-col gap-4">
        {accordionObj.map((item, index) => (
          <div 
            key={index} 
            className="bg-gray-50 rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md"
          >
            <button 
              onClick={() => handleAccordion(index)}
              className="w-full px-6 py-4 flex justify-between items-center group"
            >
              <span className="text-lg font-semibold text-gray-800 text-left">
                {item.question}
              </span>
              <span 
                className={`w-8 h-8 font-bold flex items-center justify-center rounded-full bg-gray-200 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-200 ${
                  active === index ? 'rotate-45 bg-emerald-500 text-white' : ''
                }`}
              >
                +
              </span>
            </button>
            <div 
              className={`transition-all duration-300 ease-in-out ${
                active === index 
                  ? 'max-h-96 opacity-100' 
                  : 'max-h-0 opacity-0'
              }`}
            >
              <p className="px-6 py-4 text-gray-600">
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;