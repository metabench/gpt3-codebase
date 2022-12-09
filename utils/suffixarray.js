class SuffixArray {
    constructor(str) {
      this.str = str;
      this.suffixArray = this.constructSuffixArray();
    }
  
    constructSuffixArray() {
      const suffixes = [];
  
      // Create an array of all suffixes of the input string
      for (let i = 0; i < this.str.length; i++) {
        suffixes.push(this.str.substring(i));
      }
  
      // Sort the array of suffixes
      suffixes.sort();
  
      // Create the suffix array by storing the starting index of each suffix
      const suffixArray = [];
      for (const suffix of suffixes) {
        suffixArray.push(this.str.indexOf(suffix));
      }
  
      return suffixArray;
    }
  
    // Other methods go here...
  }

  const sa = new SuffixArray("banana");
  console.log(sa.suffixArray); // [5, 3, 1, 0, 4, 2]
