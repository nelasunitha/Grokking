//Find the Smallest Missing Positive Number (medium)
/*
Given an unsorted array containing numbers, find the smallest missing positive number in it.

Note: Positive numbers start from ‘1’.

Example 1:

Input: [-3, 1, 5, 4, 2]
Output: 3
Explanation: The smallest missing positive number is '3'
Example 2:

Input: [3, -2, 0, 1, 2]
Output: 4
Example 3:

Input: [3, 2, 5, 1]
Output: 4*/

const find_first_smallest_missing_positive = function (nums) {
  // TODO: Write your code here
  let i = 0;
  while (i < nums.length) {
    let j = nums[i] - 1;
    if (nums[i] > 0 && nums[i] <= nums.length && nums[i] !== nums[j]) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
    } else i++;
  }
  console.log(nums);
  for (let k = 0; k < nums.length; k++) {
    if (nums[k] !== k + 1) return k + 1;
  }
  return nums.length + 1;
};
/*
Solution
This problem follows the Cyclic Sort pattern and shares similarities with Find the Missing Number with one big difference. In this problem, the numbers are not bound by any range so we can have any number in the input array.

However, we will follow a similar approach though as discussed in Find the Missing Number to place the numbers on their correct indices and ignore all numbers that are out of the range of the array (i.e., all negative numbers and all numbers greater than the length of the array). Once we are done with the cyclic sort we will iterate the array and the first index that does not have the correct number will be the smallest missing positive number!

Code
Here is what our algorithm will look like:*/

function find_first_smallest_missing_positive(nums) {
  let i = 0;
  n = nums.length;
  while (i < n) {
    j = nums[i] - 1;
    if (nums[i] > 0 && nums[i] <= n && nums[i] !== nums[j]) {
      [nums[i], nums[j]] = [nums[j], nums[i]]; // swap
    } else {
      i += 1;
    }
  }
  for (i = 0; i < n; i++) {
    if (nums[i] !== i + 1) {
      return i + 1;
    }
  }

  return nums.length + 1;
}

console.log(find_first_smallest_missing_positive([-3, 1, 5, 4, 2]));
console.log(find_first_smallest_missing_positive([3, -2, 0, 1, 2]));
console.log(find_first_smallest_missing_positive([3, 2, 5, 1]));

/*
Time complexity#
The time complexity of the above algorithm is O(n).

Space complexity
The algorithm runs in constant space O(1)*/
