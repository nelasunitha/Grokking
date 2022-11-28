//Find the Missing Number (easy)
/*Problem Statement#
We are given an array containing n distinct numbers taken from the range 0 to n. Since the array has only n numbers out of the total n+1 numbers, find the missing number.

Example 1:

Input: [4, 0, 3, 1]
Output: 2
Example 2:

Input: [8, 3, 5, 2, 4, 6, 0, 1]
Output: 7
Try it yourself
Try solving this question here:*/

const find_missing_number = function (nums) {
  // TODO: Write your code here
  let i = 0;
  len = nums.length;
  while (i < len) {
    //here we are taking j equals to index of as the range starting from 0
    let j = nums[i];
    //array will be sorted until we find the missing number
    if (nums[i] < len && nums[i] !== nums[j])
      [nums[i], nums[j]] = [nums[j], nums[i]];
    else i++;
  }
  console.log(nums);
  for (let k = 0; k < len; k++) {
    if (nums[k] !== k) return k;
  }
  return len;
};
/* Solution
This problem follows the Cyclic Sort pattern. Since the input array contains unique numbers from the range 0 to n, we can use a similar strategy as discussed in Cyclic Sort to place the numbers on their correct index. Once we have every number in its correct place, we can iterate the array to find the index which does not have the correct number, and that index will be our missing number.

However, there are two differences with Cyclic Sort:

In this problem, the numbers are ranged from 0 to n, compared to 1 to n in the Cyclic Sort. This will result in two changes in our algorithm:
In this problem, each number should be equal to its index, compared to index - 1 in the Cyclic Sort; this means => nums[i] == nums[nums[i]]
Since the array will have n numbers, which means array indices will range from 0 to n-1. Therefore, we will ignore the number n as we can’t place it in the array, so => nums[i] < nums.length
Say we are at index i. If we swap the number at index i to place it at the correct index, we can still have the wrong number at index i. This was true in Cyclic Sort too. It didn’t cause any problems in Cyclic Sort as over there, we made sure to place one number at its correct place in each step, but that wouldn’t be enough in this problem as we have one extra number due to the larger range. Therefore, before swapping we will check if the number at index i is within the permissible range i.e., it is less than the length of the input array, if not, we will skip ahead.
Code
Here is what our algorithm will look like:*/

function find_missing_number(nums) {
  let i = 0;

  const n = nums.length;
  while (i < n) {
    j = nums[i];
    if (nums[i] < n && nums[i] !== nums[j]) {
      [nums[i], nums[j]] = [nums[j], nums[i]]; // swap
    } else {
      i += 1;
    }
  }

  // find the first number missing from its index, that will be our required number
  for (i = 0; i < n; i++) {
    if (nums[i] !== i) {
      return i;
    }
  }

  return n;
}

console.log(find_missing_number([4, 0, 3, 1]));
console.log(find_missing_number([8, 3, 5, 2, 4, 6, 0, 1]));

/*
Time complexity
The time complexity of the above algorithm is O(n)
O(n)
. In the while loop, although we are not incrementing the index i when swapping the numbers, this will result in more than n iterations of the loop, but in the worst-case scenario, the while loop will swap a total of n-1 numbers and once a number is at its correct index, we will move on to the next number by incrementing i. In the end, we iterate the input array again to find the first number missing from its index, so overall, our algorithm will take O(n) + O(n-1) + O(n) which is asymptotically equivalent to O(n).

Space complexity
The algorithm runs in constant space O(1).*/
