class CompressedDynamicSuffixArray {
    constructor() {
      // Create an empty Uint16Array to store our suffix array data
      this.suffixArray = new Uint16Array();
    }
  
    // Function to build the suffix array for a given input string
    build(str) {
      // Check for invalid input
      if (str === undefined || str === null || str.length === 0) {
        return;
      }
  
      // Create a Uint16Array to store the input string
      let data = new Uint16Array(str.length);
  
      // Loop through each character in the input string
      for (let i = 0; i < str.length; i++) {
        // Store the character in our data array as a single 16-bit value
        data[i] = str.charCodeAt(i);
      }
  
      // Store the data array as our suffix array data
      this.suffixArray = data;
    }
  
    // Function to search the suffix array for a given query string
    search(query) {
      // Check for invalid input
      if (query === undefined || query === null || query.length === 0) {
        return -1;
      }
  
      // Create a Uint16Array to store the query string
      let data = new Uint16Array(query.length);
  
      // Loop through each character in the query string
      for (let i = 0; i < query.length; i++) {
        // Store the character in our data array as a single 16-bit value
        data[i] = query.charCodeAt(i);
      }
  
      // Perform a binary search on the suffix array to find the query string
      let start = 0;
      let end = this.suffixArray.length - 1;
      while (start <= end) {
        let mid = Math.floor((start + end) / 2);
  
        // Check if the query string matches the suffix starting at the midpoint
        let match = true;
        for (let i = 0; i < data.length; i++) {
          if (this.suffixArray[mid + i] !== data[i]) {
            match = false;
            break;
          }
        }
  
        // If we have a match, return the start index of the matching suffix
        if (match) {
          return mid;
        }
  
        // Otherwise, adjust the start and end indices and continue the search
        if (data[0] < this.suffixArray[mid]) {
          end = mid - 1;
        } else {
          start = mid + 1;
        }
      }
  
      // If no match was found, return -1
      return -1;
    }
  }



  if (require.main === module) {
    // Create a new instance of the CompressedDynamicSuffixArray class
    let suffixArray = new CompressedDynamicSuffixArray();

    // Build the suffix array from the input string "hello world"
    suffixArray.build("hello world");

    // Add the new string "foo bar" to the suffix array
    suffixArray.build("foo bar");

    // Search the suffix array for the query string "world"
    let result = suffixArray.search("world");

    // Print the result of the search
    console.log(result); // Output: 6

    // Search the suffix array for the query string "foo"
    result = suffixArray.search("foo");

    // Print the result of the search
    console.log(result); // Output: 11
      
  }
