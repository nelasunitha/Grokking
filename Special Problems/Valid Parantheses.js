/*Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Every close bracket has a corresponding open bracket of the same type.


Example 1:

Input: s = "()"
Output: true
Example 2:

Input: s = "()[]{}"
Output: true
Example 3:

Input: s = "(]"
Output: false*/

function isValid(s) {
  const map = {'(' : ')', '[':']','{':'}'}
  const stack = [];
  for(let char of s) {
    if(char === '('|| char === '['|| char === '{') {
      stack.push(char)
    }
    else{
      let popped = stack.pop()
      if(map[popped] !== char) return false
    }
  }
  if(stack.length !== 0) return false;
  return true;
}
