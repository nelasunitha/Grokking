// Find all Duplicate Numbers (easy)
/* Problem Statement
We are given an unsorted array containing n numbers taken from the range 1 to n. The array has some numbers appearing twice, find all these duplicate numbers using constant space.

Example 1:

Input: [3, 4, 4, 5, 5]
Output: [4, 5]
Example 2:

Input: [5, 4, 7, 2, 3, 5, 3]
Output: [3, 5]
Try it yourself
Try solving this question here:*/

const find_all_duplicates = function (nums) {
  const duplicateNumbers = [];
  // TODO: Write your code here

  let i = 0;
  while (i < nums.length) {
    let j = nums[i] - 1;
    if (nums[i] !== nums[j]) [nums[i], nums[j]] = [nums[j], nums[i]];
    else i++;
  }
  for (let k = 0; k < nums.length; k++) {
    if (nums[k] !== k + 1) duplicateNumbers.push(nums[k]);
  }
  return duplicateNumbers;
};
/* Solution
This problem follows the Cyclic Sort pattern and shares similarities with Find the Duplicate Number. Following a similar approach, we will place each number at its correct index. After that, we will iterate through the array to find all numbers that are not at the correct indices. All these numbers are duplicates.

Code
Here is what our algorithm will look like:*/
function find_all_duplicates(nums) {
  let i = 0;
  while (i < nums.length) {
    j = nums[i] - 1;
    if (nums[i] != nums[j]) {
      [nums[i], nums[j]] = [nums[j], nums[i]]; // swap
    } else {
      i++;
    }
  }

  duplicateNumbers = [];
  for (i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) {
      duplicateNumbers.push(nums[i]);
    }
  }

  return duplicateNumbers;
}

console.log(find_all_duplicates([3, 4, 4, 5, 5]));
console.log(find_all_duplicates([5, 4, 7, 2, 3, 5, 3]));
/*
Time complexity
The time complexity of the above algorithm is O(n)

Space complexity
Ignoring the space required for storing the duplicates, the algorithm runs in constant space O(1)*/
