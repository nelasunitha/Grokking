//Palindrome LinkedList (medium)

/* Given the head of a Singly LinkedList, write a method to check if the LinkedList is a palindrome or not.

Your algorithm should use constant space and the input LinkedList should be in the original form once the algorithm is finished. The algorithm should have O(N)
O(N)
 time complexity where ‘N’ is the number of nodes in the LinkedList.

Example 1:

Input: 2 -> 4 -> 6 -> 4 -> 2 -> null
Output: true
Example 2:

Input: 2 -> 4 -> 6 -> 4 -> 2 -> 2 -> null
Output: false
Try it yourself#*/

class Node {
  constructor(value, next=null){
    this.value = value;
    this.next = next;
  }
}
function reverse(head) {
  let prev =null;
  let curr = head;
  let next;
  while(curr) {
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}


const is_palindromic_linked_list= function(head) {
  // TODO: Write your code here

  if(head === null || head.next === null) return true
  let fast = head, slow = head;
  while(fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }
  let secondHalfHead = reverse(slow);
  let copySecondHalf = secondHalfHead
  while(head && secondHalfHead) {
    if(head.value  !==  secondHalfHead.value ) return false;
    head = head.next;
    secondHalfHead = secondHalfHead.next
  }
  reverse(copySecondHalf);
  //if(!head || !secondHalfHead) return true
  return true;
};


const head = new Node(2)
head.next = new Node(4)
head.next.next = new Node(6)
head.next.next.next = new Node(4)
head.next.next.next.next = new Node(2)

console.log(`Is palindrome: ${is_palindromic_linked_list(head)}`)

head.next.next.next.next.next = new Node(2)

console.log(`Is palindrome: ${is_palindromic_linked_list(head)}`)

/*  Solution
As we know, a palindrome LinkedList will have nodes values that read the same backward or forward. This means that if we divide the LinkedList into two halves, the node values of the first half in the forward direction should be similar to the node values of the second half in the backward direction. As we have been given a Singly LinkedList, we can’t move in the backward direction. To handle this, we will perform the following steps:

We can use the Fast & Slow pointers method similar to Middle of the LinkedList to find the middle node of the LinkedList.
Once we have the middle of the LinkedList, we will reverse the second half.
Then, we will compare the first half with the reversed second half to see if the LinkedList represents a palindrome.
Finally, we will reverse the second half of the LinkedList again to revert and bring the LinkedList back to its original form.
Code
Here is what our algorithm will look like:*/
class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}


function is_palindromic_linked_list(head) {
  if (head === null || head.next === null) {
    return true;
  }

  // find middle of the LinkedList
  let slow = head,
    fast = head;
  while ((fast !== null && fast.next !== null)) {
    slow = slow.next;
    fast = fast.next.next;
  }

  headSecondHalf = reverse(slow); // reverse the second half
  // store the head of reversed part to revert back later
  copyHeadSecondHalf = headSecondHalf;

  // compare the first and the second half
  while ((head !== null && headSecondHalf !== null)) {
    if (head.value !== headSecondHalf.value) {
      break; // not a palindrome
    }

    head = head.next;
    headSecondHalf = headSecondHalf.next;
  }
  reverse(copyHeadSecondHalf); // revert the reverse of the second half

  if (head === null || headSecondHalf === null) { // if both halves match
    return true;
  }

  return false;
}

function reverse(head) {
  let prev = null;
  while (head !== null) {
    next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  return prev;
}

const head = new Node(2);
head.next = new Node(4);
head.next.next = new Node(6);
head.next.next.next = new Node(4);
head.next.next.next.next = new Node(2);

console.log(`Is palindrome: ${is_palindromic_linked_list(head)}`);

head.next.next.next.next.next = new Node(2);
console.log(`Is palindrome: ${is_palindromic_linked_list(head)}`);

/*Time complexity
The above algorithm will have a time complexity of O(N) where ‘N’ is the number of nodes in the LinkedList.

Space complexity
The algorithm runs in constant space O(1).*/