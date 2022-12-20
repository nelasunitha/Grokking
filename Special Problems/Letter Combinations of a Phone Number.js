//Letter Combinations of a Phone Number
/*
Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.




Example 1:

Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
Example 2:

Input: digits = ""
Output: []
Example 3:

Input: digits = "2"
Output: ["a","b","c"]*/
var letterCombinations = function(digits) {
  if(digits.length === 0) return [];

  const res = [];
  let map = {2: 'abc', 3: 'def', 4: 'ghi', 5: 'jkl', 6: 'mno', 7: 'pqrs', 8: 'tuv', 9: 'wxyz'};
  function find(s, i) {
    if(s.length === digits.length) {
      res.push(s);
      return
    }
    for(let char of map[digits[i]]) {
      find(s+char, i +1)
    }
  }
  find('', 0)
  return res;

};
console.log(letterCombinations(23))
