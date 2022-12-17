//Tasks Scheduling Order (medium)
/*Problem Statement
There are ‘N’ tasks, labeled from ‘0’ to ‘N-1’. Each task can have some prerequisite tasks which need to be completed before it can be scheduled. Given the number of tasks and a list of prerequisite pairs, write a method to find the ordering of tasks we should pick to finish all tasks.

Example 1:

Input: Tasks=3, Prerequisites=[0, 1], [1, 2]
Output: [0, 1, 2]
Explanation: To execute task '1', task '0' needs to finish first. Similarly, task '1' needs
to finish before '2' can be scheduled. A possible scheduling of tasks is: [0, 1, 2]
Example 2:

Input: Tasks=3, Prerequisites=[0, 1], [1, 2], [2, 0]
Output: []
Explanation: The tasks have a cyclic dependency, therefore they cannot be scheduled.
Example 3:

Input: Tasks=6, Prerequisites=[2, 5], [0, 5], [0, 4], [1, 4], [3, 2], [1, 3]
Output: [0 1 4 3 2 5]
Explanation: A possible scheduling of tasks is: [0 1 4 3 2 5]
Try it yourself
Try solving this question here:*/
const find_order = function (tasks, prerequisites) {
  const sortedOrder = [];
  // TODO: Write your code here
  if (tasks <= 0) return [];

  let inDegree = Array(tasks).fill(0);
  let graph = Array(tasks)
    .fill(0)
    .map(() => Array());

  prerequisites.forEach((prerequisite) => {
    let parent = prerequisite[0];
    let child = prerequisite[1];
    graph[parent].push(child);
    inDegree[child]++;
  });

  const source = [];

  for (let i = 0; i < inDegree.length; i++) {
    if (inDegree[i] === 0) source.push(i);
  }

  while (source.length) {
    let vertex = source.shift();
    sortedOrder.push(vertex);
    graph[vertex].forEach((child) => {
      inDegree[child]--;
      if (inDegree[child] === 0) source.push(child);
    });
  }
  if (sortedOrder.length !== tasks) return [];

  return sortedOrder;
};

console.log(
  `Is scheduling possible: ${find_order(3, [
    [0, 1],
    [1, 2],
  ])}`
);
console.log(
  `Is scheduling possible: ${find_order(3, [
    [0, 1],
    [1, 2],
    [2, 0],
  ])}`
);
console.log(
  `Is scheduling possible: ${find_order(6, [
    [2, 5],
    [0, 5],
    [0, 4],
    [1, 4],
    [3, 2],
    [1, 3],
  ])}`
);
/*Solution
This problem is similar to Tasks Scheduling, the only difference being that we need to find the best ordering of tasks so that it is possible to schedule them all.

Code
Here is what our algorithm will look like (only the highlighted lines have changed):*/
const Deque = require('./collections/deque'); //http://www.collectionsjs.com

function find_order(tasks, prerequisites) {
  sortedOrder = [];
  if (tasks <= 0) {
    return sortedOrder;
  }

  // a. Initialize the graph
  const inDegree = Array(tasks).fill(0); // count of incoming edges
  const graph = Array(tasks)
    .fill(0)
    .map(() => Array()); // adjacency list graph

  // b. Build the graph
  prerequisites.forEach((prerequisite) => {
    let parent = prerequisite[0],
      child = prerequisite[1];
    graph[parent].push(child); // put the child into it's parent's list
    inDegree[child]++; // increment child's inDegree
  });
  console.log('g', graph, inDegree);

  // c. Find all sources i.e., all vertices with 0 in-degrees
  const sources = new Deque();
  for (i = 0; i < inDegree.length; i++) {
    if (inDegree[i] === 0) {
      sources.push(i);
    }
  }

  // d. For each source, add it to the sortedOrder and subtract one from all of its children's in-degrees
  // if a child's in-degree becomes zero, add it to the sources queue
  while (sources.length > 0) {
    const vertex = sources.shift();
    sortedOrder.push(vertex);
    graph[vertex].forEach((child) => {
      // get the node's children to decrement their in-degrees
      inDegree[child] -= 1;
      if (inDegree[child] === 0) {
        sources.push(child);
      }
    });
  }

  // if sortedOrder doesn't contain all tasks, there is a cyclic dependency between tasks, therefore, we
  // will not be able to schedule all tasks
  if (sortedOrder.length !== tasks) {
    return [];
  }

  return sortedOrder;
}

console.log(
  `Is scheduling possible: ${find_order(3, [
    [0, 1],
    [1, 2],
  ])}`
);
console.log(
  `Is scheduling possible: ${find_order(3, [
    [0, 1],
    [1, 2],
    [2, 0],
  ])}`
);
console.log(
  `Is scheduling possible: ${find_order(6, [
    [0, 4],
    [1, 4],
    [3, 2],
    [1, 3],
  ])}`
);
/* Time complexity
In step ‘d’, each task can become a source only once and each edge (prerequisite) will be accessed and removed once. Therefore, the time complexity of the above algorithm will be O(V+E), where ‘V’ is the total number of tasks and ‘E’ is the total number of prerequisites.

Space complexity
The space complexity will be O(V+E), since we are storing all of the prerequisites for each task in an adjacency list.

Similar Problems
Course Schedule: There are ‘N’ courses, labeled from ‘0’ to ‘N-1’. Each course has some prerequisite courses which need to be completed before it can be taken. Given the number of courses and a list of prerequisite pairs, write a method to find the best ordering of the courses that a student can take in order to finish all courses.

Solution: This problem is exactly similar to our parent problem. In this problem, we have courses instead of tasks.*/
