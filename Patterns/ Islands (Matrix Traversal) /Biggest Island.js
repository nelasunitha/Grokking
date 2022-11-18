//Biggest Island (easy)
// Problem Statement

// Given a 2D array (i.e., a matrix) containing only 1s (land) and 0s (water), find the biggest island in it. Write a function to return the area of the biggest island.

// An island is a connected set of 1s (land) and is surrounded by either an edge or 0s (water). Each cell is considered connected to other cells horizontally or vertically (not diagonally).

// Example 1

// Input: matrix = [
    // [1, 1, 1, 0, 0],
    // [0, 1, 0, 0, 1],
    // [0, 0, 1, 1, 0],
    // [0, 1, 1, 0, 0],
    // [0, 0, 1, 0, 0],

// Output: 5
// Explanation: The matrix has three islands. The biggest island has 5 cells .

// Solution

// The question follows the Island pattern and is quite similar to Number of Islands problem.

// We will traverse the matrix linearly to find islands.

// Whenever we find a cell with the value '1' (i.e., land), we have found an island. Using that cell as the root node, we will perform a Depth First Search (DFS) or Breadth First Search (BFS) to find all of its connected land cells. During our DFS or BFS traversal, we will find and mark all the horizontally and vertically connected land cells.

// We will keep a variable to remember the max area of any island.

// Code  (DFS)

// Here is what our DFS algorithm will look like. We will update the input matrix to mark nodes visited.

// function max_area_islands_DFS(matrix) {
//   const rows = matrix.length;
//   const cols = matrix[0].length;
//   let biggestIslandArea = 0;

//   for (let i = 0; i < rows; i++) {
//     for (let j = 0; j < cols; j++) {
//       if (matrix[i][j] === 1) { // only if the cell is a land
//         // we have found an island
//         biggestIslandArea = Math.max(biggestIslandArea, visit_island_DFS(matrix, i, j));
//       }
//     }
//   }
//   return biggestIslandArea;
// }

// function visit_island_DFS(matrix, x, y) {
//   if (x < 0 || x >= matrix.length || y < 0 || y >= matrix[0].length)
//     return 0; // return, if it is not a valid cell
//   if (matrix[x][y] === 0)
//     return 0; // return, if it is a water cell

//   matrix[x][y] = 0; // mark the cell visited by making it a water cell

//   let area = 1; // counting the current cell
//   // recursively visit all neighboring cells (horizontally & vertically)
//   area += visit_island_DFS(matrix, x + 1, y); // lower cell
//   area += visit_island_DFS(matrix, x - 1, y); // upper cell
//   area += visit_island_DFS(matrix, x, y + 1); // right cell
//   area += visit_island_DFS(matrix, x, y - 1); // left cell

//   return area;
// }

// console.log(max_area_islands_DFS([
//   [1, 1, 1, 0, 0],
//   [0, 1, 0, 0, 1],
//   [0, 0, 1, 1, 0],
//   [0, 1, 1, 0, 0],
//   [0, 0, 1, 0, 0]
// ]));

/*Time Complexity


Time complexity of the above algorithm will be O(N)O(M*N), where ‘M’ is the number of rows and 'N' is the number of columns of the input matrix. This is due to the fact that we have to traverse the whole matrix to find islands.

Space Complexity

DFS recursion stack can go M*N deep when the whole matrix is filled with '1's. Hence, the space complexity will be O(M*N), where ‘M’ is the number of rows and 'N' is the number of columns of the input matrix.*/

//My Solution

function max_area_islands(matrix) {
  let biggestIslandArea = 0;

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 1) {
        biggestIslandArea = Math.max(
          biggestIslandArea,
          visitIsland(matrix, i, j)
        );
      }
    }
  }
  return biggestIslandArea;
}
function visitIsland(matrix, i, j) {
  let area = 1;
  matrix[i][j] = 0;
  if (matrix[i][j - 1] === 1) {
    area += visitIsland(matrix, i, j - 1);
  }

  if (matrix[i][j + 1] === 1) {
    area += visitIsland(matrix, i, j + 1);
  }
  if (matrix[i - 1] !== undefined && matrix[i - 1][j] === 1) {
    area += visitIsland(matrix, i - 1, j);
  }
  if (matrix[i + 1] !== undefined && matrix[i + 1][j] === 1) {
    area += visitIsland(matrix, i + 1, j);
  }
  return area;
}

console.log(
  max_area_islands([
    [1, 1, 1, 0, 0],
    [0, 1, 0, 0, 1],
    [0, 0, 1, 1, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ])
);


console.log(
  max_area_islands([[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]))

  console.log(
    max_area_islands([[[0,0,0,0,0,0,0,0]]]))
