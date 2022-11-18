//Smallest Window containing Substring
/*Given a string and a pattern, find the smallest substring in the given string which has all the character occurrences of the given pattern.

Example 1:

Input: String="aabdec", Pattern="abc"
Output: "abdec"
Explanation: The smallest substring having all characters of the pattern is "abdec"
Example 2:

Input: String="aabdec", Pattern="abac"
Output: "aabdec"
Explanation: The smallest substring having all character occurrences of the pattern is "aabdec"
Example 3:

Input: String="abdbca", Pattern="abc"
Output: "bca"
Explanation: The smallest substring having all characters of the pattern is "bca".
Example 4:

Input: String="adcad", Pattern="abc"
Output: ""
Explanation: No substring in the given string has all characters of the pattern.
Try it yourself#
Try solving this question here:*/
const find_substring = function(str, pattern) {
  // TODO: Write your code here
  let start = 0, pattObj = {}, matched =0, minLen = Infinity, subStrStart = 0;
  for(let i =0; i< pattern.length; i++) {
    if(pattObj[pattern[i]] === undefined ) pattObj[pattern[i]] =1
    else pattObj[pattern[i]]++;
  }
  for(let j =0; j < str.length; j++) {
    if(str[j] in pattObj) {
      pattObj[str[j]]--;
      if(pattObj[str[j]] >=  0) matched++
    }
    while(matched === pattern.length) {
      if(minLen > j-start +1) {
        minLen = j - start + 1;
        subStrStart = start;
      }
      if(str[start] in pattObj) {
        if(pattObj[str[start]] ===0) matched--
        pattObj[str[start]]++;
      }
      start++
    }

  }
    if(minLen > str.length) return "";
    else return str.substring(subStrStart, subStrStart + minLen);
}

/* Solution#
This problem follows the Sliding Window pattern and has a lot of similarities with Permutation in a String with one difference. In this problem, we need to find a substring having all characters of the pattern which means that the required substring can have some additional characters and doesn’t need to be a permutation of the pattern. Here is how we will manage these differences:

We will keep a running count of every matching instance of a character.
Whenever we have matched all the characters, we will try to shrink the window from the beginning, keeping track of the smallest substring that has all the matching characters.
We will stop the shrinking process as soon as we remove a matched character from the sliding window. One thing to note here is that we could have redundant matching characters, e.g., we might have two ‘a’ in the sliding window when we only need one ‘a’. In that case, when we encounter the first ‘a’, we will simply shrink the window without decrementing the matched count. We will decrement the matched count when the second ‘a’ goes out of the window.
Code#
Here is how our algorithm will look; only the highlighted lines have changed from Permutation in a String:*/
function find_substring(str, pattern) {
  let windowStart = 0,
    matched = 0,
    substrStart = 0,
    minLength = str.length + 1,
    charFrequency = {};

  for (i = 0; i < pattern.length; i++) {
    const chr = pattern[i];
    if (!(chr in charFrequency)) {
      charFrequency[chr] = 0;
    }
    charFrequency[chr] += 1;
  }

  // try to extend the range [windowStart, windowEnd]
  for (windowEnd = 0; windowEnd < str.length; windowEnd++) {
    const rightChar = str[windowEnd];
    if (rightChar in charFrequency) {
      charFrequency[rightChar] -= 1;
      if (charFrequency[rightChar] >= 0) { // Count every matching of a character
        matched += 1;
      }
    }

    // Shrink the window if we can, finish as soon as we remove a matched character
    while (matched === pattern.length) {
      if (minLength > windowEnd - windowStart + 1) {
        minLength = windowEnd - windowStart + 1;
        substrStart = windowStart;
      }

      const leftChar = str[windowStart];
      windowStart += 1;
      if (leftChar in charFrequency) {
        // Note that we could have redundant matching characters, therefore we'll decrement the
        // matched count only when a useful occurrence of a matched character is going out of the window
        if (charFrequency[leftChar] === 0) {
          matched -= 1;
        }
        charFrequency[leftChar] += 1;
      }
    }
  }

  if (minLength > str.length) {
    return '';
  }
  return str.substring(substrStart, substrStart + minLength);
}


console.log(find_substring('aabdec', 'abc'));
console.log(find_substring('aabdec', 'abac'));
console.log(find_substring('abdbca', 'abc'));
console.log(find_substring('adcad', 'abc'));
/* Time Complexity#
The time complexity of the above algorithm will be O(N + M)where ‘N’ and ‘M’ are the number of characters in the input string and the pattern respectively.

Space Complexity#
The space complexity of the algorithm is O(M) since in the worst case, the whole pattern can have distinct characters which will go into the HashMap. In the worst case, we also need O(N) space for the resulting substring, which will happen when the input string is a permutation of the pattern.*/
