// import { useEffect, useState } from "react";

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// export default function BarChart({ array, setArray, isSorting, setIsSorting }) {
//   const [activeIndex, setActiveIndex] = useState([]);

//   const bubbleSort = async () => {
//     let arr = [...array];
//     setIsSorting(true);
//     for (let i = 0; i < arr.length; i++) {
//       for (let j = 0; j < arr.length - i - 1; j++) {
//         setActiveIndex([j, j + 1]);
//         if (arr[j] > arr[j + 1]) {
//           [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
//           setArray([...arr]);
//         }
//         await sleep(100);
//       }
//     }
//     setActiveIndex([]);
//     setIsSorting(false);
//   };

//   useEffect(() => {
//     if (isSorting) bubbleSort();
//   }, [isSorting]);

//   return (
//     <div className="flex items-end justify-center h-[350px] mt-5">
//       {array.map((val, i) => (
//         <div key={i} className="flex flex-col items-center mx-0.5">
//           <div className="text-sm text-gray-700">{val}</div>
//           <div
//             className={`w-5 transition-all duration-200 ${
//               activeIndex.includes(i) ? "bg-red-500" : "bg-blue-500"
//             }`}
//             style={{ height: `${val * 3}px` }}
//           ></div>
//         </div>
//       ))}
//     </div>
//   );
// }
import { useEffect, useState } from "react";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function BarChart({
  array,
  setArray,
  isSorting,
  setIsSorting,
  algorithm,
}) {
  const [activeIndices, setActiveIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);

  // Bubble Sort Algorithm
  const bubbleSort = async () => {
    let arr = [...array];
    setIsSorting(true);
    setSortedIndices([]);

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setActiveIndices([j, j + 1]);
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
        }
        await sleep(300);
      }
      setSortedIndices((prev) => [...prev, arr.length - i - 1]);
    }

    setActiveIndices([]);
    setIsSorting(false);
    setSortedIndices(Array.from({ length: arr.length }, (_, i) => i));
  };

  // Selection Sort Algorithm
  const selectionSort = async () => {
    let arr = [...array];
    setIsSorting(true);
    setSortedIndices([]);

    for (let i = 0; i < arr.length - 1; i++) {
      let minIndex = i;

      for (let j = i + 1; j < arr.length; j++) {
        setActiveIndices([i, j, minIndex]);
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
        await sleep(200);
      }

      if (minIndex !== i) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        setArray([...arr]);
        await sleep(300);
      }

      setSortedIndices((prev) => [...prev, i]);
    }

    setActiveIndices([]);
    setIsSorting(false);
    setSortedIndices(Array.from({ length: arr.length }, (_, i) => i));
  };

  // Insertion Sort Algorithm
  const insertionSort = async () => {
    let arr = [...array];
    setIsSorting(true);
    setSortedIndices([]);

    for (let i = 1; i < arr.length; i++) {
      let j = i;
      setActiveIndices([j, j - 1]);

      while (j > 0 && arr[j] < arr[j - 1]) {
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
        setArray([...arr]);
        setActiveIndices([j - 1, j]);
        j--;
        await sleep(300);
      }

      setSortedIndices((prev) => [...prev, i]);
    }

    setActiveIndices([]);
    setIsSorting(false);
    setSortedIndices(Array.from({ length: arr.length }, (_, i) => i));
  };

  useEffect(() => {
    setSortedIndices([]);
  }, [array]);

  useEffect(() => {
    if (!isSorting) return;

    switch (algorithm) {
      case "bubble":
        bubbleSort();
        break;
      case "selection":
        selectionSort();
        break;
      case "insertion":
        insertionSort();
        break;
      default:
        bubbleSort();
    }
  }, [isSorting, algorithm]);

  const getBarColor = (index) => {
    if (activeIndices.includes(index)) return "bg-red-500";
    if (sortedIndices.includes(index)) return "bg-green-500";
    return "bg-blue-500";
  };

  return (
    <div className="flex items-end justify-center h-[350px] mt-5 gap-1">
      {array.map((val, i) => (
        <div key={i} className="flex flex-col items-center flex-1">
          <div className="text-xs text-gray-700 mb-1">{val}</div>
          <div
            className={`w-full transition-all duration-200 ${getBarColor(i)}`}
            style={{ height: `${val * 3}px` }}
          ></div>
        </div>
      ))}
    </div>
  );
}
