import React, { useEffect, useState } from "react";

const FiveMinute = () => {
    const [minute, setMinute] = useState(5); // Start with 5 minutes
    const [seconds, setSeconds] = useState(0); // Start with 0 seconds
    const [isRunning, setIsRunning] = useState(false); // Control the timer state

    const startTimer = () => {
        setIsRunning(true); // Start the timer
    };

    const stopTimer = () => {
        setIsRunning(false); // Stop the timer
    };

    const resetTimer = () => {
        setIsRunning(false); // Stop the timer
        setMinute(5); // Reset to 5 minutes
        setSeconds(0); // Reset to 0 seconds
    };

    useEffect(() => {
        if (!isRunning) return; // Do nothing if the timer is not running

        const timer = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (prevSeconds <= 0) {
                    if (minute === 0) {
                        clearInterval(timer); // Stop the timer when time runs out
                        return 0;
                    }
                    setMinute((prevMinute) => prevMinute - 1); // Decrease minutes
                    return 59; // Reset seconds to 59
                }
                return prevSeconds - 1; // Decrease seconds
            });
        }, 1000);

        return () => clearInterval(timer); // Cleanup interval on unmount or dependency change
    }, [isRunning, seconds, minute]);

    return (
        <div className="bg-gray-100 p-10 rounded-md shadow-md flex flex-col gap-10 justify-center items-center">
            <h1 className="text-5xl font-mono font-bold">Five Minute Timer</h1>
            <p className="text-3xl font-bold bg-rose-400 rounded-md p-2">
                <span>0{minute}</span>:<span>{seconds < 10 ? `0${seconds}` : seconds}</span>
            </p>
            <div className="flex gap-5 justify-center items-center w-full">
                <button
                    className="px-4 py-2 text-xl rounded bg-slate-950 text-white hover:bg-slate-800"
                    onClick={stopTimer}
                >
                    Stop
                </button>
                <button
                    className="px-4 py-2 text-xl rounded bg-slate-950 text-white hover:bg-slate-800"
                    onClick={startTimer}
                >
                    Start
                </button>
                <button
                    className="px-4 py-2 text-xl rounded bg-slate-950 text-white hover:bg-slate-800"
                    onClick={resetTimer}
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default FiveMinute;
