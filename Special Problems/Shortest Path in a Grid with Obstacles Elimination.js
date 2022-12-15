//Shortest Path in a Grid with Obstacles Elimination(hard)
//https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/

/*
You are given an m x n integer matrix grid where each cell is either 0 (empty) or 1 (obstacle). You can move up, down, left, or right from and to an empty cell in one step.

Return the minimum number of steps to walk from the upper left corner (0, 0) to the lower right corner (m - 1, n - 1) given that you can eliminate at most k obstacles. If it is not possible to find such walk return -1.

Example 1:


Input: grid = [[0,0,0],
               [1,1,0],
               [0,0,0],
               [0,1,1],
               [0,0,0]], k = 1
Output: 6
Explanation:
The shortest path without eliminating any obstacle is 10.
The shortest path with one obstacle elimination at position (3,2) is 6. Such path is (0,0) -> (0,1) -> (0,2) -> (1,2) -> (2,2) -> (3,2) -> (4,2).
Example 2:


Input: grid = [[0,1,1],
               [1,1,1],
               [1,0,0]], k = 1
Output: -1
Explanation: We need to eliminate at least two obstacles to find such a walk.*/

//var shortestPath = function (grid, k) {
/**
      Concept:
      -- Since we are given a grid of cells and we have to find the shortest path between two cells,
         we can solve this problem using BFS.
      -- The grid may contain many obstacles and there are K obstacles that can be eliminated.
      -- Once we have eliminated K obstacles, there's no path and an alternate path must be considered
      -- Therefore, we must know at each cell we are visiting what value of K we brought to that cell
      -- Also, to avoid getting stuck in a loop of wrong path, we must avoid paths already visited

      Approach:
      -- Push a tuple [ row, col, remainingK ] into a queue. Also put combination as seen in a set.
      -- For each tuple that we remove from the queue:
         -- Check if row and col are lower right coordinates. If true, return moves taken so far.
         -- If not true,
            -- Move in each of the four directions from that cell to find its neighbor
            -- Validate the neighbor:
               -- Check for out of bounds
               -- Check if neighbor cell has an obstacle and if K is exhausted
            -- If validated, do the following if neighbor is not seen before:
               -- If not obstacle, add neighbor coordinates and remaining K to queue and set.
               -- If obstacle, decrement remaining k and add values to queue and set.
  */

// Time Complexity: O(m*n) --> Worst case traversing all cells
// Space Complexity: O(m*n) --> Worst case storing all cells

//   if (!grid || grid.length === 0) return 0;

//   const rows = grid.length,
//     cols = grid[0].length;
//   const directions = [
//     [-1, 0],
//     [1, 0],
//     [0, -1],
//     [0, 1],
//   ];
//   const visited = new Set();
//   visited.add(`0-0-${k}`);

//   let moves = 0,
//     queue = [[0, 0, k]]; // Starting coordinates and k

//   while (queue.length > 0) {
//     let nextMoves = [];

//     while (queue.length > 0) {
//       let [x, y, remainingK] = queue.pop();

//       if (x === rows - 1 && y === cols - 1) return moves; // Reached destination => return moves

//       for (const direction of directions) {
//         let row = x + direction[0],
//           col = y + direction[1];

//         // Check for out of bounds or too many obstacles to eliminate
//         if (
//           row < 0 ||
//           col < 0 ||
//           row >= rows ||
//           col >= cols ||
//           (grid[row][col] === 1 && remainingK === 0)
//         )
//           continue;

//         // Consider a decremented k while discovering next 4 neighbors if obstacle
//         let newK = grid[row][col] === 1 ? remainingK - 1 : remainingK;
//         let key = `${row}-${col}-${newK}`;

//         if (!visited.has(key)) {
//           visited.add(key);
//           nextMoves.push([row, col, newK]);
//         }
//       }
//     }

//     queue = nextMoves;
//     moves++;
//   }

//   return -1; // return -1 if no path found
// };

//Solution 2
var shortestPath = function (grid, k) {
  let X = grid.length;
  let Y = grid[0].length;

  let visited = new Set();

  let q = [{ x: 0, y: 0, s: 0, o: 0 }]; // Steps
  while (q.length !== 0) {
    let cur = q.shift();
    let coord = `${cur.x} ${cur.y} ${cur.o}`;

    if (
      cur.x < 0 ||
      cur.x === X ||
      cur.y < 0 ||
      cur.y === Y ||
      visited.has(coord) ||
      cur.o > k
    ) {
      continue;
    }

    if (grid[cur.x][cur.y] === 1) {
      ++cur.o;
    }

    if (cur.x === X - 1 && cur.y === Y - 1) {
      return cur.s;
    }

    visited.add(coord);

    q.push({ x: cur.x - 1, y: cur.y, s: cur.s + 1, o: cur.o });
    q.push({ x: cur.x + 1, y: cur.y, s: cur.s + 1, o: cur.o });
    q.push({ x: cur.x, y: cur.y - 1, s: cur.s + 1, o: cur.o });
    q.push({ x: cur.x, y: cur.y + 1, s: cur.s + 1, o: cur.o });
  }
  return -1;
};
console.log(
  shortestPath(
    [
      [0, 0, 0],
      [1, 1, 0],
      [0, 0, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    1
  )
);

//Easy understandable
/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
function shortestPath(grid, k) {
  const rows = grid.length,
    cols = grid[0].length;
  const neighbors = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  const queue = [[0, 0, k]];
  const visited = new Set(`0-0-${k}`);

  let depth = 0;
  while (queue.length > 0) {
    const currNeighLen = queue.length;
    for (let i = 0; i < currNeighLen; i++) {
      let [row, col, obstacleQuota] = queue.shift();

      if (row === rows - 1 && col === cols - 1) {
        return depth;
      }

      for (let [nRow, nCol] of neighbors) {
        nRow += row;
        nCol += col;
        if (nRow >= 0 && nRow < rows && nCol >= 0 && nCol < cols) {
          const remainQuota = obstacleQuota - grid[nRow][nCol];
          // if remainQuota valid, non negative. and if cell was not visited before
          if (
            remainQuota >= 0 &&
            !visited.has(`${nRow}-${nCol}-${remainQuota}`)
          ) {
            queue.push([nRow, nCol, remainQuota]);
            visited.add(`${nRow}-${nCol}-${remainQuota}`);
          }
        }
      }
    }
    depth += 1;
  }

  return -1;
}
