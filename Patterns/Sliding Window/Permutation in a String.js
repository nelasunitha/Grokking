//Permutation in a String (hard)#
/*Given a string and a pattern, find out if the string contains any permutation of the pattern.

Permutation is defined as the re-arranging of the characters of the string. For example, “abc” has the following six permutations:

abc
acb
bac
bca
cab
cba
If a string has ‘n’ distinct characters, it will have n!
n!
 permutations.

Example 1:

Input: String="oidbcaf", Pattern="abc"
Output: true
Explanation: The string contains "bca" which is a permutation of the given pattern.
Example 2:

Input: String="odicf", Pattern="dc"
Output: false
Explanation: No permutation of the pattern is present in the given string as a substring.
Example 3:

Input: String="bcdxabcdy", Pattern="bcdyabcdx"
Output: true
Explanation: Both the string and the pattern are a permutation of each other.
Example 4:

Input: String="aaacb", Pattern="abc"
Output: true
Explanation: The string contains "acb" which is a permutation of the given pattern.
Try it yourself#
Try solving this question here:*/
const find_permutation = function (str, pattern) {
  // TODO: Write your code here
  let start = 0,
    pattObj = {},
    matched = 0;

  //creating a map to check the elements in a pattern
  for (let i = 0; i < pattern.length; i++) {
    if (pattObj[pattern[i]] === undefined) pattObj[pattern[i]] = 1;
    else pattObj[pattern[i]]++;
  }
  // console.log('obj', pattObj)
  // decrement elements matched with the pattern as it matches pattern
  //and loop contiues to check elements with pattern
  //oidbcaf" pat - abc at index 3 'b' matches pattern so now {a:1, b:0, c:1} matched = 1
  //and loop continues to check
  for (let j = 0; j < str.length; j++) {
    if (str[j] in pattObj) {
      // console.log('char', pattObj[str[j]])
      pattObj[str[j]]--;
      if (pattObj[str[j]] === 0) matched++;
    }
    // console.log('match', matched)

    if (matched === Object.keys(pattObj).length) return true;
    // at this point if we didn't find the window which is anagram to pattern we will try to shrink
    //the window by moving starting position, next if element in string is same as element in pattern
    //check for value, if value is zero, it is said the element is matched so now the frequency will be
    //incremented an matched will be decremented
    if (j >= pattern.length - 1) {
      if (str[start] in pattObj) {
        // console.log('window', pattObj[str[start]])
        if (pattObj[str[start]] === 0) matched--;
        pattObj[str[start]]++;
      }
      start++;
    }
  }
  return false;
};
/*
Solution#
This problem follows the Sliding Window pattern, and we can use a similar sliding window strategy as discussed in Longest Substring with K Distinct Characters. We can use a HashMap to remember the frequencies of all characters in the given pattern. Our goal will be to match all the characters from this HashMap with a sliding window in the given string. Here are the steps of our algorithm:

Create a HashMap to calculate the frequencies of all characters in the pattern.
Iterate through the string, adding one character at a time in the sliding window.
If the character being added matches a character in the HashMap, decrement its frequency in the map. If the character frequency becomes zero, we got a complete match.
If at any time, the number of characters matched is equal to the number of distinct characters in the pattern (i.e., total characters in the HashMap), we have gotten our required permutation.
If the window size is greater than the length of the pattern, shrink the window to make it equal to the pattern’s size. At the same time, if the character going out was part of the pattern, put it back in the frequency HashMap.
Code#
Here is what our algorithm will look like:*/
function find_permutation(str, pattern) {
  let windowStart = 0,
    matched = 0,
    charFrequency = {};

  for (i = 0; i < pattern.length; i++) {
    const chr = pattern[i];
    if (!(chr in charFrequency)) {
      charFrequency[chr] = 0;
    }
    charFrequency[chr] += 1;
  }

  // Our goal is to match all the characters from the 'charFrequency' with the current window
  // try to extend the range [windowStart, windowEnd]
  for (windowEnd = 0; windowEnd < str.length; windowEnd++) {
    const rightChar = str[windowEnd];
    if (rightChar in charFrequency) {
      // Decrement the frequency of matched character
      charFrequency[rightChar] -= 1;
      if (charFrequency[rightChar] === 0) {
        matched += 1;
      }
    }

    if (matched === Object.keys(charFrequency).length) {
      return true;
    }

    // Shrink the sliding window
    if (windowEnd >= pattern.length - 1) {
      leftChar = str[windowStart];
      windowStart += 1;
      if (leftChar in charFrequency) {
        if (charFrequency[leftChar] === 0) {
          matched -= 1;
        }
        charFrequency[leftChar] += 1;
      }
    }
  }
  return false;
}

console.log(`Permutation exist: ${find_permutation('oidbcaf', 'abc')}`);
console.log(`Permutation exist: ${find_permutation('odicf', 'dc')}`);
console.log(`Permutation exist: ${find_permutation('bcdxabcdy', 'bcdyabcdx')}`);
console.log(`Permutation exist: ${find_permutation('aaacb', 'abc')}`);
/* Time Complexity#
The above algorithm’s time complexity will be O(N + M, where ‘N’ and ‘M’ are the number of characters in the input string and the pattern, respectively.

Space Complexity#
The algorithm’s space complexity is O(M)
 since, in the worst case, the whole pattern can have distinct characters that will go into the HashMap.*/
