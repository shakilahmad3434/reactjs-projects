import React, { useState } from 'react'
import 'remixicon/fonts/remixicon.css'

const App = () => {
    const [isOpen, setIsOpen] = useState(null)
    const [isInsideOpen, setIsInsideOpen] = useState(null)

    const webDevQA = [
        {
        title: 'HTML',
        topic: [
          {
            question: "What is the purpose of the DOCTYPE declaration in HTML?",
            answer: "The DOCTYPE declaration specifies the HTML version being used and helps browsers render the page correctly. It must be the first line of code in an HTML document. For HTML5, it's simply written as <!DOCTYPE html>."
          },
          {
            question: "What are semantic HTML elements and why are they important?",
            answer: "Semantic HTML elements are tags that provide meaning to the content rather than just presentation (e.g., <header>, <nav>, <article>, <footer>). They're important for accessibility, SEO, and maintaining clear document structure."
          },
          {
            question: "What is the difference between <div> and <span>?",
            answer: "A <div> is a block-level element that starts on a new line and takes up the full width available, while <span> is an inline element that only takes up as much space as necessary and doesn't start on a new line."
          },
          {
            question: "What are data attributes in HTML?",
            answer: "Data attributes (data-*) allow storing custom data within HTML elements. They can be accessed via JavaScript and CSS, making them useful for storing additional information about elements without using non-standard attributes."
          },
          {
            question: "What is the purpose of the alt attribute in images?",
            answer: "The alt attribute provides alternative text for an image if it cannot be displayed. It's essential for accessibility as screen readers use this text to describe images to visually impaired users, and it also helps with SEO."
          }
        ]},
        {
        title: 'CSS',
        topic: [
          {
            question: "What is the CSS Box Model?",
            answer: "The CSS Box Model describes the layout of elements as boxes, consisting of content, padding, border, and margin. It defines how these components work together to create the space around and between elements."
          },
          {
            question: "What's the difference between position: relative and position: absolute?",
            answer: "position: relative positions an element relative to its normal position, while position: absolute positions an element relative to its nearest positioned ancestor (or body if none exists). Absolute positioning removes the element from the normal document flow."
          },
          {
            question: "What are CSS Flexbox and Grid?",
            answer: "Flexbox and Grid are CSS layout models. Flexbox is one-dimensional and ideal for distributing space among items in a container, while Grid is two-dimensional and perfect for creating complex layouts with rows and columns."
          },
          {
            question: "What is CSS specificity?",
            answer: "Specificity is the algorithm used by browsers to determine which CSS rule takes precedence when multiple rules target the same element. It's calculated based on the type of selector used (ID, class, element) and their quantity."
          },
          {
            question: "What are CSS preprocessors?",
            answer: "CSS preprocessors are tools that extend CSS with additional functionality like variables, nesting, mixins, and functions. Popular examples include Sass, Less, and Stylus. They help write more maintainable and organized CSS code."
          }
        ]},

        {
        title: 'JavaScript',
        topic: [
          {
            question: "What is the difference between let, const, and var?",
            answer: "var has function scope and is hoisted, let has block scope and isn't hoisted, and const is also block-scoped but cannot be reassigned after declaration (though object properties can still be modified)."
          },
          {
            question: "What is closure in JavaScript?",
            answer: "A closure is a function that has access to variables in its outer (enclosing) lexical scope, even after the outer function has returned. This enables data privacy and the creation of function factories."
          },
          {
            question: "What is the event loop in JavaScript?",
            answer: "The event loop is JavaScript's mechanism for handling asynchronous operations. It continuously checks the call stack and callback queue, pushing callbacks to the stack when it's empty, enabling non-blocking execution."
          },
          {
            question: "What are Promises and async/await?",
            answer: "Promises are objects representing the eventual completion or failure of an async operation. async/await is syntactic sugar over Promises, making asynchronous code look and behave more like synchronous code, improving readability."
          },
          {
            question: "What is the difference between == and ===?",
            answer: "== performs type coercion before comparison, while === compares both value and type without coercion. === is generally preferred as it prevents unexpected type conversions and provides more predictable results."
          }
        ]},

        {
        title: 'ReactJs',
        topic: [
          {
            question: "What are React Hooks and why were they introduced?",
            answer: "Hooks are functions that allow using state and other React features in functional components. They were introduced to enable reuse of stateful logic without class components, making the code more readable and reducing the complexity of component hierarchies."
          },
          {
            question: "What is the Virtual DOM in React?",
            answer: "The Virtual DOM is a lightweight copy of the actual DOM in memory. React uses it to optimize rendering by first making changes to this virtual copy, then comparing it with the real DOM and updating only the necessary parts, reducing performance overhead."
          },
          {
            question: "What is the difference between state and props?",
            answer: "Props are read-only data passed from parent to child components, while state is mutable data managed within a component. Changes to state trigger re-renders, while props are controlled by the parent component."
          },
          {
            question: "What is the purpose of useEffect?",
            answer: "useEffect is a Hook that handles side effects in functional components. It's used for operations like data fetching, subscriptions, or DOM manipulations. It runs after every render by default but can be configured to run only when specific dependencies change."
          },
          {
            question: "What is React Context and when should you use it?",
            answer: "Context provides a way to pass data through the component tree without manually passing props at every level. It's useful for sharing global data like themes, user authentication, or language preferences, but shouldn't be used for all state management needs."
          }
        ]}
];

    const handleAccordion = (key) => {
        setIsOpen(isOpen === key ? null : key)
        setIsInsideOpen(null)
    }

    const handleNestAccordion = (key) => {
        setIsInsideOpen(isInsideOpen === key ? null : key)
    }

  return (
    <div className='w-full min-h-screen bg-gradient-to-tr from-orange-500 to-rose-800 flex justify-center items-center pt-5 px-4'>
        <div className='backdrop-blur-lg bg-black/20 p-6 rounded-lg shadow-lg border border-white/20 w-full max-w-3xl flex flex-col gap-4'>
            {webDevQA.map((item,index)=>(
                <div key={index} className='flex flex-col gap-5'>
                    <button className='flex justify-between items-center w-full text-zinc-300' onClick={()=>handleAccordion(index)}>
                        <span className='text-xl'>{item.title}</span>
                        <i className="ri-arrow-drop-down-line text-2xl w-8 h-8 bg-slate-950 rounded-full hover:bg-orange-500"></i>
                    </button>
                    <div className={`shadow-md p-2 ${isOpen === index ? 'flex' : 'hidden'} flex-col gap-3`}>
                        {
                            item.topic.map((topic, itemIndex) => (
                                <div key={itemIndex}>
                                    <button className='flex justify-between items-center w-full text-zinc-300' onClick={()=> handleNestAccordion(itemIndex)}>
                                        <span className='text-xl'>{topic.question}</span>
                                        <i className="ri-arrow-drop-down-line text-2xl w-8 h-8 bg-orange-500 rounded-full hover:bg-slate-950"></i>
                                    </button>
                                    <div className={`${isInsideOpen === itemIndex ? 'block' : 'hidden'}`}>
                                        <p className='text-gray-400'>{topic.answer}</p>
                                    </div>
                                </div>
                            ))
                        }
                        
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default App