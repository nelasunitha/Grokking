//Right View of a Binary Tree (easy)
/* Given a binary tree, return an array containing nodes in its right view. The right view of a binary tree is the set of nodes visible when the tree is seen from the right side.

Example 1:

     1
  2       3
4   5   6    7 */

const Deque = require('./collections/deque');

class TreeNode {

  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.next = null
  }
};

const tree_right_view = function(root) {
  const result = [];
  // TODO: Write your code here
  if(!root) return result;
  const queue = new Deque();
  queue.push(root);
  while(queue.length)  {
    let len = queue.length;
    for(let i = 0; i < len; i++) {
      let curNode = queue.shift();
      // console.log(curNode.value)
      if(i === len -1) result.push(curNode.value);
      if(curNode.left) queue.push(curNode.left);
      if(curNode.right) queue.push(curNode.right);
    }
  }
  return result;
};


var root = new TreeNode(12);
root.left = new TreeNode(7);
root.right = new TreeNode(1);
root.left.left = new TreeNode(9);
root.right.left = new TreeNode(10);
root.right.right = new TreeNode(5);
root.left.left.left = new TreeNode(3);
console.log("Tree right view: " + tree_right_view(root))

/* Solution
This problem follows the Binary Tree Level Order Traversal pattern. We can follow the same BFS approach. The only additional thing we will be doing is to append the last node of each level to the result array.

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


function tree_right_view(root) {
  result = [];
  if (root === null) {
    return result;
  }

  const queue = new Deque();
  queue.push(root);
  while (queue.length > 0) {
    const levelSize = queue.length;
    for (i = 0; i < levelSize; i++) {
      currentNode = queue.shift();
      // if it is the last node of this level, add it to the result
      if (i === levelSize - 1) {
        result.push(currentNode);
      }
      // insert the children of current node in the queue
      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }
  }

  return result;
}


const root = new TreeNode(12);
root.left = new TreeNode(7);
root.right = new TreeNode(1);
root.left.left = new TreeNode(9);
root.right.left = new TreeNode(10);
root.right.right = new TreeNode(5);
root.left.left.left = new TreeNode(3);
result = tree_right_view(root);
process.stdout.write('Tree right view: ');
for (i = 0; i < result.length; i++) {
  process.stdout.write(`${result[i].val} `);
}
/*
Time complexity
The time complexity of the above algorithm is O(N)
O(N)
, where ‘N’ is the total number of nodes in the tree. This is due to the fact that we traverse each node once.

Space complexity
The space complexity of the above algorithm will be O(N)

 needed for the return list. We will also need O(N) space for the queue. Since we can have a maximum of N/2
 nodes at any level (this could happen only at the lowest level), therefore we will need O(N)space to store them in the queue.

Similar Questions
Problem 1: Given a binary tree, return an array containing nodes in its left view. The left view of a binary tree is the set of nodes visible when the tree is seen from the left side.

Solution: We will be following a similar approach, but instead of appending the last element of each level, we will be appending the first element of each level to the output array.*/
