// Node factory
function Node(data) {
  return { data: data, left: null, right: null };
}

// Tree factory which accepts an array
function Tree(myArr, root) {}

function buildTree(myArr) {}

// Example ARRAY
const myArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

// Take an array and sort it numerically
const sortAndRemoveDuplicates = myArr.sort((a, b) => {
  return a - b;
});

// Create an object with unique values
let s = new Set(sortAndRemoveDuplicates);

// Create a new array with sorted and unique values
let myNewArr = [...s];
console.log(myNewArr);
