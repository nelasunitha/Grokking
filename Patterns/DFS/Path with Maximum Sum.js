// Path with Maximum Sum (hard)
/*Find the path with the maximum sum in a given binary tree. Write a function that returns the maximum sum.

A path can be defined as a sequence of nodes between any two nodes and doesn’t necessarily pass through the root. The path must contain at least one node.

Example 1:
       1
     7 .   9
6 .    5  2 .  3
 Output: 16Explanation: The path with maximum sum is: [4, 2, 1, 3, 6]  */
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
const find_maximum_path_sum = function (root) {
  // TODO: Write your code here
  globalMaxSum = -Infinity;
  find_maximum_path_sum_recursive(root);
  return globalMaxSum;
};
function find_maximum_path_sum_recursive(current) {
  if (!current) return 0;

  let leftMaxSum = find_maximum_path_sum_recursive(current.left);
  let rightMaxSum = find_maximum_path_sum_recursive(current.right);

  leftMaxSum = Math.max(leftMaxSum, 0);
  rightMaxSum = Math.max(rightMaxSum, 0);

  let localSum = leftMaxSum + rightMaxSum + current.value;

  globalMaxSum = Math.max(localSum, globalMaxSum);
  return Math.max(leftMaxSum, rightMaxSum) + current.value;
}

var root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
console.log(`Maximum Path Sum: ${find_maximum_path_sum(root)}`);

root.left.left = new TreeNode(1);
root.left.right = new TreeNode(3);
root.right.left = new TreeNode(5);
root.right.right = new TreeNode(6);
root.right.left.left = new TreeNode(7);
root.right.left.right = new TreeNode(8);
root.right.right.left = new TreeNode(9);
console.log(`Maximum Path Sum: ${find_maximum_path_sum(root)}`);

root = new TreeNode(-1);
root.left = new TreeNode(-3);
console.log(`Maximum Path Sum: ${find_maximum_path_sum(root)}`);
/* Solution
This problem follows the Binary Tree Path Sum pattern and shares the algorithmic logic with Tree Diameter. We can follow the same DFS approach. The only difference will be to ignore the paths with negative sums. Since we need to find the overall maximum sum, we should ignore any path which has an overall negative sum.

Code
Here is what our algorithm will look like, the most important changes are in the highlighted lines:

Time complexity
The time complexity of the above algorithm is O(N), where ‘N’ is the total number of nodes in the tree. This is due to the fact that we traverse each node once.

Space complexity
The space complexity of the above algorithm will be O(N)in the worst case. This space will be used to store the recursion stack. The worst case will happen when the given tree is a linked list (i.e., every node has only one child).*/
