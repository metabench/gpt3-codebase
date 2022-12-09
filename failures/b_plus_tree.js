class B_Plus_Tree {
    constructor({order} = {order: 5}) {
        this.order = order;
        this.root = new B_Plus_Tree_Node(this.order);
    }

    insert(key, value) {
        const {root} = this;
        const node = root.insert(key, value);
        node ? this.root = node : undefined;
    }

    search(key) {
        const {root} = this;
        return root.search(key);
    }

    remove(key) {
        const {root} = this;
        const node = root.remove(key);
        node ? this.root = node : undefined;
    }
}

class B_Plus_Tree_Node {
    constructor(order) {
        this.order = order;
        this.keys = [];
        this.values = [];
        this.children = [];
    }

    // Insert a key-value pair into the B+ tree
    insert(key, value) {
        // Use object destructuring to avoid repeating references to this.keys and this.values
        const {keys, values} = this;

        // Find the index of the key in the array of keys
        const index = keys.findIndex(k => key < k);

        // If the key was not found in the array of keys
        if (index === -1) {
            // Add the key and value to the end of the arrays of keys and values
            keys.push(key);
            values.push(value);
        }
        // If the key was found in the array of keys
        else {
            // Insert the key and value into the arrays of keys and values at the specified index
            keys.splice(index, 0, key);
            values.splice(index, 0, value);
        }

        // If the number of keys in the node exceeds the order of the B+ tree
        if (keys.length > this.order) {
            // Use object destructuring to avoid repeating references to this.keys, this.values, and this.children
            const {keys, values, children} = this;

            // Calculate the middle index of the keys array
            const middle = Math.floor(this.order / 2);

            // Create left and right child nodes
            const left = new B_Plus_Tree_Node(this.order);
            const right = new B_Plus_Tree_Node(this.order);

            // Set the keys, values, and children of the left and right child nodes
            left.keys = keys.slice(0, middle);
            left.values = values.slice(0, middle);
            left.children = children.slice(0, middle + 1);
            right.keys = keys.slice(middle + 1);
            right.values = values.slice(middle + 1);
            right.children = children.slice(middle + 1);

            // Create a new node with the middle key and the left and right child nodes as children
            return new B_Plus_Tree_Node(this.order, keys[middle], [left, right]);
        }
    }


    search(key) {
        const {children, keys, values} = this;
        const index = keys.findIndex(k => key < k);
        return !~index ? values[keys.length - 1] :
            children.length ? children[index].search(key) : values[index];
    }

    remove(key) {
        // Use object destructuring to create local keys and children variables
        const {keys, children} = this;
    
        // Use the findIndex method to find the index of the key in the keys array
        const index = keys.findIndex(k => key < k);
    
        // Remove the key-value pair from the node using the removeKeyValuePair function
        this.removeKeyValuePair(index);
    
        // If the node has children, remove the key-value pair from the appropriate child node using the removeFromChild function
        if (children.length) {
            this.removeFromChild(index);
        }
    
        // Balance the tree using the balanceTree function and return the new root node if one was created, or undefined if not
        return this.balanceTree() ? this.balanceTree() : undefined;
    }


        // Remove the key-value pair from the node
    removeKeyValuePair(index) {
        // Use object destructuring to avoid repeating references to this.keys and this.values
        const {keys, values} = this;

        // If the key was not found in the array of keys
        if (index === -1) {
            // Remove the last key-value pair from the arrays of keys and values
            keys.pop();
            values.pop();
        }
        // If the key was found in the array of keys
        else {
            // Remove the key-value pair from the arrays of keys and values at the specified index
            keys.splice(index, 1);
            values.splice(index, 1);
        }
    }

    // Remove the key-value pair from the appropriate child node
    removeFromChild(index) {
        // Use object destructuring to avoid repeating references to this.children and this.keys
        const {children, keys} = this;

        // Use the remove method of the appropriate child node to remove the key-value pair
        const node = children[index].remove(key);

        // If a new root node was created by the child node's remove method
        if (node) {
            // Replace the key and children of the current node with the key and children of the new root node
            this.keys.splice(index, 1, node.keys[0]);
            this.children.splice(index, 1, node.children[0], node.children[1]);
        }
    }
    

    // Balance the tree
    balanceTree() {
        // Use object destructuring to avoid repeating references to this.keys, this.values, and this.children
        const {keys, values, children} = this;

        // If the node's key count is less than the floor of the order divided by 2, balance the tree by shifting key-value pairs from the left or right child nodes
        if (keys.length < Math.floor(this.order / 2)) {
            // Use object destructuring to avoid repeating references to this.children
            const [leftChild, rightChild] = children;

            // If the left child has more than the floor of the order divided by 2 keys, shift a key-value pair from the left child to the current node
            (leftChild && leftChild.keys.length > Math.floor(this.order / 2))
                ? (keys.unshift(leftChild.keys.pop()), values.unshift(leftChild.values.pop()), children.unshift(leftChild.children.pop()))
                // If the right child has more than the floor of the order divided by 2 keys, shift a key-value pair from the right child to the current node
                : (rightChild && rightChild.keys.length > Math.floor(this.order / 2))
                    ? (keys.push(rightChild.keys.shift()), values.push(rightChild.values.shift()), children.push(rightChild.children.shift()))
                    // If both the left and right children have less than or equal to the floor of the order divided by 2 keys, merge the current node with the left or right child
                    : (leftChild && rightChild)
                        // Merge the current node with the left child
                        ? (leftChild.keys.push(...keys), leftChild.values.push(...values), leftChild.children.push(...children.slice(1)), this)
                        // Merge the current node with the right child
                        : (rightChild.keys.unshift(...keys), rightChild.values.unshift(...values), rightChild.children.unshift(...children.slice(0, -1)), this);
        }
    }

    
}


if (require.main === module) {
    function runTests() {
        // Create an object to store the test results
        const testResults = {};
    
        // Create a new B+ tree with order 5
        const bpt = new B_Plus_Tree({order: 5});
    
        // Insert some key-value pairs into the tree
        bpt.insert('apple', 'red');
        bpt.insert('banana', 'yellow');
        bpt.insert('orange', 'orange');
        bpt.insert('pear', 'green');
        bpt.insert('grape', 'purple');
    
        // Search for a key that exists in the tree
        const appleValue = bpt.search('apple');
        testResults.appleValue = appleValue; // 'red'
    
        // Search for a key that does not exist in the tree
        const raspberryValue = bpt.search('raspberry');
        testResults.raspberryValue = raspberryValue; // undefined
    
        // Remove a key-value pair from the tree
        bpt.remove('pear');
    
        // Search for the removed key to verify that it is no longer in the tree
        const pearValue = bpt.search('pear');
        testResults.pearValue = pearValue; // undefined
    
        // Return the test results object
        return testResults;
    }
    
    // Run the tests and store the results in a variable
    const results = runTests();
    console.log('results', results);
    
}