// Node factory
function Node(value, left = null, right = null) {
  return { value, left, right };
}

// Tree factory which accepts an array
function Tree(myArr, root) {}

function buildTree(myArr) {}

const myArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const xd = myArr.sort((a, b) => {
  return a - b;
});

let s = new Set(xd);

let myNewArr = [...s];
console.log(myNewArr);
