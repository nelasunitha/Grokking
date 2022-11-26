//Triplet Sum Close to Target (medium)
/*Problem Statement#
Given an array of unsorted numbers and a target number, find a triplet in the array whose sum is as close to the target number as possible, return the sum of the triplet. If there are more than one such triplet, return the sum of the triplet with the smallest sum.

Example 1:

Input: [-2, 0, 1, 2], target=2
Output: 1
Explanation: The triplet [-2, 1, 2] has the closest sum to the target.
Example 2:

Input: [-3, -1, 1, 2], target=1
Output: 0
Explanation: The triplet [-3, 1, 2] has the closest sum to the target.
Example 3:

Input: [1, 0, 1, 1], target=100
Output: 3
Explanation: The triplet [1, 1, 1] has the closest sum to the target.
Try it yourself#
Try solving this question here:*/
const triplet_sum_close_to_target = function (arr, target) {
  // TODO: Write your code here
  arr.sort((a, b) => a - b);
  let leastDiff = Infinity;
  for (let i = 0; i < arr.length - 2; i++) {
    let left = i + 1;
    let right = arr.length - 1;
    while (left < right) {
      let targetDiff = target - (arr[i] + arr[left] + arr[right]);
      if (targetDiff === 0) return target;

      if (
        Math.abs(targetDiff) < Math.abs(leastDiff) ||
        (Math.abs(targetDiff) === Math.abs(leastDiff) && targetDiff > leastDiff)
      )
        leastDiff = targetDiff;

      if (targetDiff > 0) left++;
      else right--;
    }
  }
  return target - leastDiff;
};

/*Solution#
This problem follows the Two Pointers pattern and is quite similar to Triplet Sum to Zero.

We can follow a similar approach to iterate through the array, taking one number at a time. At every step, we will save the difference between the triplet and the target number, so that in the end, we can return the triplet with the closest sum.

Code#
Here is what our algorithm will look like:*/

function triplet_sum_close_to_target(arr, targetSum) {
  arr.sort((a, b) => a - b);
  let smallest_difference = Infinity;
  for (let i = 0; i < arr.length - 2; i++) {
    let left = i + 1,
      right = arr.length - 1;
    while (left < right) {
      const target_diff = targetSum - arr[i] - arr[left] - arr[right];
      if (target_diff === 0) {
        // we've found a triplet with an exact sum
        return targetSum; // return sum of all the numbers
      }

      // the second part of the following 'if' is to handle the smallest sum when we have more than one solution
      if (
        Math.abs(target_diff) < Math.abs(smallest_difference) ||
        (Math.abs(target_diff) === Math.abs(smallest_difference) &&
          target_diff > smallest_difference)
      ) {
        smallest_difference = target_diff; // save the closest and the biggest difference
      }
      if (target_diff > 0) {
        left += 1; // we need a triplet with a bigger sum
      } else {
        right -= 1; // we need a triplet with a smaller sum
      }
    }
  }
  return targetSum - smallest_difference;
}

console.log(triplet_sum_close_to_target([-2, 0, 1, 2], 2));
console.log(triplet_sum_close_to_target([-3, -1, 1, 2], 1));
console.log(triplet_sum_close_to_target([1, 0, 1, 1], 100));
/*
Time complexity#
Sorting the array will take O(N* logN). Overall, the function will take O(N * logN + N^2) which is asymptotically equivalent to O(N^2)

Space complexity#
The above algorithm’s space complexity will be O(N), which is required for sorting. */
