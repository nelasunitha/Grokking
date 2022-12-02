//Connect All Level Order Siblings (medium)

/* Given a binary tree, connect each node with its level order successor. The last node of each level should point to the first node of the next level.

Example 1:

     1
  2       3
4   5   6    7 */

const Deque = require('./collections/deque'); //http://www.collectionsjs.com
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.next = null;
  }

  // tree traversal using 'next' pointer
  print_tree() {
    result = "Traversal using 'next' pointer: ";
    current = this;
    while (current != null) {
      result += current.value + ' ';
      current = current.next;
    }
    console.log(result);
  }
}

const connect_all_siblings = function (root) {
  // TODO: Write your code here
  const queue = new Deque();
  queue.push(root);
  let previousNode = null;
  while (queue.length) {
    let currentNode = queue.shift();
    /* not using for loop as the we are not traversing in any of the level, traversal continues
    till the last node */
    if (previousNode) previousNode.next = currentNode;
    previousNode = currentNode;
    if (currentNode.left) queue.push(currentNode.left);
    if (currentNode.right) queue.push(currentNode.right);
  }
};

var root = new TreeNode(12);
root.left = new TreeNode(7);
root.right = new TreeNode(1);
root.left.left = new TreeNode(9);
root.right.left = new TreeNode(10);
root.right.right = new TreeNode(5);
connect_all_siblings(root);
root.print_tree();

/* Solution
This problem follows the Binary Tree Level Order Traversal pattern. We can follow the same BFS approach. The only difference will be that while traversing we will remember (irrespective of the level) the previous node to connect it with the current node.

Code
Here is what our algorithm will look like; only the highlighted lines have changed:*/

const Deque = require('./collections/deque'); //http://www.collectionsjs.com

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.next = null;
  }

  // tree traversal using 'next' pointer
  print_tree() {
    process.stdout.write("Traversal using 'next' pointer: ");
    let current = this;
    while (current !== null) {
      process.stdout.write(`${current.val} `);
      current = current.next;
    }
  }
}

function connect_all_siblings(root) {
  if (root === null) {
    return;
  }

  const queue = new Deque();
  queue.push(root);
  // let currentNode = null,
  let previousNode = null;
  while (queue.length > 0) {
    currentNode = queue.shift();
    if (previousNode !== null) {
      previousNode.next = currentNode;
    }
    previousNode = currentNode;
    // insert the children of current node in the queue
    if (currentNode.left !== null) {
      queue.push(currentNode.left);
    }
    if (currentNode.right !== null) {
      queue.push(currentNode.right);
    }
  }
}

const root = new TreeNode(12);
root.left = new TreeNode(7);
root.right = new TreeNode(1);
root.left.left = new TreeNode(9);
root.right.left = new TreeNode(10);
root.right.right = new TreeNode(5);
connect_all_siblings(root);
root.print_tree();

/* Time complexity
The time complexity of the above algorithm is O(N), where ‘N’ is the total number of nodes in the tree. This is due to the fact that we traverse each node once.

Space complexity
The space complexity of the above algorithm will be O(N)which is required for the queue. Since we can have a maximum of N/2

 nodes at any level (this could happen only at the lowest level), therefore we will need O(N) space to store them in the queue.*/
