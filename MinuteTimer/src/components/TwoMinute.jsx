import React, { useEffect, useState } from 'react'

const TwoMinute = () => {
    const [minutes, setMinutes] = useState(2);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const stopTimer = () => setIsRunning(false)

    const startTimer = () => {
        setIsRunning(true)
    }

    const resetTimer = () => {
        setMinutes(2)
        setSeconds(0)
        setIsRunning(false)
    }

    useEffect(()=>{
        if(!isRunning) return;
        const timerState = setInterval(() => {
            setSeconds((prevSeconds) => {
                if(prevSeconds <=0){
                    if(minutes === 0) {
                        clearInterval(timerState)
                        return 0;
                    }
                    setMinutes((prevMinutes) => prevMinutes - 1)
                    return 59
                }
                return prevSeconds - 1;
            })
        }, 500);

        return () => clearInterval(timerState)
    },[minutes, seconds, isRunning])

  
    return (
        <div className="bg-red-300 p-10 rounded-md shadow-md flex flex-col gap-12 justify-center items-center">
            <h1 className="text-5xl font-sans font-bold uppercase">Two Minute Timer</h1>
            <p className="text-3xl font-bold bg-green-400 rounded-md p-2">
                <span>0{minutes}</span>:<span>{seconds < 10 ? `0${seconds}`: seconds}</span>
            </p>
            <div className="flex gap-5 justify-center items-center w-full">
                <button
                    className="px-4 py-2 text-xl rounded bg-slate-950 text-white hover:bg-purple-200 hover:text-black"
                    onClick={stopTimer}
                >
                    Stop
                </button>
                <button
                    className="px-10 py-2 text-xl rounded bg-slate-950 text-white hover:bg-purple-200 hover:text-black"
                    onClick={startTimer}
                >
                    Start
                </button>
                <button
                    className="px-4 py-2 text-xl rounded bg-slate-950 text-white hover:bg-purple-200 hover:text-black"
                    onClick={resetTimer}
                >
                    Reset
                </button>
            </div>
        </div>
    );

}

export default TwoMinute