//Count Paths for a Sum (medium)
/*
Problem Statement
Given a binary tree and a number ‘S’, find all paths in the tree such that the sum of all the node values of each path equals ‘S’. Please note that the paths can start or end at any node but all paths must follow direction from parent to child (top to bottom).

Example 1:
       1
     7 .   9
6 .    5  2 .  3
S: 12    Output: 3 .   Explanation: There are three paths
7 -> 5, 1 -> 9 -> 2, and 9 -> 3*/

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const count_paths = function (root, S) {
  // TODO: Write your code here

  return count_paths_recursive(root, S, []);
};

function count_paths_recursive(node, S, currentPath) {
  if (!node) return 0;
  currentPath.push(node.value);
  let pathSum = 0,
    pathCount = 0;
  for (let i = currentPath.length - 1; i >= 0; i--) {
    pathSum += currentPath[i];
    if (pathSum === S) pathCount++;
  }
  pathCount += count_paths_recursive(node.left, S, currentPath);
  pathCount += count_paths_recursive(node.right, S, currentPath);

  currentPath.pop();
  return pathCount;
}

var root = new TreeNode(12);
root.left = new TreeNode(7);
root.right = new TreeNode(1);
root.left.left = new TreeNode(4);
root.right.left = new TreeNode(10);
root.right.right = new TreeNode(5);
console.log(`Tree has paths: ${count_paths(root, 11)}`);

/* Solution
This problem follows the Binary Tree Path Sum pattern. We can follow the same DFS approach. But there will be four differences:

We will keep track of the current path in a list which will be passed to every recursive call.

Whenever we traverse a node we will do two things:

Add the current node to the current path.
As we added a new node to the current path, we should find the sums of all sub-paths ending at the current node. If the sum of any sub-path is equal to ‘S’ we will increment our path count.
We will traverse all paths and will not stop processing after finding the first path.

Remove the current node from the current path before returning from the function. This is needed to Backtrack while we are going up the recursive call stack to process other paths.

Code
Here is what our algorithm will look like:*/

const Deque = require('./collections/deque'); //http://www.collectionsjs.com

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function count_paths(root, S) {
  return count_paths_recursive(root, S, new Deque());
}

function count_paths_recursive(currentNode, S, currentPath) {
  if (currentNode === null) {
    return 0;
  }

  // add the current node to the path
  currentPath.push(currentNode.val);
  let pathCount = 0,
    pathSum = 0;
  // find the sums of all sub-paths in the current path list
  for (i = currentPath.length - 1; i >= 0; i--) {
    pathSum += currentPath[i];
    // if the sum of any sub-path is equal to 'S' we increment our path count.
    if (pathSum === S) {
      pathCount += 1;
    }
  }
  // traverse the left sub-tree
  pathCount += count_paths_recursive(currentNode.left, S, currentPath);
  // traverse the right sub-tree
  pathCount += count_paths_recursive(currentNode.right, S, currentPath);

  // remove the current node from the path to backtrack
  // we need to remove the current node while we are going up the recursive call stack
  currentPath.pop();
  return pathCount;
}

const root = new TreeNode(12);
root.left = new TreeNode(7);
root.right = new TreeNode(1);
root.left.left = new TreeNode(4);
root.right.left = new TreeNode(10);
root.right.right = new TreeNode(5);
console.log(`Tree has paths: ${count_paths(root, 11)}`);
/* Time complexity
The time complexity of the above algorithm is O(N^2)in the worst case, where ‘N’ is the total number of nodes in the tree. This is due to the fact that we traverse each node once, but for every node, we iterate the current path. The current path, in the worst case, can be O(N)(in the case of a skewed tree). But, if the tree is balanced, then the current path will be equal to the height of the tree, i.e., O(logN). So the best case of our algorithm will be O(NlogN).

Space complexity
The space complexity of the above algorithm will be O(N). This space will be used to store the recursion stack. The worst case will happen when the given tree is a linked list (i.e., every node has only one child). We also need O(N)space for storing the currentPath in the worst case.

Overall space complexity of our algorithm is O(N).

A more efficient solution
Can we further improve the solution?

One thing we are repeating for each node is traversing the current path and seeing if any sub-path that ends at the current node gives us the required sum.

Let’s see if we can improve this part.

We can use the Prefix Sum technique to efficiently manage the path sums.

Prefix Sum
Let’s first understand what Prefix Sum is. For a given array, its Prefix Sum is another array where each element is the commutative sum of the corresponding element in the given array and all its previous elements.

Prefix Sum
Prefix Sum
Here is an example:

Prefix Sum Example
Prefix Sum Example
Now, let’s say we want to find all subarrays of a given array with a target sum.

Let’s say our target sum is 7, and we want to find all the subarrays of the array mentioned above.

We can clearly see that there are two such subarrays: 1) [1, 6], and 2) [2, 5].

How can we utilize the Prefix Sum array to find these two subarrays efficiently?

There are two ways Prefix Sum can help us:

a) Since each element of the prefix sum array contains the cumulative sum of current and previous elements, therefore, whenever we see our target sum, we have found our targeted subarray. For example, since the second element of the prefix sum array is 7; therefore, our target subarray will be from the start of the array till the second element, i.e., [1, 6]

(b) Secondly, the prefix sum array can also help us find our target subarray that is not starting from the first index.

If we subtract the target sum from any element of the prefix sum array, the result will also give us our target subarray (if that result is present in the prefix sum array).

For example, take the 4th element of the prefix sum array and subtract the target sum from it: 14 – 7 => 7

Is this result (7) present in the prefix sum array? Yes, it is the second element. This means the sum from the 3rd element to the current element (i.e., the 4th) is also 7.

Hence, our target subarray will be from the 3rd element to the current element, i.e., [2, 5].

Now, let’s see how we can use prefix sum for binary trees. Take the following example:

Using Prefix Sum for Trees
Using Prefix Sum for Trees
We can consider each path as an array and calculate its prefix sums to find any required sub-paths. In the above tree, the highlighted sub-paths are exactly the same as our previous array example.

Here is what our new algorithm will look like:*/
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function count_paths(root, targetSum) {
  // A map that stores the number of times a prefix sum has occurred so far.
  const map = new Map();

  return count_paths_prefix_sum(root, targetSum, map, 0);
}

function count_paths_prefix_sum(node, targetSum, map, currentPathSum) {
  if (!node) return 0;

  // The number of paths that have the required sum.
  let pathCount = 0;

  // 'currentPathSum' is the prefix sum, i.e., sum of all node values from root to current node.
  currentPathSum += node.val;

  // This is the base case. If the current sum is equal to the target sum, we have found a path from root to
  // the current node having the required sum. Hence, we increment the path count by 1.
  if (targetSum === currentPathSum) pathCount++;

  //'currentPathSum' is the path sum from root to the current node. If within this path, there is a
  // valid solution, then there must be an 'oldPathSum' such that:
  // => currentPathSum - oldPathSum = targetSum
  // => currentPathSum - targetSum = oldPathSum
  // Hence, we can search such an 'oldPathSum' in the map from the key 'currentPathSum - targetSum'.
  if (map.has(currentPathSum - targetSum))
    pathCount += map.get(currentPathSum - targetSum);

  // This is the key step in the algorithm. We are storing the number of times the prefix sum
  // `currentPathSum` has occurred so far.
  map.set(currentPathSum, map.get(currentPathSum) + 1 || 1);

  // Counting the number of paths from the left and right subtrees.
  pathCount += count_paths_prefix_sum(
    node.left,
    targetSum,
    map,
    currentPathSum
  );
  pathCount += count_paths_prefix_sum(
    node.right,
    targetSum,
    map,
    currentPathSum
  );

  // Removing the current path sum from the map for backtracking.
  // 'currentPathSum' is the prefix sum up to the current node. When we go back (i.e., backtrack), then
  // the current node is no more a part of the path, hence, we should remove its prefix sum from the map.
  map.set(currentPathSum, map.get(currentPathSum) - 1);

  return pathCount;
}

const root = new TreeNode(12);
root.left = new TreeNode(7);
root.right = new TreeNode(1);
root.left.left = new TreeNode(4);
root.right.left = new TreeNode(10);
root.right.right = new TreeNode(5);
console.log(`Tree has paths: ${count_paths(root, 11)}`);
/* Time complexity
As we are not traversing the current path for each node, the time complexity of the above algorithm will be O(N)in the worst case, where ‘N’ is the total number of nodes in the tree.

Space complexity
The space complexity of the above algorithm will be O(N). This space will be used to store the recursion stack, as well as for the prefix sum.*/
