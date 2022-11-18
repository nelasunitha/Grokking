/*
Given a string s, return true if the s can be palindrome after deleting at most one character from it.



Example 1:

Input: s = "aba"
Output: true
Example 2:

Input: s = "abca"
Output: true
Explanation: You could delete the character 'c'.
Example 3:

Input: s = "abc"
Output: false*/

function validPalindrome (s) {
  let left = 0, right = s.length-1;
    while(left < right) {
      if(s[left] !== s[right])
        return isPalindrome(s, left+1, right) || isPalindrome(s, left, right-1)

      left++;
      right--;
    }
    return true
  }

  function isPalindrome(s, left, right) {
    s= s.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
    for(let i = left, j =right; i<j; i++, j--) {
      if(s[i] !== s[j]) return false
    }
    return true
  }

  console.log(validPalindrome("aba"));
  console.log(validPalindrome("abca"));
  console.log(validPalindrome("abc"));