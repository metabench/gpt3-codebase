const electron = require('electron');

const { app, BrowserWindow } = electron;

class BPlusTree {
    constructor(order = 8) {
        this.order = order;
        this.root = new Node(true);
    }

    search(key) {
        return this.root.search(key);
    }

    insert(key, value) {
        if (this.root.isFull()) {
            const newRoot = new Node(false);
            newRoot.children.push(this.root);
            this.root.split(newRoot, 0, this.order);
            this.root = newRoot;
        }

        this.root.insert(key, value, this.order);
    }

    remove(key) {
        this.root.remove(key, this.order);

        if (this.root.keys.length === 0) {
            if (!this.root.isLeaf) {
                this.root = this.root.children[0];
            }
        }
    }
}

class Node {
    constructor(isLeaf) {
        this.keys = [];
        this.values = [];
        this.children = [];
        this.isLeaf = isLeaf;
    }

    isFull() {
        return this.keys.length >= 2 * this.order;
    }

    search(key) {
        let i = 0;
        while (i < this.keys.length && key > this.keys[i]) {
            i++;
        }

        if (this.keys[i] === key) {
            return this.values[i];
        }

        if (this.isLeaf) {
            return null;
        }

        return this.children[i].search(key);
    }

    insert(key, value, order) {
        let i = 0;
        while (i < this.keys.length && key > this.keys[i]) {
            i++;
        }

        if (this.keys[i] === key) {
            this.values[i] = value;
            return;
        }

        if (this.isLeaf) {
            this.keys.splice(i, 0, key);
            this.values.splice(i, 0, value);
            return;
        }

        if (this.children[i].isFull()) {
            this.split(i, order);
            if (key > this.keys[i]) {
                i++;
            }
        }

        this.children[i].insert(key, value, order);
    }

    split(parent, index, order) {
        const right = new Node(this.isLeaf);
        right.keys = this.keys.splice(order);
        right.children = this.children.splice(order);

        if (!this.isLeaf) {
            right.children.forEach((child, i) => {
                child.parent = right;
            });
        }

        parent.children.splice(index + 1, 0, right);
        parent.keys.splice(index, 0, this.keys[order - 1]);

        this.keys.splice(order - 1);
        this.children.splice(order);
    }
    remove(key, order) {
        let i = 0;
        while (i < this.keys.length && key > this.keys[i]) i++;
        if (this.keys[i] === key) {
            this.keys.splice(i, 1);
            this.values.splice(i, 1);
            if (!this.isLeaf) {
                if (this.children[i].isUnderfull(order)) this.combine(i, order);
                if (this.children[i].keys.length === 0) this.children.splice(i, 1);
            }
        } else if (!this.isLeaf) {
            this.children[i].remove(key, order);
        }
    }

}

const fruitColors = [
    ['apple', 'red'],
    ['banana', 'yellow'],
    ['cantaloupe', 'orange'],
    ['durian', 'green'],
    ['elderberry', 'blue'],
    ['fig', 'purple'],
    ['grapefruit', 'pink'],
    ['honeydew', 'light green'],
    ['kiwi', 'brown'],
    ['lemon', 'yellow'],
    ['mango', 'orange'],
    ['nectarine', 'pink'],
    ['olive', 'green'],
    ['peach', 'orange'],
    ['plum', 'purple'],
    ['quince', 'yellow'],
    ['raspberry', 'red'],
    ['strawberry', 'red'],
    ['tangerine', 'orange'],
    ['ugli fruit', 'green'],
    ['watermelon', 'red'],
    ['xigua', 'green'],
    ['yellow watermelon', 'yellow'],
    ['zucchini', 'green']
];

function runTests() {


    



    // Create an object to store the test results
    const testResults = {};

    // Create a new B+ tree with order 5
    const bpt = new BPlusTree();

    // Insert some key-value pairs into the tree
    fruitColors.forEach(([fruit, color]) => {
        bpt.insert(fruit, color);
    });

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


if (require.main === module) {
    

    // Run the tests and store the results in a variable
    const results = runTests();
    console.log('results', results);


    /*

    function createFruitWindow(fruitColors) {
        const win = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true,
            },
        });

        // Generate HTML content for the fruit list
        const fruitList = fruitColors
            .map(([fruit, color]) => `<li>${fruit}: ${color}</li>`)
            .join('');
        const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Fruit List</title>
        </head>
        <body>
            <h1>Fruit List</h1>
            <ul>
            ${fruitList}
            </ul>
        </body>
        </html>
    `;

        win.loadURL(`data:text/html,${html}`);
    }
    */

    //app.whenReady().then(() => {
    //    createFruitWindow(fruitColors);
    //});

    (async () => {
        //await app.whenReady();
        //createFruitWindow(fruitColors);
    })();




}