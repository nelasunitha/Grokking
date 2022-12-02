//Level Averages in a Binary Tree (easy)
/* Given a binary tree, populate an array to represent the averages of all of its levels.

Example 1:

         1
      2       3
    4   5   6    7
    Level Averages:[1, 2.5, 5.5] */
const Deque = require('./collections/deque'); //http://www.collectionsjs.com
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const find_level_averages = function (root) {
  const result = [];
  // TODO: Write your code here
  const queue = new Deque();
  queue.push(root);
  while (queue.length) {
    let len = queue.length;
    let curSum = 0;
    for (let i = 0; i < len; i++) {
      let node = queue.shift();
      curSum += node.value;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(curSum / len);
  }

  return result;
};

var root = new TreeNode(12);
root.left = new TreeNode(7);
root.right = new TreeNode(1);
root.left.left = new TreeNode(9);
root.left.right = new TreeNode(2);
root.right.left = new TreeNode(10);
root.right.right = new TreeNode(5);

console.log(`Level averages are: ${find_level_averages(root)}`);
/* Solution
This problem follows the Binary Tree Level Order Traversal pattern. We can follow the same BFS approach. The only difference will be that instead of keeping track of all nodes of a level, we will only track the running sum of the values of all nodes in each level. In the end, we will append the average of the current level to the result array.

Code
Here is what our algorithm will look like; only the highlighted lines have changed:*/
const Deque = require('./collections/deque'); //http://www.collectionsjs.com

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

function find_level_averages(root) {
  result = [];
  if (root === null) {
    return result;
  }

  const queue = new Deque();
  queue.push(root);
  while (queue.length > 0) {
    let levelSize = queue.length,
      levelSum = 0.0;
    for (i = 0; i < levelSize; i++) {
      currentNode = queue.shift();
      // add the node's value to the running sum
      levelSum += currentNode.val;
      // insert the children of current node to the queue
      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }
    // append the current level's average to the result array
    result.push(levelSum / levelSize);
  }

  return result;
}

const root = new TreeNode(12);
root.left = new TreeNode(7);
root.right = new TreeNode(1);
root.left.left = new TreeNode(9);
root.left.right = new TreeNode(2);
root.right.left = new TreeNode(10);
root.right.right = new TreeNode(5);
console.log(`Level averages are: ${find_level_averages(root)}`);
/* Time complexity
The time complexity of the above algorithm is O(N), where ‘N’ is the total number of nodes in the tree. This is due to the fact that we traverse each node once.

Space complexity
The space complexity of the above algorithm will be O(N)which is required for the queue. Since we can have a maximum of N/2

 nodes at any level (this could happen only at the lowest level), therefore we will need O(N)space to store them in the queue.

Similar Problems
Problem 1: Find the largest value on each level of a binary tree.

Solution: We will follow a similar approach, but instead of having a running sum we will track the maximum value of each level.

maxValue = max(maxValue, currentNode.val)*/
