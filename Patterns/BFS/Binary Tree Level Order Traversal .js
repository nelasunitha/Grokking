//Binary Tree Level Order Traversal (easy)
// Given a binary tree, populate an array to represent its level-by-level traversal. You should populate the values of all nodes of each level from left to right in separate sub-arrays.

// Example 1:

//          1
//       2       3
//     4   5   6    7
//  Level Order Traversal:
//  [[1],[2,3],[4,5,6,7]]
// Example 2:

//           12
//        7      1
//     9    10       5
//  Level Order Traversal:
//  [[12],[7,1],[9,10,5]]
// Try it yourself
// Try solving this question here:
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

const traverse = function (root) {
  // console.log('rppt',root.val)
  if (!root) return [];
  let result = [];

  let queue = [root];
  // console.log('queue', queue)
  while (queue.length) {
    let len = queue.length;
    let currentvalue = [];
    for (let i = 0; i < len; i++) {
      let node = queue.shift();
      // console.log('node', node)
      currentvalue.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(currentvalue);
  }
  return result;
};

var root = new TreeNode(12);
root.left = new TreeNode(7);
root.right = new TreeNode(1);
root.left.left = new TreeNode(9);
root.right.left = new TreeNode(10);
root.right.right = new TreeNode(5);
console.log(`Level order traversal: ${traverse(root)}`);

/* Solution
Since we need to traverse all nodes of each level before moving onto the next level, we can use the Breadth First Search (BFS) technique to solve this problem.

We can use a Queue to efficiently traverse in BFS fashion. Here are the steps of our algorithm:

Start by pushing the root node to the queue.
Keep iterating until the queue is empty.
In each iteration, first count the elements in the queue (let’s call it levelSize). We will have these many nodes in the current level.
Next, remove levelSize nodes from the queue and push their value in an array to represent the current level.
After removing each node from the queue, insert both of its children into the queue.
If the queue is not empty, repeat from step 3 for the next level.
Let’s take the example-2 mentioned above to visually represent our algorithm:*/
const Deque = require('./collections/deque'); //http://www.collectionsjs.com

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

function traverse(root) {
  result = [];
  if (root === null) {
    return result;
  }

  const queue = new Deque();
  queue.push(root);
  while (queue.length > 0) {
    const levelSize = queue.length;
    currentLevel = [];
    for (i = 0; i < levelSize; i++) {
      currentNode = queue.shift();
      // add the node to the current level
      currentLevel.push(currentNode.val);
      // insert the children of current node in the queue
      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }
    result.push(currentLevel);
  }

  return result;
}

const root = new TreeNode(12);
root.left = new TreeNode(7);
root.right = new TreeNode(1);
root.left.left = new TreeNode(9);
root.right.left = new TreeNode(10);
root.right.right = new TreeNode(5);
console.log(`Level order traversal: ${traverse(root)}`);
/* Time complexity
The time complexity of the above algorithm is O(N), where ‘N’ is the total number of nodes in the tree. This is due to the fact that we traverse each node once.

Space complexity
The space complexity of the above algorithm will be O(N), as we need to return a list containing the level order traversal. We will also need O(N), space for the queue. Since we can have a maximum of N/2
nodes at any level (this could happen only at the lowest level), therefore we will need O(N)

 space to store them in the queue*/
