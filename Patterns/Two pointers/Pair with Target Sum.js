//Pair with Target Sum (easy)
/*Problem Statement#
Given an array of sorted numbers and a target sum, find a pair in the array whose sum is equal to the given target.

Write a function to return the indices of the two numbers (i.e. the pair) such that they add up to the given target.

Example 1:

Input: [1, 2, 3, 4, 6], target=6
Output: [1, 3]
Explanation: The numbers at index 1 and 3 add up to 6: 2+4=6
Example 2:

Input: [2, 5, 9, 11], target=11
Output: [0, 2]
Explanation: The numbers at index 0 and 2 add up to 11: 2+9=11
Try it yourself#
Try solving this question here:*/
const pair_with_targetsum = function(arr, target_sum) {
  // TODO: Write your code here
  let left = 0, right = arr.length-1
  while(left < right) {
    let sum = arr[left] + arr[right];
    if(sum === target_sum) return [left, right];
    else if(sum < target_sum) left++;
    else if (sum > target_sum) right--;
  }
  return [-1, -1];
}
/*
Solution#
Since the given array is sorted, a brute-force solution could be to iterate through the array, taking one number at a time and searching for the second number through Binary Search. The time complexity of this algorithm will be O(N*logN)
O(N∗logN)
. Can we do better than this?

We can follow the Two Pointers approach. We will start with one pointer pointing to the beginning of the array and another pointing at the end. At every step, we will see if the numbers pointed by the two pointers add up to the target sum. If they do, we have found our pair; otherwise, we will do one of two things:

If the sum of the two numbers pointed by the two pointers is greater than the target sum, this means that we need a pair with a smaller sum. So, to try more pairs, we can decrement the end-pointer.
If the sum of the two numbers pointed by the two pointers is smaller than the target sum, this means that we need a pair with a larger sum. So, to try more pairs, we can increment the start-pointer.
Here is the visual representation of this algorithm for Example-1:

    1
    2
    3
    4
    6
 target sum = 6
 1 + 6 > target sum, therefore let's decrement Pointer2
    1
    2
    3
    4
    6
 1 + 4 < target sum, therefore let's increment Pointer1
    1
    2
    3
    4
    6
 2 + 4 == target sum, we have found our pair!
Code#
Here is what our algorithm will look like:*/
function pair_with_target_sum(arr, targetSum) {
  let left = 0,
    right = arr.length - 1;
  while (left < right) {
    const currentSum = arr[left] + arr[right];
    if (currentSum === targetSum) {
      return [left, right];
    }

    if (targetSum > currentSum) {
      left += 1; // we need a pair with a bigger sum
    } else {
      right -= 1; // we need a pair with a smaller sum
    }
  }
  return [-1, -1];
}


console.log(pair_with_target_sum([1, 2, 3, 4, 6], 6));
console.log(pair_with_target_sum([2, 5, 9, 11], 11));
/*
Time Complexity#
The time complexity of the above algorithm will be O(N),where ‘N’ is the total number of elements in the given array.

Space Complexity#
The space complexity will also be O(N), as, in the worst case, we will be pushing ‘N’ numbers in the HashTable.*/