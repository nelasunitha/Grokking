//Path With Given Sequence (medium)
/* Problem Statement
Given a binary tree and a number sequence, find if the sequence is present as a root-to-leaf path in the given tree.

Example 1:
      1
   7 .    9
       2 .   9
Sequence: [1, 9, 9]Output: true Explanation: The tree has a path 1 -> 9 -> 9*/
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const find_path = function (root, sequence) {
  // TODO: Write your code here
  return find_path_recursive(root, sequence, 0);
};
function find_path_recursive(currentNode, sequence, sequenceIdx) {
  if (!currentNode) return false;
  let seqLen = sequence.length;

  if (sequenceIdx >= seqLen || currentNode.value !== sequence[sequenceIdx])
    return false;

  if (!currentNode.left && !currentNode.right && sequenceIdx === seqLen - 1)
    return true;

  return (
    find_path_recursive(currentNode.left, sequence, sequenceIdx + 1) ||
    find_path_recursive(currentNode.right, sequence, sequenceIdx + 1)
  );
}

var root = new TreeNode(1);
root.left = new TreeNode(0);
root.right = new TreeNode(1);
root.left.left = new TreeNode(1);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(5);

console.log(`Tree has path sequence: ${find_path(root, [1, 0, 7])}`);
console.log(`Tree has path sequence: ${find_path(root, [1, 1, 6])}`);
/* Time complexity
The time complexity of the above algorithm is O(N), where ‘N’ is the total number of nodes in the tree. This is due to the fact that we traverse each node once.

Space complexity
The space complexity of the above algorithm will be O(N)in the worst case. This space will be used to store the recursion stack. The worst case will happen when the given tree is a linked list (i.e., every node has only one child).*/
