// //Number of Islands (easy)
// /*Problem Statement

// Given a 2D array (i.e., a matrix) containing only 1s (land) and 0s (water), count the number of islands in it.

// An island is a connected set of 1s (land) and is surrounded by either an edge or 0s (water). Each cell is considered connected to other cells horizontally or vertically (not diagonally).

// Example 1

// Input: matrix =


// Output: 1
// Explanation: The matrix has only one island. See the highlighted cells below.

// Example 2

// Input: matrix =


// Output: 3
// Explanation: The matrix has three islands. See the highlighted cells below.

// Solution

// We can traverse the matrix linearly to find islands.

// Whenever we find a cell with the value '1' (i.e., land), we have found an island. Using that cell as the root node, we will perform a Depth First Search (DFS) or Breadth First Search (BFS) to find all of its connected land cells. During our DFS or BFS traversal, we will find and mark all the horizontally and vertically connected land cells.

// We need to have a mechanism to mark each land cell to ensure that each land cell is visited only once. To mark a cell visited, we have two options:
// We can update the given input matrix. Whenever we see a '1', we will make it '0'.
// A separate boolean matrix can be used to record whether or not each cell has been visited.

// Following is the DFS or BFS traversal of the example-2 mentioned above:


// By following the above algorithm, every time DFS or BFS is triggered, we are sure that we have found an island. We will keep a running count to calculate the total number of islands.

// Bellow, we will see three solutions based on:
// DFS
// BFS
// BFS with visited matrix
// Code  (DFS)

// Here is what our DFS algorithm will look like. We will update the input matrix to mark cells visited.

// */
// function count_islands_DFS(matrix) {
//   const rows = matrix.length;
//   const cols = matrix[0].length;
//   let totalIslands = 0;
//   for (let i = 0; i < rows; i++) {
//     for (let j = 0; j < cols; j++) {
//       if (matrix[i][j] === 1) { // only if the cell is a land
//         // we have found an island
//         totalIslands++;
//         visit_island_DFS(matrix, i, j);
//       }
//     }
//   }
//   return totalIslands;
// }

// function visit_island_DFS(matrix, x, y) {
//   if (x < 0 || x >= matrix.length || y < 0 || y >= matrix[0].length)
//     return; // return, if it is not a valid cell
//   if (matrix[x][y] === 0)
//     return; // return, if it is a water cell

//   matrix[x][y] = 0; // mark the cell visited by making it a water cell

//   // recursively visit all neighboring cells (horizontally & vertically)
//   visit_island_DFS(matrix, x + 1, y); // lower cell
//   visit_island_DFS(matrix, x - 1, y); // upper cell
//   visit_island_DFS(matrix, x, y + 1); // right cell
//   visit_island_DFS(matrix, x, y - 1); // left cell
// }

// console.log(count_islands_DFS([
//   [0, 1, 1, 1, 0],
//   [0, 0, 0, 1, 1],
//   [0, 1, 1, 1, 0],
//   [0, 1, 1, 0, 0],
//   [0, 0, 0, 0, 0]
// ]));
// console.log(count_islands_DFS([
//   [1, 1, 1, 0, 0],
//   [0, 1, 0, 0, 1],
//   [0, 0, 1, 1, 0],
//   [0, 0, 1, 0, 0],
//   [0, 0, 1, 0, 0]
// ]));

// /*Time Complexity


// Time complexity of the above algorithm will be O(N)O(M*N), where ‘M’ is the number of rows and 'N' is the number of columns of the input matrix. This is due to the fact that we have to traverse the whole matrix to find the islands.

// Space Complexity

// DFS recursion stack can go M*N deep when the whole matrix is filled with '1's. Hence, the space complexity will be O(M*N), where ‘M’ is the number of rows and 'N' is the number of columns of the input matrix.*/

// // Code  (BFS)

// // Here is what our BFS algorithm will look like. We will update the input matrix to mark cells visited.

// function count_islands_BFS(matrix) {
//   const rows = matrix.length;
//   const cols = matrix[0].length;
//   let totalIslands = 0;
//   for (let i = 0; i < rows; i++) {
//     for (let j = 0; j < cols; j++) {
//       if (matrix[i][j] === 1) { // only if the cell is a land
//         // we have found an island
//         totalIslands++;
//         visit_island_BFS(matrix, i, j);
//       }
//     }
//   }
//   return totalIslands;
// }

// function visit_island_BFS(matrix, x, y) {
//   const neighbors = [[x, y]];
//   while (neighbors.length > 0) {
//     const cell = neighbors.shift();
//     const row = cell[0];
//     const col = cell[1];

//     if (row < 0 || row >= matrix.length || col < 0 || col >= matrix[0].length)
//       continue; // continue, if it is not a valid cell
//     if (matrix[row][col] == 0)
//       continue; // continue if it is a water cell

//     matrix[row][col] = 0; // mark the cell visited by making it a water cell

//     // insert all neighboring cells to the queue for BFS
//     neighbors.push([row + 1, col]); // lower cell
//     neighbors.push([row - 1, col]); // upper cell
//     neighbors.push([row, col + 1]); // right cell
//     neighbors.push([row, col - 1]); // left cell
//   }
// }

// console.log(count_islands_BFS([
//   [0, 1, 1, 1, 0],
//   [0, 0, 0, 1, 1],
//   [0, 1, 1, 1, 0],
//   [0, 1, 1, 0, 0],
//   [0, 0, 0, 0, 0]
// ]));
// console.log(count_islands_BFS([
//   [1, 1, 1, 0, 0],
//   [0, 1, 0, 0, 1],
//   [0, 0, 1, 1, 0],
//   [0, 0, 1, 0, 0],
//   [0, 0, 1, 0, 0]
// ]));

// /*Time Complexity


// Time complexity of the above algorithm will be O(N)O(M*N), where ‘M’ is the number of rows and 'N' is the number of columns.

// Space Complexity

// Space complexity of the above algorithm will be O(min(M,N). In the worst case, when the matrix is completely filled with land cells, the size of the queue can grow up to min(M,N).*/

// //Code  (BFS with visited matrix)


// // This is just a sample script. Paste your real code (javascript or HTML) here.
// function count_islands_BFS(matrix) {
//   const rows = matrix.length;
//   const cols = matrix[0].length;
//   let totalIslands = 0;
//   const visited = Array(rows).fill(false).map(() => Array(cols).fill(false));

//   for (let i = 0; i < rows; i++) {
//     for (let j = 0; j < cols; j++) {
//       // if the cell has not been visited before and is a land
//       if (matrix[i][j] === 1 && !visited[i][j]) {
//         // we have found an island
//         totalIslands++;
//         visit_island_BFS(matrix, visited, i, j);
//       }
//     }
//   }
//   return totalIslands;
// }

// function visit_island_BFS(matrix, visited, x, y) {
//   const neighbors = [[x, y]];
//   while (neighbors.length > 0) {
//     const cell = neighbors.shift();
//     const row = cell[0];
//     const col = cell[1];

//     if (row < 0 || row >= matrix.length || col < 0 || col >= matrix[0].length)
//       continue; // continue, if it is not a valid cell
//     if (matrix[row][col] == 0 || visited[row][col])
//       continue; // continue if the cell is water or visited

//     visited[row][col] = true; // mark the visited array

//     // insert all neighboring cells to the queue for BFS
//     neighbors.push([row + 1, col]); // lower cell
//     neighbors.push([row - 1, col]); // upper cell
//     neighbors.push([row, col + 1]); // right cell
//     neighbors.push([row, col - 1]); // left cell
//   }
// }

// console.log(count_islands_BFS([
//   [0, 1, 1, 1, 0],
//   [0, 0, 0, 1, 1],
//   [0, 1, 1, 1, 0],
//   [0, 1, 1, 0, 0],
//   [0, 0, 0, 0, 0]
// ]));
// console.log(count_islands_BFS([
//   [1, 1, 1, 0, 0],
//   [0, 1, 0, 0, 1],
//   [0, 0, 1, 1, 0],
//   [0, 0, 1, 0, 0],
//   [0, 0, 1, 0, 0]
// ]));

/*Time Complexity


Time complexity of the above algorithm will be O(N)O(M*N), where ‘M’ is the number of rows and 'N' is the number of columns.

Space Complexity

Because of the visited array and max size of the queue, the space complexity will be O(M*N), where ‘M’ is the number of rows and 'N' is the number of columns of the input matrix.*/

//My Solution

function numberOfIslands(matrix) {
  let count = 3;

  for(let i =0; i < matrix.length; i++) {
    for(let j =0; j< matrix[0].length; j++) {
      if(matrix[i][j] ==1 ) {
        visitIsland(matrix, i, j, count++)
      }
    }
  }
    return count -3;
}
  function visitIsland(matrix, i, j, number) {
    matrix[i][j] = number
    if(matrix[i][j-1] == 1) {
      matrix[i][j-1] =  number;
      visitIsland(matrix, i, j-1, number)
    }

    if(matrix[i][j+1] == 1) {
      matrix[i][j+1] =  number;
      visitIsland(matrix, i, j+1, number)
    }
    if(matrix[i-1] !== undefined && matrix[i-1][j] == 1) {
      matrix[i-1][j] =  number;
      visitIsland(matrix, i-1, j, number)
    }
    if(matrix[i+1] !== undefined && matrix[i+1][j] == 1) {
      matrix[i+1][j] =  number;
      visitIsland(matrix, i+1, j, number)
    }
    return;
  }

  console.log(numberOfIslands([
    ["1","1","1","1","0"],
    ["1","1","0","1","0"],
    ["1","1","0","0","0"],
    ["0","0","0","0","0"]
  ]))

  console.log(numberOfIslands([
    ["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
  ]))
