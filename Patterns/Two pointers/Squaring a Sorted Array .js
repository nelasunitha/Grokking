//Squaring a Sorted Array (easy)
/*Problem Statement#
Given a sorted array, create a new array containing squares of all the numbers of the input array in the sorted order.

Example 1:

Input: [-2, -1, 0, 2, 3]
Output: [0, 1, 4, 4, 9]
Example 2:

Input: [-3, -1, 0, 1, 2]
Output: [0, 1, 1, 4, 9]
Try it yourself#
Try solving this question here:*/
const make_squares = function(arr) {
  // This is having time complexity of O(n log n) as array.sort() has time complexity of O(nlog n)
  // squares = []
  // let squaredNum = 1;
  // // TODO: Write your code here
  // for(let i = 0; i< arr.length; i++) {
  //   squaredNum = arr[i] * arr[i]
  //   squares.push(squaredNum);
  // }
  // return squares.sort((a,b) => a-b);
  const len = arr.length;
  squares = Array(len).fill(0);
  let left = 0, right =len-1, highestIndex = len-1;
  while(left <= right) {
    let leftSqr = arr[left] * arr[left];
    let rightSqr = arr[right] * arr[right];
    if(leftSqr > rightSqr) {
      squares[highestIndex] = leftSqr;
      left++
    } else {
      squares[highestIndex] = rightSqr;
      right--
    }
    highestIndex--;
  }
  return squares;
};
/*Solution#
This is a straightforward question. The only trick is that we can have negative numbers in the input array, which will make it a bit difficult to generate the output array with squares in sorted order.

An easier approach could be to first find the index of the first non-negative number in the array. After that, we can use Two Pointers to iterate the array. One pointer will move forward to iterate the non-negative numbers, and the other pointer will move backward to iterate the negative numbers. At any step, whichever number gives us a bigger square will be added to the output array. For the above-mentioned Example-1, we will do something like this:

-2
-1
0
2
3
Since the numbers at both ends can give us the largest square, an alternate approach could be to use two pointers starting at both ends of the input array. At any step, whichever pointer gives us the bigger square, we add it to the result array and move to the next/previous number according to the pointer. For the above-mentioned Example-1, we will do something like this:

    -2
    -1
    0
    2
    3
Code#
Here is what our algorithm will look like:*/
function make_squares(arr) {
  const n = arr.length;
  squares = Array(n).fill(0);
  let highestSquareIdx = n - 1;
  let left = 0,
    right = n - 1;
  while (left <= right) {
    let leftSquare = arr[left] * arr[left],
      rightSquare = arr[right] * arr[right];
    if (leftSquare > rightSquare) {
      squares[highestSquareIdx] = leftSquare;
      left += 1;
    } else {
      squares[highestSquareIdx] = rightSquare;
      right -= 1;
    }
    highestSquareIdx -= 1;
  }

  return squares;
}


console.log(`Squares: ${make_squares([-2, -1, 0, 2, 3])}`);
console.log(`Squares: ${make_squares([-3, -1, 0, 1, 2])}`);

/*Time complexity#
The above algorithm’s time complexity will be O(N),as we are iterating the input array only once.

Space complexity#
The above algorithm’s space complexity will also be O(N); this space will be used for the output array.*/
