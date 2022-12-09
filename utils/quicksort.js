function quicksortTyped(arr) {
    if (arr.length <= 1) return arr;
  
    // Choose the pivot using the median-of-three strategy
    const pivotIndex = getPivotIndex(arr);
    const pivot = arr[pivotIndex];
  
    // Partition the array in-place using the pivot
    let leftIndex = 0;
    let middleIndex = 0;
    let rightIndex = arr.length - 1;
  
    while (middleIndex <= rightIndex) {
      if (arr[middleIndex] < pivot) {
        const temp = arr[leftIndex];
        arr[leftIndex] = arr[middleIndex];
        arr[middleIndex] = temp;
        leftIndex++;
        middleIndex++;
      } else if (arr[middleIndex] > pivot) {
        const temp = arr[middleIndex];
        arr[middleIndex] = arr[rightIndex];
        arr[rightIndex] = temp;
        rightIndex--;
      } else {
        middleIndex++;
      }
    }
  
    // Recursively sort the left and right sub-arrays in-place
    quicksortTyped(arr.subarray(0, leftIndex));
    quicksortTyped(arr.subarray(rightIndex + 1, arr.length));
  }
  
  function getPivotIndex(arr) {
    const first = arr[0];
    const last = arr[arr.length - 1];
    const middle = arr[Math.floor(arr.length / 2)];
  
    if (first < last && last < middle) return arr.length - 1;
    if (middle < last && last < first) return arr.length - 1;
    if (last < first && first < middle) return 0;
    if (middle < first && first < last) return 0;
    return Math.floor(arr.length / 2);
  }

  
  if (require.main === module) {
    function benchmarkQuicksortTyped() {
        const arr = new Int32Array(1000000);
        for (let i = 0; i < arr.length; i++) {
          arr[i] = Math.floor(Math.random() * 1000000);
        }
      
        const startTime = performance.now();
        quicksortTyped(arr);
        const endTime = performance.now();
      
        console.log(`Quicksort took ${endTime - startTime} milliseconds to sort 1 million elements.`);
      }
      benchmarkQuicksortTyped();
      
  }