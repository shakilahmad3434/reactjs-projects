import React, { useEffect, useState } from "react";

const MemoryGame = () => {
  const [gridSize, setGridSize] = useState(4);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [won, setWon] = useState(false);
  const [maxMoves, setMaxMoves] = useState(0); // 0 means unlimited
  const [moveCount, setMoveCount] = useState(0);
  const [lost, setLost] = useState(false);

  const handleGridSizeChange = (e) => {
    const size = parseInt(e.target.value);
    if (size >= 2 && size <= 10) setGridSize(size);
  };

  const handleMaxMovesChange = (e) => {
    const moves = parseInt(e.target.value);
    setMaxMoves(moves >= 0 ? moves : 0);
  };

  const initializeGame = () => {
    const totalCards = gridSize * gridSize;
    const pairCount = Math.floor(totalCards / 2);
    const numbers = [...Array(pairCount).keys()].map((n) => n + 1);
    const shuffledCards = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .slice(0, totalCards)
      .map((number, index) => ({ id: index, number }));
    setCards(shuffledCards);
    setSolved([]);
    setWon(false);
    setLost(false);
    setMoveCount(0);
  };

  useEffect(() => {
    initializeGame();
  }, [gridSize]);

  const checkMatch = (secondId) => {
    const [firstId] = flipped;
    if (cards[firstId].number === cards[secondId].number) {
      setSolved([...solved, firstId, secondId]);
      setFlipped([]);
      setDisabled(false);
    } else {
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 1000);
    }
  };

  const handleClick = (id) => {
    if (disabled || won || lost) return;

    if (flipped.length === 0) {
      setFlipped([id]);
      return;
    }

    if (flipped.length === 1) {
      setDisabled(true);
      if (id !== flipped[0]) {
        setFlipped([...flipped, id]);
        checkMatch(id);
      } else {
        setFlipped([]);
        setDisabled(false);
      }
      setMoveCount((prev) => prev + 1);
    }
  };

  const isFlipped = (id) => flipped.includes(id) || solved.includes(id);
  const isSolved = (id) => solved.includes(id);

  useEffect(() => {
    if (solved.length === cards.length && cards.length > 0) {
      setWon(true);
    }
  }, [solved, cards]);

  useEffect(() => {
    if (maxMoves > 0 && moveCount >= maxMoves && !won) {
      setLost(true);
    }
  }, [moveCount, maxMoves, won]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Memory Game</h1>
      {/* Input */}
      <div className="mb-4">
        <label className="mr-2" htmlFor="gridSize">
          Grid Size: (max 10)
        </label>
        <input
          type="number"
          id="gridSize"
          min="2"
          max="10"
          value={gridSize}
          onChange={handleGridSizeChange}
          className="border-2 border-gray-300 rounded px-2 py-1"
        />
        <label className="ml-4 mr-2" htmlFor="maxMove">
          Max Moves (0 for unlimited)
        </label>
        <input
          type="number"
          id="maxMove"
          min="0"
          value={maxMoves}
          onChange={handleMaxMovesChange}
          className="border-2 border-gray-300 rounded px-2 py-1"
        />
      </div>
      {/* Game Board */}
      <div
        className={`grid gap-2 mb-4`}
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0,1fr))`,
          width: `min(100%, ${gridSize * 5.5}rem)`,
        }}
      >
        {cards.map((card) => {
          return (
            <div
              key={card.id}
              onClick={() => handleClick(card.id)}
              className={`aspect-square flex items-center justify-center text-xl font-bold rounded-lg cursor-pointer transition-all duration-300 ${
                isFlipped(card.id)
                  ? isSolved(card.id)
                    ? "bg-green-500 text-white"
                    : "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-400"
              }`}
            >
              {isFlipped(card.id) ? card.number : "?"}
            </div>
          );
        })}
      </div>
      {/* Result */}
      {won && (
        <div className="mt-4 text-4xl font-bold text-green-600 animate-bounce">
          You Win!
        </div>
      )}
      {lost && (
        <div className="mt-4 text-4xl font-bold text-red-600 animate-bounce">
          You Lose!
        </div>
      )}
      {/* Reset / Play Again Btn */}
      <button
        onClick={initializeGame}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
      >
        {won || lost ? "Play Again" : "Reset"}
      </button>
      {/* Move Count */}
      <div className="mt-4 text-xl">
        Moves: {moveCount} {maxMoves > 0 && `/ ${maxMoves}`}
      </div>
    </div>
  );
};

export default MemoryGame;