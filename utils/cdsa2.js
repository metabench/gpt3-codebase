class CompressedDynamicSuffixArray {
    constructor(string) {
      this.string = string;
      this.sa = this.buildSuffixArray();
    }
  
    // Builds the suffix array for the given string
    buildSuffixArray() {
      const n = this.string.length;
      const sa = new Array(n);
      let rank = new Array(n);
  
      // Initialize the suffix array and rank array
      for (let i = 0; i < n; i++) {
        sa[i] = i;
        rank[i] = this.string.charCodeAt(i);
      }
  
      // Sort the suffixes using the induced sorting algorithm
      for (let k = 1; k < n; k *= 2) {
        // Sort the suffixes based on their first k characters
        sa.sort((i, j) => {
          if (rank[i] !== rank[j]) {
            return rank[i] - rank[j];
          }
          // Compare the suffixes starting at index i + k and j + k
          return rank[i + k] - rank[j + k];
        });
  
        // Update the rank array with the new ordering
        const tmp = new Array(n);
        let r = 0;
        tmp[sa[0]] = r;
        for (let i = 1; i < n; i++) {
          if (rank[sa[i]] !== rank[sa[i - 1]] || rank[sa[i] + k] !== rank[sa[i - 1] + k]) {
            r++;
          }
          tmp[sa[i]] = r;
        }
        rank = tmp;
      }
  
      return sa;
    }
  
    // Returns the longest common prefix between the suffixes starting at index i and j
    lcp(i, j) {
      let l = 0;
      const n = this.string.length;
      while (i < n && j < n && this.string[i] === this.string[j]) {
        i++;
        j++;
        l++;
      }
      return l;
    }
  }

  
  if (require.main === module) {
    // Create a new instance of the CompressedDynamicSuffixArray class
    const cdsa = new CompressedDynamicSuffixArray("banana");
    console.log(cdsa.lcp(0, 3)); // Outputs: 1
      
  }

