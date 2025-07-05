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

  // Use a function as a parameter and traverse the tree in BFS
  const levelOrderForEach = (callback) => {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    let queue = [];
    queue.push(root);

    while (queue.length > 0) {
      let current = queue.shift();
      callback(current);

      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
    }
  };

  // Take a function and traverse it in PREORDER AS DFS
  const preOrderForEach = (callback, node = root) => {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    if (node !== null) {
      callback(node);
      preOrderForEach(callback, node.left);
      preOrderForEach(callback, node.right);
    }
  };

  // Take a function and traverse it in INORDER AS DFS
  const inOrderForEach = (callback, node = root) => {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    if (node !== null) {
      inOrderForEach(callback, node.left);
      callback(node);
      inOrderForEach(callback, node.right);
    }
  };

  // Take a function and traverse it in POST ORDER AS DFS
  const postOrderForEach = (callback, node = root) => {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    if (node !== null) {
      postOrderForEach(callback, node.left);
      postOrderForEach(callback, node.right);
      callback(node);
    }
  };

  // Return the height of the node based on the given value
  const height = (value) => {
    // Use the find FN to see if the value exists
    const node = find(value);
    // If it doesnt just end the execution
    if (node === null) return null;

    // Otherwise keep until calc the height
    const calcHeight = (node) => {
      if (node === null) return -1;
      return 1 + Math.max(calcHeight(node.left), calcHeight(node.right));
    };
    return calcHeight(node);
  };

  // Return the depth of the node based on the given value
  const depth = (value, node = root, currentDepth = 0) => {
    // If the node is empty, just end the execution
    if (node === null) return null;

    // Check if the data is the same as the given value, if so return the currentDepth
    if (node.data === value) return currentDepth;

    //console.log("XDD --->", node.data, value, currentDepth);

    if (value < node.data) return depth(value, node.left, currentDepth + 1);
    return depth(value, node.right, currentDepth + 1);
  };

  // Check if the given tree is balanced in each node
  const isBalanced = (node = root) => {
    // Exit function, if the node its empty its balanced
    if (node === null) return true;

    // Use this piece of code from height because if I call height() it will always return null
    const calcHeight = (node) => {
      if (node === null) return -1;
      return 1 + Math.max(calcHeight(node.left), calcHeight(node.right));
    };

    // Use the existing FN to get the height and use it to check if its balanced
    let leftHeight = calcHeight(node.left);
    let rightHeight = calcHeight(node.right);
    // console.log(leftHeight, rightHeight);

    // If the result of the left minus right is bigger than 1 its not balanced
    if (Math.abs(leftHeight - rightHeight) > 1) return false;

    return isBalanced(node.left) && isBalanced(node.right);
  };

  return {
    getRoot,
    insert,
    deleteItem,
    find,
    levelOrderForEach,
    preOrderForEach,
    inOrderForEach,
    postOrderForEach,
    height,
    depth,
    isBalanced,
  };
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
//prettyPrint(instanceOfTree.find(67));
prettyPrint(instanceOfTree.getRoot());
const xd = instanceOfTree.getRoot();

console.log(instanceOfTree.height(8));
console.log(instanceOfTree.depth(6345));
console.log(instanceOfTree.isBalanced(instanceOfTree.getRoot()));
