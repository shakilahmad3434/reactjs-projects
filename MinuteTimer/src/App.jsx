import React from 'react'
import TwoMinute from './components/TwoMinute'
import FiveMinute from './components/FiveMinute'

const App = () => {
  return (
    <div className='bg-gray-900 h-screen w-full grid grid-cols-1 md:grid-cols-2 items-center justify-center md:gap-10 px-4 sm:px-8 md:px-16'>
      <div>
      <TwoMinute />
      </div>
      <div>
      <FiveMinute />
      </div>
    </div>
  )
}

export default App