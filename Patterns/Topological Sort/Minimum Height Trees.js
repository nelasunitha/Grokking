//Minimum Height Trees (hard)
/*We are given an undirected graph that has characteristics of a k-ary tree. In such a graph, we can choose any node as the root to make a k-ary tree. The root (or the tree) with the minimum height will be called Minimum Height Tree (MHT). There can be multiple MHTs for a graph. In this problem, we need to find all those roots which give us MHTs. Write a method to find all MHTs of the given graph and return a list of their roots.

Example 1:

Input: vertices: 5, Edges: [[0, 1], [1, 2], [1, 3], [2, 4]]
Output:[1, 2]
Explanation: Choosing '1' or '2' as roots give us MHTs. In the below diagram, we can see that the
height of the trees with roots '1' or '2' is three which is minimum.

Example 2:

Input: vertices: 4, Edges: [[0, 1], [0, 2], [2, 3]]
Output:[0, 2]
Explanation: Choosing '0' or '2' as roots give us MHTs. In the below diagram, we can see that the
height of the trees with roots '0' or '2' is three which is minimum.

*/

const find_trees = function (nodes, edges) {
  // TODO: Write your code here
  if (nodes <= 0) return [];
  if (nodes === 1) return [0];

  let inDegree = Array(nodes).fill(0);
  let graph = Array(nodes)
    .fill(0)
    .map(() => Array());

  edges.forEach((edge) => {
    let n1 = edge[0],
      n2 = edge[1];

    graph[n1].push(n2);
    graph[n2].push(n1);

    inDegree[n1]++;
    inDegree[n2]++;
  });
  const leaves = [];
  for (let i = 0; i < inDegree.length; i++) {
    if (inDegree[i] === 1) leaves.push(i);
  }

  let totalNodes = nodes;

  while (totalNodes > 2) {
    let len = leaves.length;
    totalNodes -= len;
    for (let i = 0; i < len; i++) {
      const vertex = leaves.shift();
      graph[vertex].forEach((child) => {
        inDegree[child]--;
        if (inDegree[child] === 1) leaves.push(child);
      });
    }
  }

  return leaves;
};

console.log(
  `Roots of MHTs: ${find_trees(5, [
    [0, 1],
    [1, 2],
    [1, 3],
    [2, 4],
  ])}`
);
console.log(
  `Roots of MHTs: ${find_trees(4, [
    [0, 1],
    [0, 2],
    [2, 3],
  ])}`
);
console.log(
  `Roots of MHTs: ${find_trees(4, [
    [1, 2],
    [1, 3],
  ])}`
);
/*
Solution
From the above-mentioned examples, we can clearly see that any leaf node (i.e., node with only one edge) can never give us an MHT because its adjacent non-leaf nodes will always give an MHT with a smaller height. All the adjacent non-leaf nodes will consider the leaf node as a subtree. Let’s understand this with another example. Suppose we have a tree with root ‘M’ and height ‘5’. Now, if we take another node, say ‘P’, and make the ‘M’ tree as its subtree, then the height of the overall tree with root ‘P’ will be ‘6’ (=5+1). Now, this whole tree can be considered a graph, where ‘P’ is a leaf as it has only one edge (connection with ‘M’). This clearly shows that the leaf node (‘P’) gives us a tree of height ‘6’ whereas its adjacent non-leaf node (‘M’) gives us a tree with smaller height ‘5’ - since ‘P’ will be a child of ‘M’.

This gives us a strategy to find MHTs. Since leaves can’t give us MHT, we can remove them from the graph and remove their edges too. Once we remove the leaves, we will have new leaves. Since these new leaves can’t give us MHT, we will repeat the process and remove them from the graph too. We will prune the leaves until we are left with one or two nodes which will be our answer and the roots for MHTs.

We can implement the above process using the topological sort. Any node with only one edge (i.e., a leaf) can be our source and, in a stepwise fashion, we can remove all sources from the graph to find new sources. We will repeat this process until we are left with one or two nodes in the graph, which will be our answer.

Code
Here is what our algorithm will look like:*/
const Deque = require('./collections/deque'); //http://www.collectionsjs.com

function find_trees(nodes, edges) {
  if (nodes <= 0) {
    return [];
  }

  // with only one node, since its in-degrees will be 0, therefore, we need to handle it separately
  if (nodes === 1) {
    return [0];
  }

  // a. Initialize the graph
  const inDegree = Array(nodes).fill(0); // count of incoming edges
  const graph = Array(nodes)
    .fill(0)
    .map(() => Array()); // adjacency list graph

  // b. Build the graph
  edges.forEach((edge) => {
    let n1 = edge[0],
      n2 = edge[1];
    // since this is an undirected graph, therefore, add a link for both the nodes
    graph[n1].push(n2);
    graph[n2].push(n1);
    // increment the in-degrees of both the nodes
    inDegree[n1] += 1;
    inDegree[n2] += 1;
  });

  // c. Find all leaves i.e., all nodes with 1 in-degrees
  const leaves = new Deque();
  for (i = 0; i < inDegree.length; i++) {
    if (inDegree[i] === 1) {
      leaves.push(i);
    }
  }

  // d. Remove leaves level by level and subtract each leave's children's in-degrees.
  // Repeat this until we are left with 1 or 2 nodes, which will be our answer.
  // Any node that has already been a leaf cannot be the root of a minimum height tree, because
  // its adjacent non-leaf node will always be a better candidate.
  let totalNodes = nodes;
  while (totalNodes > 2) {
    leavesSize = leaves.length;
    totalNodes -= leavesSize;
    for (i = 0; i < leavesSize; i++) {
      vertex = leaves.shift();
      // get the node's children to decrement their in-degrees
      graph[vertex].forEach((child) => {
        // get the node's children to decrement their in-degrees
        inDegree[child] -= 1;
        if (inDegree[child] === 1) {
          leaves.push(child);
        }
      });
    }
  }

  return leaves.toArray();
}

console.log(
  `Roots of MHTs: ${find_trees(5, [
    [0, 1],
    [1, 2],
    [1, 3],
    [2, 4],
  ])}`
);
console.log(
  `Roots of MHTs: ${find_trees(4, [
    [0, 1],
    [0, 2],
    [2, 3],
  ])}`
);
console.log(
  `Roots of MHTs: ${find_trees(4, [
    [1, 2],
    [1, 3],
  ])}`
);
/* Time complexity
In step ‘d’, each node can become a source only once and each edge will be accessed and removed once. Therefore, the time complexity of the above algorithm will be O(V+E), where ‘V’ is the total nodes and ‘E’ is the total number of the edges.

Space complexity
The space complexity will be O(V+E), since we are storing all of the edges for each node in an adjacency list.*/
