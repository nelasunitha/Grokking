/*Given two binary strings a and b, return their sum as a binary string.

Example 1:

Input: a = "11", b = "1"
Output: "100"
Example 2:

Input: a = "1010", b = "1011"
Output: "10101"*/
function addBinary(a, b) {
  let i = a.length - 1,
    j = b.length - 1,
    carry = 0;
  const result = [];
  while (i >= 0 || j >= 0) {
    let n1 = i >= 0 ? +a.charAt(i) : 0;
    let n2 = j >= 0 ? +b.charAt(j) : 0;

    let sum = (n1 + n2 + carry).toString(2);
    sum = Number(sum);
    result.push(sum % 10);

    carry = Math.floor(sum / 10);
    i--; j--;
  }
  if (carry === 1) result.push('1');
  return result.reverse().join('');
}
console.log(addBinary('11', '1'));
console.log(addBinary('1010', '1011'));
