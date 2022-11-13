/*Problem Statement#
Given an array of positive integers and a number ‘S,’ find the length of the smallest contiguous subarray whose sum is greater than or equal to ‘S’. Return 0 if no such subarray exists.

Example 1:

Input: [2, 1, 5, 2, 3, 2], S=7
Output: 2
Explanation: The smallest subarray with a sum greater than or equal to ‘7’ is [5, 2].

Example 2:

Input: [2, 1, 5, 2, 8], S=7
Output: 1
Explanation: The smallest subarray with a sum greater than or equal to ‘7’ is [8].

Example 3:

Input: [3, 4, 1, 1, 6], S=8
Output: 3
Explanation: Smallest subarrays with a sum greater than or equal to ‘8’ are [3, 4, 1] or [1, 1, 6].

Try it yourself#
Try solving this question here:*/
const smallest_subarray_sum = function(s, arr) {
  // TODO: Write your code here
  let sum =0, minLen =Infinity, start =0;
  for(let i = 0; i < arr.length; i++) {
    sum+=arr[i];
    if(sum >= s) {
      minLen = Math.min(minLen, i-start+1);
      sum-= arr[start];
      start++;
    }
  }
  if(minLen === Infinity) return 0
  else return minLen;
};

/*
Solution#
This problem follows the Sliding Window pattern, and we can use a similar strategy as discussed in Maximum Sum Subarray of Size K. There is one difference though: in this problem, the sliding window size is not fixed. Here is how we will solve this problem:

First, we will add-up elements from the beginning of the array until their sum becomes greater than or equal to ‘S.’
These elements will constitute our sliding window. We are asked to find the smallest such window having a sum greater than or equal to ‘S.’ We will remember the length of this window as the smallest window so far.
After this, we will keep adding one element in the sliding window (i.e., slide the window ahead) in a stepwise fashion.
In each step, we will also try to shrink the window from the beginning. We will shrink the window until the window’s sum is smaller than ‘S’ again. This is needed as we intend to find the smallest window. This shrinking will also happen in multiple steps; in each step, we will do two things:
Check if the current window length is the smallest so far, and if so, remember its length.
Subtract the first element of the window from the running sum to shrink the sliding window.
Here is the visual representation of this algorithm for the Example-1:

    2   1   5   2   3    2
 Window Sum = 0
 Min Length = ∞
 Required Sum = 7
    2   1
    5
    2
    3
    2
 Min Length = ∞
 Window Sum = 2
    2
    1
    5
    2
    3
    2
 Min Length = ∞
 Window Sum = 3
    2
    1
    5
    2
    3
    2
 Window Sum = 8
 Min Length = 3
    2
    1
    5
    2
    3
    2
 Window Sum = 7
    2
    1
    5
    2
    3
    2
    2
    1
    5
    2
    3
    2
 Window Sum = 8
 Min Length = 2
    2
    1
    5
    2
    3
    2
 Min Length = 2
 Window Sum = 7
 window end
 window start
 window start
 window end
 window start
 window end
 window start
 window end
 window start
 window end
 window start
 window end
 window start
 window end
 window start
 window end
 Window Sum = 6
 Min Length = 3
 window start
 window end
 Min Length = 2
 Min Length = 3
 Window Sum >= 7, let's shrink the sliding window
 Window Sum >= 7, let's shrink the sliding window
 Window Sum still >= 7, let's shrink the sliding window
    2   1   5   2   3   2
 window start
 window end
    2
    1
    5
    2
    3
    2
 Min Length = 2
 Window Sum = 5
 Window Sum = 2
Code#
Here is what our algorithm will look like:*/
function smallest_subarray_sum(s, arr) {
  let minLength = Infinity;
  let windowSum = 0;
  let windowStart = 0;

  for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    windowSum += arr[windowEnd]; // add the next element

    // shrink the window as small as possible until the 'window_sum' is smaller than 's'
    while (windowSum >= s) {
      minLength = Math.min(minLength, windowEnd - windowStart + 1);
      windowSum -= arr[windowStart]
      windowStart += 1 // sliding the window
      }
    }

  if (minLength === Infinity) {
    return 0;
  }
  return minLength;
}


console.log(`Smallest subarray length: ${smallest_subarray_sum(7, [2, 1, 5, 2, 3, 2])}`);
console.log(`Smallest subarray length: ${smallest_subarray_sum(8, [3, 4, 1, 1, 6])}`);
console.log(`Smallest subarray length: ${smallest_subarray_sum(7, [2, 1, 5, 2, 3, 2])}`);
/*
Time Complexity#
The time complexity of the above algorithm will be O(N).
 The outer for loop runs for all elements, and the inner while loop processes each element only once; therefore, the time complexity of the algorithm will be O(N+N)
O(N+N), which is asymptotically equivalent to O(N)

Space Complexity#
The algorithm runs in constant space O(1)
O(1) */
