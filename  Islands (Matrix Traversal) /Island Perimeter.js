//Island Perimeter (easy)
/*Problem Statement

You are given a 2D matrix containing only 1s (land) and 0s (water).

An island is a connected set of 1s (land) and is surrounded by either an edge or 0s (water). Each cell is considered connected to other cells horizontally or vertically (not diagonally).

There are no lakes on the island, so the water inside the island is not connected to the water around it. A cell is a square with a side length of 1..

The given matrix has only one island, write a function to find the perimeter of that island.

Example 1

Input: matrix =
[
  [1, 1, 0, 0, 0],
  [0, 1, 0, 0, 0],
  [0, 1, 0, 0, 0],
  [0, 1, 1, 0, 0],
  [0, 0, 0, 0, 0]
]



Output: 14
Explanation: The boundary of the island constitute 14 sides.

Example 2

Input: matrix =
[
  [0, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 1, 0],
  [0, 1, 0, 0]
]));



Output: 12
Explanation: The boundary of the island constitute 12 sides.

Solution

The question follows the Island pattern and is quite similar to Number of Islands problem.

We will traverse the matrix linearly to find the island. We can use the Depth First Search (DFS) or Breadth First Search (BFS) to traverse the island i.e., to find all of its connected land cells.

How do we calculate the boundary if the island?

Each cell has four sides. Each side of an island cell can be shared with another cell; we can include the side in the island perimeter only if the other cell is a water.



 If a cell side is on boundary, we should include that side in the perimeter.

 Following piece of code will cover these two conditions:


 if (x < 0 || x >= matrix.length || y < 0 || y >= matrix[0].length)
   return 1; // returning 1, since this a boundary cell initiated this DFS call
 if (matrix[x][y] == 0)
   return 1; // returning 1, because of the shared side b/w a water and a land cell

Code  (DFS)

Here is what our DFS algorithm will look like. We will use a separate matrix to mark nodes visited.*/

// function find_island_perimeter_DFS(matrix) {
//   const rows = matrix.length;
//   const cols = matrix[0].length;
//   const visited = Array(rows).fill(false).map(() => Array(cols).fill(false));

//   for (let i = 0; i < rows; i++) {
//     for (let j = 0; j < cols; j++) {
//       if (matrix[i][j] === 1 && !visited[i][j]) // only if the cell is a land and not visited
//         return island_perimeter_DFS(matrix, visited, i, j);
//     }
//   }
//   return 0;
// }

// function island_perimeter_DFS(matrix, visited, x, y) {
//   if (x < 0 || x >= matrix.length || y < 0 || y >= matrix[0].length)
//     return 1; // returning 1, since this a boundary cell initiated this DFS call
//   if (matrix[x][y] == 0)
//     return 1; // returning 1, because of the shared side b/w a water and a land cell

//   if (visited[x][y])
//     return 0; // we have already taken care of this cell

//   visited[x][y] = true; // mark the cell visited

//   let edgeCount = 0;
//   // recursively visit all neighboring cells (horizontally & vertically)
//   edgeCount += island_perimeter_DFS(matrix, visited, x + 1, y); // lower cell
//   edgeCount += island_perimeter_DFS(matrix, visited, x - 1, y); // upper cell
//   edgeCount += island_perimeter_DFS(matrix, visited, x, y + 1); // right cell
//   edgeCount += island_perimeter_DFS(matrix, visited, x, y - 1); // left cell

//   return edgeCount;
// }

// console.log(find_island_perimeter_DFS([
//   [1, 1, 0, 0, 0],
//   [0, 1, 0, 0, 0],
//   [0, 1, 0, 0, 0],
//   [0, 1, 1, 0, 0],
//   [0, 0, 0, 0, 0]
// ]));

// console.log(find_island_perimeter_DFS([
//   [0, 0, 0, 0],
//   [0, 1, 0, 0],
//   [0, 1, 0, 0],
//   [0, 1, 1, 0],
//   [0, 1, 0, 0]
// ]));

/*Time Complexity


Time complexity of the above algorithm will be O(N)O(M*N), where ‘M’ is the number of rows and 'N' is the number of columns of the input matrix. This is due to the fact that we have to traverse the whole matrix to find the island.

Space Complexity

DFS recursion stack can go M*N deep when the whole matrix is filled with '1's. Hence, the space complexity will be O(M*N), where ‘M’ is the number of rows and 'N' is the number of columns of the input matrix. */

//My solution

function find_island_perimeter(matrix) {
  let visited = Array(matrix.length).fill(false).map(() => Array(matrix[0]).fill(false))
  console.log('v', visited)
  for(let i = 0; i < matrix.length; i++) {
    for(let j =0; j < matrix[0].length; j++) {
      if(matrix[i][j] === 1 && !visited[i][j]) return islandPerimeter(matrix, visited, i,j)
    }
  }
  return 0;

}

function islandPerimeter(matrix, visited,x,y) {
  let edgeCount = 0;
  if(x<0 || x>=matrix.length || y <0 || y > matrix[0].length) return 1

  if(matrix[x][y] === 0) return 1;

  if(visited[x][y]) return 0;

  visited[x][y] = true;

  edgeCount +=  islandPerimeter(matrix, visited,x-1,y);
  edgeCount +=  islandPerimeter(matrix, visited,x+1,y);
  edgeCount +=  islandPerimeter(matrix, visited,x,y-1);
  edgeCount +=  islandPerimeter(matrix, visited,x,y+1);

  return edgeCount;

}

console.log(
  find_island_perimeter([
    [1, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0],
  ])
);

console.log(
  find_island_perimeter([
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 0, 0],
  ])
);
