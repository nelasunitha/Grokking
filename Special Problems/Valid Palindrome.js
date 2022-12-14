/*
A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.



Example 1:

Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.
Example 2:

Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.
Example 3:

Input: s = " "
Output: true
Explanation: s is an empty string "" after removing non-alphanumeric characters.
Since an empty string reads the same forward and backward, it is a palindrome.*/
function isPalindrome(s) {
  s = s.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
  for (let i = 0, j = s.length - 1; i < j ; i++, j--) {
    if (s[i] !== s[j]) return false;
  }
  return true;
}

console.log(isPalindrome("A man, a plan, a canal: Panama"));
console.log(isPalindrome("race a car"));
console.log(isPalindrome(" "));

/* without using regex, using ascII values*/
var isPalindrome = function(s) {
  const strArr = [];
  for(let i= 0; i < s.length; i++) {

     if(s.charCodeAt(i)>= 65 && s.charCodeAt(i)<91 ||( s.charCodeAt(i)>= 97 && s.charCodeAt(i)<123 ) || (s.charCodeAt(i)>= 48 && s.charCodeAt(i)<58) ) {
      strArr.push(s[i].toLowerCase())
      }
  }
   const str = strArr.join('');
 //   if(str.length === 1) return true
   console.log('s',str, str.length )
  for(let i =0, j=str.length-1; i<j; i++, j--) {
      if(str[i]!== str[j]) return false
  }
  return true;

 };