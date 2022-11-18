//Remove Duplicates (easy)
/*Problem Statement#
Given an array of sorted numbers, remove all duplicate number instances from it in-place, such that each element appears only once. The relative order of the elements should be kept the same and you should not use any extra space so that that the solution have a space complexity of O(1).

Move all the unique elements at the beginning of the array and after moving return the length of the subarray that has no duplicate in it.

Example 1:

Input: [2, 3, 3, 3, 6, 9, 9]
Output: 4
Explanation: The first four elements after removing the duplicates will be [2, 3, 6, 9].
Example 2:

Input: [2, 2, 2, 11]
Output: 2
Explanation: The first two elements after removing the duplicates will be [2, 11].
Try it yourself#*/
const remove_duplicates = function(arr) {
  // TODO: Write your code here
  let count = 0, left = 0;
  while(left < arr.length) {
    if(arr[left] !== arr[left+1]) count++;
    left++
  }
  return count;
};

/*Solution#
In this problem, we need to separate the duplicates in-place such that the resultant length of the array remains sorted. As the input array is sorted, therefore, one way to do this is to shift the elements left whenever we encounter duplicates. In other words, we will keep one pointer for iterating the array and one pointer for placing the next non-duplicate number. So our algorithm will be to iterate the array and whenever we see a non-duplicate number we move it next to the last non-duplicate number we’ve seen.

Here is the visual representation of this algorithm for Example-1:

nextNonDuplicate
nextNonDuplicate
nextNonDuplicate
nextNonDuplicate
nextNonDuplicate
nextNonDuplicate
2
3
3
3
6
9
9
2
3
3
3
6
9
9
2
3
3
3
6
9
9
2
3
3
3
6
9
9
2
3
6
3
6
9
9
2
3
6
9
6
9
9
nextNonDuplicate
2
3
6
9
6
9
9
Code#
Here is what our algorithm will look like:*/
function remove_duplicates(arr) {
  // index of the next non-duplicate element
  let nextNonDuplicate = 1;

  let i = 0;
  while (i < arr.length) {
    if (arr[nextNonDuplicate - 1] !== arr[i]) {
      arr[nextNonDuplicate] = arr[i];
      nextNonDuplicate += 1;
    }
    i += 1;
  }
  return nextNonDuplicate;
}


console.log(remove_duplicates([2, 3, 3, 3, 6, 9, 9]));
console.log(remove_duplicates([2, 2, 2, 11]));
/*Time Complexity#
The time complexity of the above algorithm will be O(N)
O(N)
, where ‘N’ is the total number of elements in the given array.

Space Complexity#
The algorithm runs in constant space O(1)
O(1)
.

Similar Questions#
Problem 1: Given an unsorted array of numbers and a target ‘key’, remove all instances of ‘key’ in-place and return the new length of the array.

Example 1:

Input: [3, 2, 3, 6, 3, 10, 9, 3], Key=3
Output: 4
Explanation: The first four elements after removing every 'Key' will be [2, 6, 10, 9].
Example 2:

Input: [2, 11, 2, 2, 1], Key=2
Output: 2
Explanation: The first two elements after removing every 'Key' will be [11, 1].
Solution: This problem is quite similar to our parent problem. We can follow a two-pointer approach and shift numbers left upon encountering the ‘key’. Here is what the code will look like:*/

function remove_element(arr, key) {
  let nextElement = 0; // index of the next element which is not 'key'
  for (i = 0; i < arr.length; i++) {
    if (arr[i] !== key) {
      arr[nextElement] = arr[i];
      nextElement += 1;
    }
  }
  return nextElement;
}


console.log(`Array new length: ${remove_element([3, 2, 3, 6, 3, 10, 9, 3], 3)}`);
console.log(`Array new length: ${remove_element([2, 11, 2, 2, 1], 2)}`);
/*
Time and Space Complexity: The time complexity of the above algorithm will be O(N),where ‘N’ is the total number of elements in the given array.

The algorithm runs in constant space O(1)
*/