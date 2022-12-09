class Tensor {
    // Constructor to initialize a tensor with specified dimensions and values
    constructor(dimensions, values) {
      // Store the dimensions and values in the tensor
      this.dimensions = dimensions;
      this.values = values;
  
      // Calculate the stride for each dimension
      this.strides = this.calculateStrides(dimensions);
    }
  
    // Method to get the value at a specific index in the tensor
    get(indices) {
      // Calculate the flat index in the tensor values array
      let flatIndex = this.getFlatIndex(indices);
  
      // Return the value at the calculated flat index
      return this.values[flatIndex];
    }
  
    // Method to set the value at a specific index in the tensor
    set(indices, value) {
      // Calculate the flat index in the tensor values array
      let flatIndex = this.getFlatIndex(indices);
  
      // Set the value at the calculated flat index
      this.values[flatIndex] = value;
    }
  
    // Method to calculate the strides for each dimension
    calculateStrides(dimensions) {
      // Initialize the strides array with a stride of 1 for the first dimension
      let strides = [1];
  
      // Loop through the remaining dimensions and calculate the strides
      for (let i = 1; i < dimensions.length; i++) {
        strides.push(strides[i - 1] * dimensions[i - 1]);
      }
  
      // Return the calculated strides
      return strides;
    }
  
    // Method to calculate the flat index in the tensor values array
    // given the multidimensional indices
    getFlatIndex(indices) {
      // Initialize the flat index to zero
      let flatIndex = 0;
  
      // Loop through the dimensions and calculate the flat index
      for (let i = 0; i < this.dimensions.length; i++) {
        flatIndex += indices[i] * this.strides[i];
      }
  
      // Return the calculated flat index
      return flatIndex;
    }
  }
  
  if (require.main === module) {
    // Create a new tensor with dimensions [2, 3, 4] and values ['a', 'b', 'c', ..., 'x', 'y', 'z']
    let tensor = new Tensor([2, 3, 4], ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']);

    // Get the value at index [0, 1, 2] in the tensor
    let value = tensor.get([0, 1, 2]);
    // value will be 'f'
    console.log('value', value);
    // Set the value at index [1, 0, 3] in the tensor to 'A'
    tensor.set([1, 0, 3], 'A');

    // Get the value at index [1, 0, 3] in the tensor
    value = tensor.get([1, 0, 3]);
    // value will be 'A'
    console.log('value', value);
  }