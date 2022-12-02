/*Given a binary tree, populate an array to represent its level-by-level traversal in reverse order, i.e., the lowest level comes first. You should populate the values of all nodes in each level from left to right in separate sub-arrays.

 Example 1:

         1
      2       3
    4   5   6    7

    [[4,5,6,7],[2,3],[1]]
 Reverse Level Order Traversal:  */
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const traverse = function (root) {
  let result = [];
  // TODO: Write your code here
  let queue = [root];
  while (queue.length) {
    let currentLevel = [];
    let len = queue.length;
    for (let i = 0; i < len; i++) {
      let node = queue.shift();
      currentLevel.push(node.value);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.unshift(currentLevel);
  }

  return result;
};

var root = new TreeNode(12);
root.left = new TreeNode(7);
root.right = new TreeNode(1);
root.left.left = new TreeNode(9);
root.right.left = new TreeNode(10);
root.right.right = new TreeNode(5);
console.log(`Reverse level order traversal: ${traverse(root)}`);

/*Solution
This problem follows the Binary Tree Level Order Traversal pattern. We can follow the same BFS approach. The only difference will be that instead of appending the current level at the end, we will append the current level at the beginning of the result list.

Code
Here is what our algorithm will look like; only the highlighted lines have changed. Please note that, for Java, we will use a LinkedList instead of an ArrayList for our result list. As in the case of ArrayList, appending an element at the beginning means shifting all the existing elements. Since we need to append the level array at the beginning of the result list, a LinkedList will be better, as this shifting of elements is not required in a LinkedList. Similarly, we will use a double-ended queue (deque) for Python, C++, and JavaScript.*/
const Deque = require('./collections/deque'); //http://www.collectionsjs.com

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

function traverse(root) {
  const result = [];
  let queue = [root];
  while (queue.length) {
    let currentPath = [];
    for (let i = 0; i < queue.length; i++) {
      let currentNode = queue.shift();
      currentPath.push(currentNode.val);
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }
    result.unshift(currentPath);
  }
  return result;
}

const root = new TreeNode(12);
root.left = new TreeNode(7);
root.right = new TreeNode(1);
root.left.left = new TreeNode(9);
root.right.left = new TreeNode(10);
root.right.right = new TreeNode(5);
console.log(`Reverse level order traversal: ${traverse(root).toArray()}`);
/* Time complexity
The time complexity of the above algorithm is O(N) where ‘N’ is the total number of nodes in the tree. This is due to the fact that we traverse each node once.

Space complexity
The space complexity of the above algorithm will be O(N) as we need to return a list containing the level order traversal. We will also need O(N) space for the queue. Since we can have a maximum of N/2
 nodes at any level (this could happen only at the lowest level), therefore we will need O(space to store them in the queue.*/
