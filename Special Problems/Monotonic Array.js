/*Easy

An array is monotonic if it is either monotone increasing or monotone decreasing.

An array nums is monotone increasing if for all i <= j, nums[i] <= nums[j]. An array nums is monotone decreasing if for all i <= j, nums[i] >= nums[j].

Given an integer array nums, return true if the given array is monotonic, or false otherwise.



Example 1:

Input: nums = [1,2,2,3]
Output: true
Example 2:

Input: nums = [6,5,4,4]
Output: true
Example 3:

Input: nums = [1,3,2]
Output: false*/

function isMonotonic(nums) {
  let decreased = false;
   let increased = false;

     for(let i = 1; i < nums.length; i++){
         if(nums[i] < nums[i - 1]){
             increased = true;
         }
         if(nums[i] > nums[i - 1]){
             decreased = true
         }
         if(increased && decreased) return false
     }
     return true
 }
 console.log(isMonotonic([1,2,2,3]))
 console.log(isMonotonic([6,5,4,4]))
 console.log(isMonotonic([1,3,2]))
