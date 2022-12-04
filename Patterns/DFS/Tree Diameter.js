//Tree Diameter (medium)
/* Given a binary tree, find the length of its diameter. The diameter of a tree is the number of nodes on the longest path between any two leaf nodes. The diameter of a tree may or may not pass through the root.

Note: You can always assume that there are at least two leaf nodes in the given tree.

Example 1:
       1
     7 .   9
6 .    5  2 .  3
Output: 5Explanation: The diameter of the tree is: [4, 2, 1, 3, 6]*/
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class TreeDiameter {
  constructor() {
    this.treeDiameter = 0;
  }

  find_diameter(root) {
    // TODO: Write your code here
    this.calculateHeight(root);
    return this.treeDiameter;
  }
  calculateHeight(node) {
    if (!node) return 0;

    let leftPath = this.calculateHeight(node.left);
    let rightPath = this.calculateHeight(node.right);

    let diameter = leftPath + rightPath + 1;

    this.treeDiameter = Math.max(diameter, this.treeDiameter);

    return Math.max(leftPath, rightPath) + 1;
  }
}

var treeDiameter = new TreeDiameter();
var root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.right.left = new TreeNode(5);
root.right.right = new TreeNode(6);
console.log(`Tree Diameter: ${treeDiameter.find_diameter(root)}`);
root.left.left = null;
root.right.left.left = new TreeNode(7);
root.right.left.right = new TreeNode(8);
root.right.right.left = new TreeNode(9);
root.right.left.right.left = new TreeNode(10);
root.right.right.left.left = new TreeNode(11);
console.log(`Tree Diameter: ${treeDiameter.find_diameter(root)}`);
/* Solution
This problem follows the Binary Tree Path Sum pattern. We can follow the same DFS approach. There will be a few differences:

At every step, we need to find the height of both children of the current node. For this, we will make two recursive calls similar to DFS.
The height of the current node will be equal to the maximum of the heights of its left or right children, plus ‘1’ for the current node.
The tree diameter at the current node will be equal to the height of the left child plus the height of the right child plus ‘1’ for the current node: diameter = leftTreeHeight + rightTreeHeight + 1. To find the overall tree diameter, we will use a class level variable. This variable will store the maximum diameter of all the nodes visited so far, hence, eventually, it will have the final tree diameter.
Code
Here is what our algorithm will look like:*/
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class TreeDiameter {
  constructor() {
    this.treeDiameter = 0;
  }

  find_diameter(root) {
    this.calculate_height(root);
    return this.treeDiameter;
  }

  calculate_height(currentNode) {
    if (currentNode === null) {
      return 0;
    }

    const leftTreeHeight = this.calculate_height(currentNode.left);
    // console.log(leftTreeHeight)
    const rightTreeHeight = this.calculate_height(currentNode.right);

    // if the current node doesn't have a left or right subtree, we can't have
    // a path passing through it, since we need a leaf node on each side
    if (leftTreeHeight !== 0 && rightTreeHeight !== 0) {
      // diameter at the current node will be equal to the height of left subtree +
      // the height of right sub-trees + '1' for the current node
      const diameter = leftTreeHeight + rightTreeHeight + 1;

      // update the global tree diameter
      this.treeDiameter = Math.max(this.treeDiameter, diameter);
    }

    // height of the current node will be equal to the maximum of the heights of
    // left or right subtrees plus '1' for(the current node
    return Math.max(leftTreeHeight, rightTreeHeight) + 1;
  }
}

const treeDiameter = new TreeDiameter();
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.right.left = new TreeNode(5);
root.right.right = new TreeNode(6);
console.log(`Tree Diameter: ${treeDiameter.find_diameter(root)}`);
root.left.left = null;
root.right.left.left = new TreeNode(7);
root.right.left.right = new TreeNode(8);
root.right.right.left = new TreeNode(9);
root.right.left.right.left = new TreeNode(10);
root.right.right.left.left = new TreeNode(11);
console.log(`Tree Diameter: ${treeDiameter.find_diameter(root)}`);
/* Time complexity
The time complexity of the above algorithm is O(N), where ‘N’ is the total number of nodes in the tree. This is due to the fact that we traverse each node once.

Space complexity
The space complexity of the above algorithm will be O(N)in the worst case. This space will be used to store the recursion stack. The worst case will happen when the given tree is a linked list (i.e., every node has only one child).*/
