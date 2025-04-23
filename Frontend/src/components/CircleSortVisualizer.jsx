// import { useEffect, useRef, useState } from "react";

// const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

// export default function CircleSortVisualizer({
//   array,
//   setArray,
//   isSorting,
//   setIsSorting,
// }) {
//   const [activeIndex, setActiveIndex] = useState([]);
//   const containerRef = useRef(null);
//   const circleRefs = useRef([]);

//   // Handle Bubble Sort with animation
//   const bubbleSort = async () => {
//     let arr = [...array];
//     setIsSorting(true);

//     for (let i = 0; i < arr.length - 1; i++) {
//       for (let j = 0; j < arr.length - i - 1; j++) {
//         setActiveIndex([j, j + 1]);
//         await sleep(150);

//         if (arr[j] > arr[j + 1]) {
//           // Animate swap
//           animateSwap(j, j + 1);
//           await sleep(900);

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

//   const animateSwap = (i, j) => {
//     const circle1 = circleRefs.current[i];
//     const circle2 = circleRefs.current[j];
//     if (!circle1 || !circle2) return;

//     const rect1 = circle1.getBoundingClientRect();
//     const rect2 = circle2.getBoundingClientRect();

//     const dx = rect2.left - rect1.left;

//     circle1.style.transition = "transform 0.3s";
//     circle2.style.transition = "transform 0.3s";

//     circle1.style.transform = `translateX(${dx}px)`;
//     circle2.style.transform = `translateX(${-dx}px)`;

//     // Reset after animation
//     setTimeout(() => {
//       circle1.style.transition = "";
//       circle2.style.transition = "";
//       circle1.style.transform = "";
//       circle2.style.transform = "";
//     }, 300);
//   };

//   return (
//     <div
//       ref={containerRef}
//       className="flex justify-center flex-wrap gap-4 mt-10 px-4 relative"
//     >
//       {array.map((val, i) => (
//         <div
//           key={i}
//           ref={(el) => (circleRefs.current[i] = el)}
//           className={`w-14 h-14 flex items-center justify-center text-white font-bold text-lg rounded-full transition-all duration-300 ${
//             activeIndex.includes(i) ? "bg-red-500 scale-110" : "bg-blue-600"
//           }`}
//         >
//           {val}
//         </div>
//       ))}
//     </div>
//   );
// }

import { use } from "react";
import { useEffect, useRef, useState } from "react";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export default function CircleSortVisualizer({
  array,
  setArray,
  isSorting,
  setIsSorting,
  algorithm,
}) {
  const [activeIndices, setActiveIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const containerRef = useRef(null);
  const circleRefs = useRef([]);

  // Bubble Sort Algorithm
  const bubbleSort = async () => {
    let arr = [...array];
    setIsSorting(true);
    setSortedIndices([]);

    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setActiveIndices([j, j + 1]);
        await sleep(300);

        if (arr[j] > arr[j + 1]) {
          animateSwap(j, j + 1);
          await sleep(500);

          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
        }

        await sleep(100);
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
        await sleep(300);

        if (arr[j] < arr[minIndex]) {
          minIndex = j;
          setActiveIndices([i, j, minIndex]);
          await sleep(100);
        }
      }

      if (minIndex !== i) {
        animateSwap(i, minIndex);
        await sleep(500);

        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        setArray([...arr]);
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
      await sleep(300);

      while (j > 0 && arr[j] < arr[j - 1]) {
        animateSwap(j, j - 1);
        await sleep(500);

        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
        setArray([...arr]);
        setActiveIndices([j - 1, j]);
        j--;
      }

      setSortedIndices((prev) => [...prev, i]);
    }

    setActiveIndices([]);
    setIsSorting(false);
    setSortedIndices(Array.from({ length: arr.length }, (_, i) => i));
  };
  const mergeSort = async (arr, start, end) => {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);

    await mergeSort(arr, start, mid);
    await mergeSort(arr, mid + 1, end);
    await merge(arr, start, mid, end);
  };

  const merge = async (arr, start, mid, end) => {
    const left = arr.slice(start, mid + 1);
    const right = arr.slice(mid + 1, end + 1);

    let i = 0,
      j = 0,
      k = start;

    while (i < left.length && j < right.length) {
      setActiveIndices([k]);
      await sleep(300);

      if (left[i] <= right[j]) {
        arr[k] = left[i];
        i++;
      } else {
        arr[k] = right[j];
        j++;
      }

      setArray([...arr]);
      k++;
      await sleep(200);
    }

    while (i < left.length) {
      setActiveIndices([k]);
      await sleep(200);
      arr[k] = left[i];
      i++;
      k++;
      setArray([...arr]);
    }

    while (j < right.length) {
      setActiveIndices([k]);
      await sleep(200);
      arr[k] = right[j];
      j++;
      k++;
      setArray([...arr]);
    }

    // Mark as sorted
    const sorted = Array.from({ length: k - start }, (_, idx) => start + idx);
    setSortedIndices((prev) => [...prev, ...sorted]);
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
      case "merge":
        mergeSort(array, 0, array.length - 1);
        break;
      default:
        bubbleSort();
    }
  }, [isSorting, algorithm]);

  const animateSwap = (i, j) => {
    const circle1 = circleRefs.current[i];
    const circle2 = circleRefs.current[j];
    if (!circle1 || !circle2) return;

    const rect1 = circle1.getBoundingClientRect();
    const rect2 = circle2.getBoundingClientRect();

    const dx = rect2.left - rect1.left;

    circle1.style.transition = "transform 0.3s ease-in-out";
    circle2.style.transition = "transform 0.3s ease-in-out";

    circle1.style.transform = `translateX(${dx}px)`;
    circle2.style.transform = `translateX(${-dx}px)`;

    setTimeout(() => {
      circle1.style.transition = "";
      circle2.style.transition = "";
      circle1.style.transform = "";
      circle2.style.transform = "";
    }, 300);
  };

  const getCircleColor = (index) => {
    if (activeIndices.includes(index)) return "bg-red-500";
    if (sortedIndices.includes(index)) return "bg-green-500";
    return "bg-blue-500";
  };

  return (
    <div
      ref={containerRef}
      className="flex justify-center flex-wrap gap-4 mt-10 px-4 relative"
    >
      {array.map((val, i) => (
        <div
          key={i}
          ref={(el) => (circleRefs.current[i] = el)}
          className={`w-14 h-14 flex items-center justify-center text-white font-bold text-lg rounded-full transition-all duration-300 ${getCircleColor(
            i
          )} ${activeIndices.includes(i) ? "scale-110" : ""}`}
        >
          {val}
        </div>
      ))}
    </div>
  );
}
