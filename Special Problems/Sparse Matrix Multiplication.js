/*
11. Sparse Matrix Multiplication
Medium
933
328
company
Bloomberg
company
Apple
company
Facebook
Given two sparse matrices mat1 of size m x k and mat2 of size k x n, return the result of mat1 x mat2. You may assume that multiplication is always possible.



Example 1:


Input: mat1 = [[1,0,0],[-1,0,3]], mat2 = [[7,0,0],[0,0,0],[0,0,1]]
Output: [[7,0,0],[-7,0,3]]
Example 2:

Input: mat1 = [[0]], mat2 = [[0]]
Output: [[0]]*/
var multiply = function (mat1, mat2) {
  const result = Array(mat1.length)
    .fill(0)
    .map(() => Array(mat2[0].length).fill(0));

  for (let i = 0; i < mat1.length; i++) {
    for (let j = 0; j < mat2[0].length; j++) {
      let crossIdx = 0;
      while (crossIdx < mat2.length) {
        result[i][j] += mat1[i][crossIdx] * mat2[crossIdx][j];
        crossIdx++;
      }
    }
  }
  return result;
};
