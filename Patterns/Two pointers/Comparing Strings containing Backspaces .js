//Comparing Strings containing Backspaces (medium)
/* Given two strings containing backspaces (identified by the character ‘#’), check if the two strings are equal.

Example 1:

Input: str1="xy#z", str2="xzz#"
Output: true
Explanation: After applying backspaces the strings become "xz" and "xz" respectively.
Example 2:

Input: str1="xy#z", str2="xyz#"
Output: false
Explanation: After applying backspaces the strings become "xz" and "xy" respectively.
Example 3:

Input: str1="xp#", str2="xyz##"
Output: true
Explanation: After applying backspaces the strings become "x" and "x" respectively.
In "xyz##", the first '#' removes the character 'z' and the second '#' removes the character 'y'.
Example 4:

Input: str1="xywrrmp", str2="xywrrmu#p"
Output: true
Explanation: After applying backspaces the strings become "xywrrmp" and "xywrrmp" respectively.
Try it yourself
Try solving this question here:*/
const backspace_compare = function (str1, str2) {
  // TODO: Write your code here
  let firstStr = [];
  let secondStr = [];

  for (let i = 0; i < str1.length; i++) {
    if (str1[i] === '#') {
      firstStr.pop();
    } else firstStr.push(str1[i]);
  }
  for (let i = 0; i < str2.length; i++) {
    if (str2[i] === '#') {
      secondStr.pop();
    } else secondStr.push(str2[i]);
  }
  return firstStr.join('') === secondStr.join('');
};

/* constant space solution
const backspace_compare = function(str1, str2) {

 str1 = str1.split('') ; str2= str2.split('');
  for(let i =0; i < str1.length; i++) {
    if(str1[i] === '#') {
       str1.splice(i-1,2);
    }
  }
   for(let j =0; j < str2.length; j++) {
    if(str2[j] === '#') {
       str2.splice(j-1,2);
    }
  }
  return str1.join('') === str2.join('');
}
*/
/*Solution
To compare the given strings, first, we need to apply the backspaces. An efficient way to do this would be from the end of both the strings. We can have separate pointers, pointing to the last element of the given strings. We can start comparing the characters pointed out by both the pointers to see if the strings are equal. If, at any stage, the character pointed out by any of the pointers is a backspace (’#’), we will skip and apply the backspace until we have a valid character available for comparison.

Code
Here is what our algorithm will look like:*/
function backspace_compare(str1, str2) {
  // use two pointer approach to compare the strings
  let index1 = str1.length - 1,
    index2 = str2.length - 1;
  while (index1 >= 0 || index2 >= 0) {
    let i1 = get_next_valid_char_index(str1, index1),
      i2 = get_next_valid_char_index(str2, index2);
    if (i1 < 0 && i2 < 0) {
      // reached the end of both the strings
      return true;
    }
    if (i1 < 0 || i2 < 0) {
      // reached the end of one of the strings
      return false;
    }
    if (str1[i1] !== str2[i2]) {
      // check if the characters are equal
      return false;
    }

    index1 = i1 - 1;
    index2 = i2 - 1;
  }
  return true;
}

function get_next_valid_char_index(str, index) {
  let backspaceCount = 0;
  while (index >= 0) {
    if (str[index] === '#') {
      // found a backspace character
      backspaceCount += 1;
    } else if (backspaceCount > 0) {
      // a non-backspace character
      backspaceCount -= 1;
    } else {
      break;
    }

    index -= 1; // skip a backspace or a valid character
  }

  return index;
}

console.log(backspace_compare('xy#z', 'xzz#'));
console.log(backspace_compare('xy#z', 'xyz#'));
console.log(backspace_compare('xp#', 'xyz##'));
console.log(backspace_compare('xywrrmp', 'xywrrmu#p'));

/*Time complexity
The time complexity of the above algorithm will be O(M+N) where ‘M’ and ‘N’ are the lengths of the two input strings respectively.

Space complexity
The algorithm runs in constant space O(1).*/
