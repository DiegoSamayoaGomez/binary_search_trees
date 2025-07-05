# binary_search_trees
Implementation of binary search trees, where you take a group of data items and turn them into a tree full of nodes, with each left node being “lower” than each right node.


The program tree is composed of four core internal functions

- `NodeFactory`: Creates a binary tree node with data, left, and right properties.

- `Tree`: Initializes a binary search tree from a given array and exposes tree operations.

- `buildTree(array)`: Recursively builds a balanced binary search tree from a sorted, duplicate-free array.

- `sortAndRemoveDuplicates(arr)`: Sort the given array and then delete repeated values


## Functions

### Operations

- `insert(value)`: Inserts a new value into the tree while preserving BST properties.

- `deleteItem(value)`: Deletes a node by value and restructures the tree accordingly.

- `find(value)`: Searches for a node with the given value and returns it if found.

### Traversal methods

- `levelOrderForEach(callback)`: Performs level-order (breadth-first) traversal and calls the callback on each node.

- `inOrderForEach(callback)`: Traverses the tree in in-order (left, root, right) and applies the callback.

- `preOrderForEach(callback)`: Traverses the tree in pre-order (root, left, right) and applies the callback.

- `postOrderForEach(callback)`: Traverses the tree in post-order (left, right, root) and applies the callback.

### Check numbers and balances

- `height(value)`: Returns the height of the node containing the given value.

- `depth(value)`: Returns the depth of the node with the given value.

- `isBalanced()`: Checks whether the tree is balanced 

- `rebalance()`: Rebuilds the tree into a balanced binary search tree using in-order traversal.

### Other
- `prettyPrint(node)`: Use to see your tree in a graphical way 

## Usage
At the end of the `binaryTree.js` file there are examples of each function. Feel free to use it.
