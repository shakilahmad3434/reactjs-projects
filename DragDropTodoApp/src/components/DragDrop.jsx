import React, { useState } from "react";

const DragDrop = () => {
  const [taskInput, setTaskInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);

  const addTask = () => {
    if (taskInput.trim()) {
      setTodos([...todos, taskInput]);
      setTaskInput("");
    }
  };

  const handleDragStart = (event, task, source) => {
    event.dataTransfer.setData(
      "application/json",
      JSON.stringify({ task, source })
    );
  };

  const handleDrop = (event, destination) => {
    event.preventDefault();
    const { task, source } = JSON.parse(event.dataTransfer.getData("application/json"));

    if (source === "todos") setTodos(todos.filter((t) => t !== task));
    if (source === "inProgress") setInProgress(inProgress.filter((t) => t !== task));
    if (source === "done") setDone(done.filter((t) => t !== task));

    if (destination === "inProgress") setInProgress([...inProgress, task]);
    if (destination === "done") setDone([...done, task]);
    if (destination === "todos") setTodos([...todos, task]);
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // Necessary to allow dropping
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 to-rose-300 h-screen w-full flex flex-col justify-center items-center gap-10">
        <h1 className="text-5xl font-bold text-white">Drag and Drop Todo List</h1>
      <div className="bg-slate-200 rounded-lg p-8 shadow-md xl:min-w-2xl flex flex-col gap-5">
        <div className="flex mb-10">
          <input
            type="text"
            value={taskInput}
            className="w-2/3 border border-gray-500 rounded-l-lg"
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <button
            className="bg-rose-400 text-white font-semibold cursor-pointer py-2 px-4 rounded-r-lg w-2/6 hover:scale-105 transition"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>

        {
            todos.length > 0
            ?
        <div className="flex justify-between gap-5">
          {/* TODO Section */}
          <div
            className="border border-white rounded-md p-3"
            onDrop={(event) => handleDrop(event, "todos")}
            onDragOver={handleDragOver}
          >
            <h2 className="text-2xl font-bold mb-3">To-Do</h2>
            <ul className="w-full">
              {todos.map((todo, index) => (
                <li
                  className="p-2 bg-gray-400 rounded-sm text-xl mb-2 cursor-pointer"
                  draggable
                  onDragStart={(event) => handleDragStart(event, todo, "todos")}
                  key={index}
                >
                  {todo}
                </li>
              ))}
            </ul>
          </div>

          {/* In Progress Section */}
          <div
            className="border border-white rounded-md p-3"
            onDrop={(event) => handleDrop(event, "inProgress")}
            onDragOver={handleDragOver}
          >
            <h2 className="text-2xl font-bold mb-3">In Progress</h2>
            <ul className="w-full">
              {inProgress.map((task, index) => (
                <li
                  className="p-2 bg-yellow-400 rounded-sm text-xl mb-2 cursor-pointer"
                  draggable
                  onDragStart={(event) =>
                    handleDragStart(event, task, "inProgress")
                  }
                  key={index}
                >
                  {task}
                </li>
              ))}
            </ul>
          </div>

          {/* Done Section */}
          <div
            className="border border-white rounded-md p-3"
            onDrop={(event) => handleDrop(event, "done")}
            onDragOver={handleDragOver}
          >
            <h2 className="text-2xl font-bold mb-3 uppercase">Done</h2>
            <ul className="w-full">
              {done.map((task, index) => (
                <li
                  className="p-2 bg-green-400 rounded-sm text-xl mb-2 cursor-pointer"
                  draggable
                  onDragStart={(event) => handleDragStart(event, task, "done")}
                  key={index}
                >
                  {task}
                </li>
              ))}
            </ul>
          </div>
        </div>
         :
         <p className="text-center font-semibold text-xl">Todo Item Not Found</p>
        }
      </div>
    </div>
  );
};

export default DragDrop;
