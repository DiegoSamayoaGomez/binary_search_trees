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
  return buildTree(sortedUniqueArray, 0, sortedUniqueArray.lenth - 1);
}

function buildTree(arr, start, end) {
  // Escape function
  if (start > end) return null;

  // Find the middle element
  let mid = start + Math.floor((end - start) / 2);

  // Create root node
  let root = NodeFactory();

  // Create left subtree
  root.left = sortedArrayToBSTRecur(arr, start, mid - 1);

  // Create right subtree
  root.right = sortedArrayToBSTRecur(arr, mid + 1, end);

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

// Check if the function works
console.log("Original Array", myArr);
console.log("SORTED AND UNIQUE: ", sortAndRemoveDuplicates(myArr));
