import React, { useEffect, useRef, useState } from "react";

const Slider = () => {
  const [priceGap, setPriceGap] = useState(500);
  const [minRangeInput, setMinRangeInput] = useState(0);
  const [maxRangeInput, setMaxRangeInput] = useState(10000);

  const minSlider = useRef();
  const maxSlider = useRef();
  const range = useRef();

  useEffect(() => {
    // Enforce price gap constraint
    if (maxRangeInput - minRangeInput < priceGap) {
      if (minSlider.current === document.activeElement) {
        setMaxRangeInput(minRangeInput + priceGap);
      } else {
        setMinRangeInput(maxRangeInput - priceGap);
      }
    }

    // Update progress bar position
    if (range.current) {
      range.current.style.left = `${(minRangeInput / 10000) * 100}%`;
      range.current.style.width = `${((maxRangeInput - minRangeInput) / 10000) * 100}%`;
    }
  }, [minRangeInput, maxRangeInput]);

  return (
    <div className="w-full h-screen bg-gray-200 flex justify-center items-center">
      <div className="min-w-xl bg-slate-900 rounded-md shadow p-5">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl text-white text-center mb-3 font-bold">
            Price Range Slider
          </h1>
          <p className="text-center text-md text-gray-200">
            Use slider or enter min and max price
          </p>
        </div>

        {/* Input Fields */}
        <div className="flex justify-center items-center gap-5 text-white mb-10">
          <div className="flex items-center gap-2">
            <label htmlFor="min">Min</label>
            <input
              type="number"
              id="min"
              value={minRangeInput}
              onChange={(e) => {
                const value = Math.min(Number(e.target.value), maxRangeInput - priceGap);
                setMinRangeInput(value);
              }}
              className="w-24 border border-gray-100 rounded-md px-5 py-2 text-xl text-center"
            />
          </div>
          <div>
            <p>To</p>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="max">Max</label>
            <input
              type="number"
              id="max"
              value={maxRangeInput}
              onChange={(e) => {
                const value = Math.max(Number(e.target.value), minRangeInput + priceGap);
                setMaxRangeInput(value);
              }}
              className="w-24 border border-gray-100 rounded-md px-5 py-2 text-xl text-center"
            />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="slider">
          <div
            className="progress"
            ref={range}
          ></div>
        </div>

        {/* Range Inputs */}
        <div className="range-input">
          <input
            type="range"
            className="range-min"
            min="0"
            max="10000"
            step="100"
            ref={minSlider}
            value={minRangeInput}
            onChange={(e) => {
              const value = Math.min(Number(e.target.value), maxRangeInput - priceGap);
              setMinRangeInput(value);
            }}
          />
          <input
            type="range"
            className="range-max"
            min="0"
            max="10000"
            step="100"
            ref={maxSlider}
            value={maxRangeInput}
            onChange={(e) => {
              const value = Math.max(Number(e.target.value), minRangeInput + priceGap);
              setMaxRangeInput(value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Slider;