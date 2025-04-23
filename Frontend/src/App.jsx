import { useState } from "react";
import BarChart from "./components/BarChart";
import CircleSortVisualizer from "./components/CircleSortVisualizer";
import { useEffect } from "react";
const generateRandomArray = (len = 10) =>
  Array.from({ length: len }, () => Math.floor(Math.random() * 100) + 1);

function App() {
  const [array, setArray] = useState(generateRandomArray());
  const [isSorting, setIsSorting] = useState(false);
  const [viewType, setViewType] = useState("circle"); // "bar" or "circle"
  const [algorithm, setAlgorithm] = useState("bubble"); // "bubble", "selection", "insertion"
  const [arraySize, setArraySize] = useState(10);

  const handleReset = () => {
    if (!isSorting) setArray(generateRandomArray(arraySize));
  };

  useEffect(() => {
    if (!isSorting) {
      setArray(generateRandomArray(arraySize));
    }
  }, [arraySize, algorithm]);

  // Handle array size change
  const handleArraySizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    if (!isSorting && newSize >= 5 && newSize <= 30) {
      setArraySize(newSize);
      setArray(generateRandomArray(newSize));
    }
  };

  return (
    <div className="text-center p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800">
        Sorting Algorithm Visualizer
      </h1>
      <h2 className="text-lg mt-2 text-gray-600">
        Currently Visualizing:{" "}
        <span className="font-semibold capitalize">{algorithm} sort</span>
      </h2>

      <div className="flex flex-col items-center gap-4 mt-6">
        {/* Controls Section */}
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-2xl">
          {/* Array Size Control */}
          <div className="flex items-center gap-4 mb-4">
            <label className="font-semibold text-gray-700">Array Size:</label>
            <input
              type="range"
              min="5"
              max="30"
              value={arraySize}
              onChange={handleArraySizeChange}
              disabled={isSorting}
              className="flex-1"
            />
            <span className="w-8 text-center font-medium">{arraySize}</span>
          </div>

          {/* Algorithm Selection */}
          <div className="flex items-center gap-4 mb-4">
            <label className="font-semibold text-gray-700">Algorithm:</label>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className="p-2 rounded border border-gray-300 flex-1"
              disabled={isSorting}
            >
              <option value="bubble">Bubble Sort</option>
              <option value="selection">Selection Sort</option>
              <option value="insertion">Insertion Sort</option>
              <option value="merge sort">Merge Sort</option>
            </select>
          </div>

          {/* View Mode Selection */}
          <div className="flex items-center gap-4 mb-4">
            <label className="font-semibold text-gray-700">View Mode:</label>
            <select
              value={viewType}
              onChange={(e) => setViewType(e.target.value)}
              className="p-2 rounded border border-gray-300 flex-1"
              disabled={isSorting}
            >
              <option value="circle">Circle View</option>
              <option value="bar">Bar Chart View</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setIsSorting(true)}
              disabled={isSorting}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:opacity-50 cursor-pointer transition-colors"
            >
              Start Sorting
            </button>
            <button
              onClick={handleReset}
              disabled={isSorting}
              className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg disabled:opacity-50 cursor-pointer transition-colors"
            >
              Reset Array
            </button>
          </div>
        </div>

        {/* Visualization Area */}
        <div className="w-full max-w-4xl bg-white p-4 rounded-lg shadow-md">
          {viewType === "circle" ? (
            <CircleSortVisualizer
              array={array}
              setArray={setArray}
              isSorting={isSorting}
              setIsSorting={setIsSorting}
              algorithm={algorithm}
            />
          ) : (
            <BarChart
              array={array}
              setArray={setArray}
              isSorting={isSorting}
              setIsSorting={setIsSorting}
              algorithm={algorithm}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
