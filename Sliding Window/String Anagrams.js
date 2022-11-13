/*Given a string and a pattern, find all anagrams of the pattern in the given string.

Every anagram is a permutation of a string. As we know, when we are not allowed to repeat characters while finding permutations of a string, we get N!
N!
 permutations (or anagrams) of a string having N
N
 characters. For example, here are the six anagrams of the string “abc”:

abc
acb
bac
bca
cab
cba
Write a function to return a list of starting indices of the anagrams of the pattern in the given string.

Example 1:

Input: String="ppqp", Pattern="pq"
Output: [1, 2]
Explanation: The two anagrams of the pattern in the given string are "pq" and "qp".
Example 2:

Input: String="abbcabc", Pattern="abc"
Output: [2, 3, 4]
Explanation: The three anagrams of the pattern in the given string are "bca", "cab", and "abc".
Try it yourself#
Try solving this question here:*/
const find_string_anagrams = function(str, pattern) {
 const result_indexes = [];
  // TODO: Write your code here
  let start = 0, pattObj = {}, matched =0;
  for(let i =0; i< pattern.length; i++) {
    if(pattObj[pattern[i]] === undefined) pattObj[pattern[i]] =1;
    else pattObj[pattern[i]]++;
  }
  for(let j =0; j< str.length; j++) {
    if(str[j] in pattObj) {
      pattObj[str[j]]--;
      if(pattObj[str[j]] === 0) matched++
    }
    if(matched === Object.keys(pattObj).length) result_indexes.push(start);

    if(j >= pattern.length-1) {
      if(str[start] in pattObj) {
        if(pattObj[str[start]] === 0) matched--;
        pattObj[str[start]]++;
      }
      start++
    }
  }
  return result_indexes;
};
/* Solution#
This problem follows the Sliding Window pattern and is very similar to Permutation in a String. In this problem, we need to find every occurrence of any permutation of the pattern in the string. We will use a list to store the starting indices of the anagrams of the pattern in the string.

Code#
Here is what our algorithm will look like, only the highlighted lines have changed from Permutation in a String:*/
function find_string_anagrams(str, pattern) {
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

  const resultIndices = [];
  // our goal is to match all the characters from the 'charFrequency' with the current window
  // try to extend the range [windowStart, windowEnd]
  for (windowEnd = 0; windowEnd < str.length; windowEnd++) {
    const rightChar = str[windowEnd];
    if (rightChar in charFrequency) {
      // decrement the frequency of matched character
      charFrequency[rightChar] -= 1;
      if (charFrequency[rightChar] === 0) {
        matched += 1;
      }
    }

    if (matched === Object.keys(charFrequency).length) { // have we found an anagram?
      resultIndices.push(windowStart);
    }

    // shrink the sliding window
    if (windowEnd >= pattern.length - 1) {
      leftChar = str[windowStart];
      windowStart += 1;
      if (leftChar in charFrequency) {
        if (charFrequency[leftChar] === 0) {
          matched -= 1; // before putting the character back, decrement the matched count
        }
        charFrequency[leftChar] += 1; // put the character back
      }
    }
  }

  return resultIndices;
}


console.log(find_string_anagrams('ppqp', 'pq'));
console.log(find_string_anagrams('abbcabc', 'abc'));
/* Time Complexity#
The time complexity of the above algorithm will be O(N + M) where ‘N’ and ‘M’ are the number of characters in the input string and the pattern respectively.

Space Complexity#
The space complexity of the algorithm is O(M)
O(M) since in the worst case, the whole pattern can have distinct characters which will go into the HashMap. In the worst case, we also need O(N) space for the result list, this will happen when the pattern has only one character and the string contains only that character.*/
