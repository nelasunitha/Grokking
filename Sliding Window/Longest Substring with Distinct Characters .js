//Longest Substring with Distinct Characters
/*Problem Statement#
Given a string, find the length of the longest substring, which has all distinct characters.

Example 1:

Input: String="aabccbb"
Output: 3
Explanation: The longest substring with distinct characters is "abc".
Example 2:

Input: String="abbbb"
Output: 2
Explanation: The longest substring with distinct characters is "ab".
Example 3:

Input: String="abccde"
Output: 3
Explanation: Longest substrings with distinct characters are "abc" & "cde".
Try it yourself#
Try solving this question here:*/
const non_repeat_substring = function(str) {
  // TODO: Write your code here
  let start =0, maxLen = 0, strObj = {};
  for(let i =0; i < str.length; i++) {

    if(strObj[str[i]]) start = Math.max(start, strObj[str[i]]);

    maxLen = Math.max(maxLen, i - start +1);
    strObj[str[i]] = i +1;

  }
  return maxLen;
};
/* Solution#
This problem follows the Sliding Window pattern, and we can use a similar dynamic sliding window strategy as discussed in Longest Substring with K Distinct Characters. We can use a HashMap to remember the last index of each character we have processed. Whenever we get a duplicate character, we will shrink our sliding window to ensure that we always have distinct characters in the sliding window.

Code#
Here is what our algorithm will look like:*/
function non_repeat_substring(str) {
  let windowStart = 0,
    maxLength = 0,
    charIndexMap = {};

  // try to extend the range [windowStart, windowEnd]
  for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
    const rightChar = str[windowEnd];
    // if the map already contains the 'rightChar', shrink the window from the beginning so that
    // we have only one occurrence of 'rightChar'
    if (rightChar in charIndexMap) {
      // this is tricky; in the current window, we will not have any 'rightChar' after its previous index
      // and if 'windowStart' is already ahead of the last index of 'rightChar', we'll keep 'windowStart'
      windowStart = Math.max(windowStart, charIndexMap[rightChar] + 1);
    }
    // insert the 'rightChar' into the map
    charIndexMap[rightChar] = windowEnd;
    // remember the maximum length so far
    maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
  }
  return maxLength;
}


console.log(`Length of the longest substring: ${non_repeat_substring("pwwkew")}`);
console.log(`Length of the longest substring: ${non_repeat_substring('abbbb')}`);
console.log(`Length of the longest substring: ${non_repeat_substring('abccde')}`);
/* Time Complexity#
The above algorithm’s time complexity will be O(N), where ‘N’ is the number of characters in the input string.

Space Complexity#
The algorithm’s space complexity will be O(K), where K is the number of distinct characters in the input string. This also means K<=N, because in the worst case, the whole string might not have any duplicate character, so the entire string will be added to the HashMap. Having said that, since we can expect a fixed set of characters in the input string (e.g., 26 for English letters), we can say that the algorithm runs in fixed space O(1); in this case, we can use a fixed-size array instead of the HashMap. */