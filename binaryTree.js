// Example ARRAY
const myArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

// Node factory
function NodeFactory(data) {
  return { data: data, left: null, right: null };
}

// Tree factory which accepts an array
function Tree(myArr) {
  // Sort and remove repeated values from the array
  let sortedUniqueArray = sortAndRemoveDuplicates(myArr);
  let root = buildTree(sortedUniqueArray, 0, sortedUniqueArray.length - 1);

  // Returns the root value to use it in the prettyPrint function
  const getRoot = () => {
    return root;
  };

  // Insert the given value, it will always be inserted as a leaf node
  const insert = (value, node = root) => {
    if (node === null) return NodeFactory(value);

    // If the given value is smaller than the root, insert it in the left side
    if (value < node.data) {
      node.left = insert(value, node.left);
    }
    // If the given value is bigger than the root, insert it in the right side
    else if (value > node.data) {
      node.right = insert(value, node.right);
    }
    return node;
  };

  // Delete the given value, based of the node deleted it will search for a new value
  // Cant use "delete" as function name because its a reserved name
  const deleteItem = (value, node = root) => {
    if (node === null) return null;

    // Traverse the node based on the number of the value
    if (value < node.data) {
      node.left = deleteItem(value, node.left);
    } else if (value > node.data) {
      node.right = deleteItem(value, node.right);
    } else {
      // Node found
      if (node.left === null && node.right === null) {
        return null; // No children
      } else if (node.left === null) {
        return node.right; // One child (right)
      } else if (node.right === null) {
        return node.left; // One child (left)
      } else {
        // Two children: find inorder successor (smallest in right subtree)
        let minLargerNode = node.right;
        while (minLargerNode.left !== null) {
          minLargerNode = minLargerNode.left;
        }
        node.data = minLargerNode.data;
        node.right = deleteItem(minLargerNode.data, node.right);
      }
    }

    return node;
  };
  // Return the with the given value
  const find = (value, node = root) => {
    if (node === null) return null;

    if (node.data === value) return node;

    if (value < node.data) return find(value, node.left);
    return find(value, node.right);
  };
  return { getRoot, insert, deleteItem, find };
}

function buildTree(arr, start, end) {
  // Escape function
  if (start > end) return null;

  // Find the middle element
  let mid = start + Math.floor((end - start) / 2);

  // Create root node
  let root = NodeFactory(arr[mid]);

  // Create left subtree
  root.left = buildTree(arr, start, mid - 1);

  // Create right subtree
  root.right = buildTree(arr, mid + 1, end);
  console.log("I think it worked");
  return root;
}

const sortAndRemoveDuplicates = (myArr) => {
  // Take an array and sort it numerically
  let sortedArray = myArr.sort((a, b) => {
    return a - b;
  });

  // Create an object with unique values
  let s = new Set(sortedArray);

  // Create a new array with sorted and unique values
  let myNewArr = [...s];

  return myNewArr;
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// Check if the function works
console.log("Original Array", myArr);
console.log("SORTED AND UNIQUE: ", sortAndRemoveDuplicates(myArr));

// Use of the functions
let instanceOfTree = Tree(myArr);
instanceOfTree.insert(2);
instanceOfTree.deleteItem(2);
prettyPrint(instanceOfTree.find(67));
prettyPrint(instanceOfTree.getRoot());
