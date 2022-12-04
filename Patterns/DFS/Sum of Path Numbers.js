//Sum of Path Numbers (medium)
/*Problem Statement
Given a binary tree where each node can only have a digit (0-9) value, each root-to-leaf path will represent a number. Find the total sum of all the numbers represented by all paths.

Example 1:
      1
   7 .    9
       2 .   9
Output: 408 Explanation: The sum of all path numbers: 17 + 192 + 199 */
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const find_sum_of_path_numbers = function (root) {
  // TODO: Write your code here
  return findRootToLeafPath(root, 0);
};
function findRootToLeafPath(currentNode, pathSum) {
  if (!currentNode) return 0;
  pathSum = 10 * pathSum + currentNode.value;
  if (!currentNode.left && !currentNode.right) return pathSum;
  return (
    findRootToLeafPath(currentNode.left, pathSum) +
    findRootToLeafPath(currentNode.right, pathSum)
  );
}

var root = new TreeNode(1);
root.left = new TreeNode(0);
root.right = new TreeNode(1);
root.left.left = new TreeNode(1);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(5);
console.log(`Total Sum of Path Numbers: ${find_sum_of_path_numbers(root)}`);
/* Solution
This problem follows the Binary Tree Path Sum pattern. We can follow the same DFS approach. The additional thing we need to do is to keep track of the number representing the current path.

How do we calculate the path number for a node? Taking the first example mentioned above, say we are at node ‘7’. As we know, the path number for this node is ‘17’, which was calculated by: 1 * 10 + 7 => 17. We will follow the same approach to calculate the path number of each node.

Code
Here is what our algorithm will look like:*/

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function find_sum_of_path_numbers(root) {
  return find_root_to_leaf_path_numbers(root, 0);
}

function find_root_to_leaf_path_numbers(currentNode, pathSum) {
  if (currentNode === null) {
    return 0;
  }

  // calculate the path number of the current node
  pathSum = 10 * pathSum + currentNode.val;

  // if the current node is a leaf, return the current path sum
  if (currentNode.left === null && currentNode.right === null) {
    return pathSum;
  }

  // traverse the left and the right sub-tree
  return (
    find_root_to_leaf_path_numbers(currentNode.left, pathSum) +
    find_root_to_leaf_path_numbers(currentNode.right, pathSum)
  );
}

const root = new TreeNode(12);
root.left = new TreeNode(7);
root.right = new TreeNode(1);
root.left.left = new TreeNode(4);
root.right.left = new TreeNode(10);
root.right.right = new TreeNode(5);
console.log(`Total Sum of Path Numbers: ${find_sum_of_path_numbers(root)}`);

/* Time complexity#
The time complexity of the above algorithm is O(N), where ‘N’ is the total number of nodes in the tree. This is due to the fact that we traverse each node once.

Space complexity
The space complexity of the above algorithm will be O(N) in the worst case. This space will be used to store the recursion stack. The worst case will happen when the given tree is a linked list (i.e., every node has only one child).*/
