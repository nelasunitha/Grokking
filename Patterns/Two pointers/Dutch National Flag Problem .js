//Dutch National Flag Problem (medium)
/*Problem Statement
Given an array containing 0s, 1s and 2s, sort the array in-place. You should treat numbers of the array as objects, hence, we can’t count 0s, 1s, and 2s to recreate the array.

The flag of the Netherlands consists of three colors: red, white and blue; and since our input array also consists of three different numbers that is why it is called Dutch National Flag problem.

Example 1:

Input: [1, 0, 2, 1, 0]
Output: [0, 0, 1, 1, 2]
Example 2:

Input: [2, 2, 0, 1, 2, 0]
Output: [0, 0, 1, 2, 2, 2,]
Try it yourself
Try solving this question here:*/
const dutch_flag_sort = function (arr) {
  // TODO: Write your code here
  let left = 0,
    count0 = 0,
    right = arr.length - 1;
  while (left <= right) {
    if (arr[left] === 0) {
      [arr[left], arr[count0]] = [arr[count0], arr[left]];
      left++;
      count0++;
    } else if (arr[left] === 2) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      right--;
    } else left++;
  }
};

/*
Solution
The brute force solution will be to use an in-place sorting algorithm like Heapsort which will take O(N*logN)
O(N∗logN)
. Can we do better than this? Is it possible to sort the array in one iteration?

We can use a Two Pointers approach while iterating through the array. Let’s say the two pointers are called low and high which are pointing to the first and the last element of the array respectively. So while iterating, we will move all 0s before low and all 2s after high so that in the end, all 1s will be between low and high.

Code
Here is what our algorithm will look like:*/
function dutch_flag_sort(arr) {
  // all elements < low are 0, and all elements > high are 2
  // all elements from >= low < i are 1
  let low = 0,
    high = arr.length - 1,
    i = 0;
  while (i <= high) {
    if (arr[i] === 0) {
      [arr[i], arr[low]] = [arr[low], arr[i]]; // swap
      // increment 'i' and 'low'
      i += 1;
      low += 1;
    } else if (arr[i] === 1) {
      i += 1;
    } else {
      // the case for arr[i] === 2
      [arr[i], arr[high]] = [arr[high], arr[i]]; // swap
      // decrement 'high' only, after the swap the number at index 'i' could be 0, 1, or 2
      high -= 1;
    }
  }
}

let arr = [1, 0, 2, 1, 0];
dutch_flag_sort(arr);
console.log(arr);

arr = [2, 2, 0, 1, 2, 0];
dutch_flag_sort(arr);
console.log(arr);
/*
Time complexity
The time complexity of the above algorithm will be O(N)as we are iterating the input array only once.

Space complexity
The algorithm runs in constant space O(1)*/
