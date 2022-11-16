//Flood Fill (easy)
/*Problem Statement

Any image can be represented by a 2D integer array (i.e., a matrix) where each cell represents the pixel value of the image.

Flood fill algorithm takes a starting cell (i.e., a pixel) and a color. The given color is applied to all horizontally and vertically connected cells with the same color as that of the starting cell. Recursively, the algorithm fills cells with the new color until it encounters a cell with a different color than the starting cell.

Given a matrix, a starting cell, and a color, flood fill the matrix.

Example 1

Input: matrix =



     starting cell = (1, 3)
     new color = 2
Output:


Example 2

Input: matrix =



     starting cell = (3, 2)
     new color = 5
Output:



Solution

The question follows the Island pattern and is quite similar to Number of Islands problem.

From the given starting cell, we can perform a Depth First Search (DFS) or Breadth First Search (BFS) to find all of its connected cells with the same color. During our DFS or BFS traversal, we will update the cells with the new color.

Following is the DFS or BFS traversal of the example-2 mentioned above:


Code  (DFS)

Here is what our DFS algorithm will look like: */


// function flood_fill_DFS(matrix, x, y, newColor) {
//   if (matrix[x][y] != newColor)
//     fill_DFS(matrix, x, y, matrix[x][y], newColor)

//   return matrix;
// }

// function fill_DFS(matrix, x, y, oldColor, newColor) {
//   if (x < 0 || x >= matrix.length || y < 0 || y >= matrix[0].length)
//     return; // return, if it is not a valid cell
//   if (matrix[x][y] !== oldColor)
//     return; // return, if it is not the required color

//   matrix[x][y] = newColor;  // update the cell to the new color

//   // recursively visit all neighboring cells (horizontally & vertically)
//   fill_DFS(matrix, x + 1, y, oldColor, newColor); // lower cell
//   fill_DFS(matrix, x - 1, y, oldColor, newColor); // upper cell
//   fill_DFS(matrix, x, y + 1, oldColor, newColor); // right cell
//   fill_DFS(matrix, x, y - 1, oldColor, newColor); // left cell
// }

// console.log(flood_fill_DFS([
//   [0, 1, 1, 1, 0],
//   [0, 0, 0, 1, 1],
//   [0, 1, 1, 1, 0],
//   [0, 1, 1, 0, 0],
//   [0, 0, 0, 0, 0]
// ], 1, 3, 2));
// console.log(flood_fill_DFS([
//   [0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0],
//   [0, 0, 1, 1, 0],
//   [0, 0, 1, 0, 0],
//   [0, 0, 1, 0, 0]
// ], 3, 2, 5));


/*Time Complexity


Time complexity the above algorithm will be O(N)O(M*N), where ‘M’ is the number of rows and 'N' is the number of columns of the input matrix. This is due to the fact that, in the worst case, we might have to fill the whole matrix.

Space Complexity

DFS recursion stack can go M*N deep when we have to fill the whole matrix. Hence, the space complexity will be O(M*N), where ‘M’ is the number of rows and 'N' is the number of columns of the input matrix.*/

function floodFill(matrix, x, y, newColor) {
  if(matrix[x][y] !== newColor) {
    fillColor(matrix, x, y, matrix[x][y], newColor)
  }
  return matrix
}

function fillColor(matrix, x, y, oldColor, newColor) {
  if (x < 0 || x >= matrix.length || y < 0 || y >= matrix[0].length)  return
    matrix[x][y] = newColor;
  if(matrix[x][y] !== oldColor) return;
   fillColor(matrix, x, y-1, oldColor, newColor)
   fillColor(matrix, x, y+1, oldColor, newColor)
   fillColor(matrix, x-1, y, oldColor, newColor)
   fillColor(matrix, x+1, y, oldColor, newColor)
}

console.log(floodFill([
  [0, 1, 1, 1, 0],
  [0, 0, 0, 1, 1],
  [0, 1, 1, 1, 0],
  [0, 1, 1, 0, 0],
  [0, 0, 0, 0, 0]
], 1, 3, 2));
console.log(floodFill([
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 1, 1, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0]
], 3, 2, 5));
