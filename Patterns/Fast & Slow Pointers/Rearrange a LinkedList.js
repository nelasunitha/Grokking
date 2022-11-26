//Rearrange a LinkedList (medium)

/*Given the head of a Singly LinkedList, write a method to modify the LinkedList such that the nodes from the second half of the LinkedList are inserted alternately to the nodes from the first half in reverse order. So if the LinkedList has nodes 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null, your method should return 1 -> 6 -> 2 -> 5 -> 3 -> 4 -> null.

Your algorithm should not use any extra space and the input LinkedList should be modified in-place.

Example 1:

Input: 2 -> 4 -> 6 -> 8 -> 10 -> 12 -> null
Output: 2 -> 12 -> 4 -> 10 -> 6 -> 8 -> null
Example 2:

Input: 2 -> 4 -> 6 -> 8 -> 10 -> null
Output: 2 -> 10 -> 4 -> 8 -> 6 -> null
Try it yourself#*/

class Node {
  constructor(value, next=null){
    this.value = value;
    this.next = next;
  }

  print_list() {
    result = "";
    temp = this;
    while (temp !== null) {
      result += temp.value + " ";
      temp = temp.next;
    }
    console.log(result);
  }
}
function reverse(head) {
  let prev = null, next;
  while(head) {
    next = head.next
    head.next = prev;
    prev = head;
    head = next;
  }
  return prev
}


const reorder = function(head) {
  // TODO: Write your code here
  if(!head || !head.next)
  return
  let slow = head, fast = head;
  while(fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next
  }
  let secondHalfHead = reverse(slow);
  let firstHalfHead = head;
  while(firstHalfHead && secondHalfHead) {
    let temp = firstHalfHead.next;
    firstHalfHead.next = secondHalfHead;
    firstHalfHead = temp;

    temp = secondHalfHead.next;
    secondHalfHead.next = firstHalfHead;
    secondHalfHead = temp
  }
  if(firstHalfHead) firstHalfHead.next = null;
 }


const head = new Node(2)
head.next = new Node(4)
head.next.next = new Node(6)
head.next.next.next = new Node(8)
head.next.next.next.next = new Node(10)
head.next.next.next.next.next = new Node(12)
reorder(head)
head.print_list()

/*
Solution
This problem shares similarities with Palindrome LinkedList. To rearrange the given LinkedList we will follow the following steps:

We can use the Fast & Slow pointers method similar to Middle of the LinkedList to find the middle node of the LinkedList.
Once we have the middle of the LinkedList, we will reverse the second half of the LinkedList.
Finally, we’ll iterate through the first half and the reversed second half to produce a LinkedList in the required order.
Code
Here is what our algorithm will look like:*/

class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }


  print_list() {
    temp = this;
    while (temp !== null) {
      process.stdout.write(`${temp.value} `);
      temp = temp.next;
    }
    console.log();
  }
}

function reorder(head) {
  if (head === null || head.next === null) {
    return;
  }

  // find middle of the LinkedList
  let slow = head,
    fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // slow is now pointing to the middle node
  headSecondHalf = reverse(slow); // reverse the second half
  headFirstHalf = head;

  // rearrange to produce the LinkedList in the required order
  while (headFirstHalf !== null && headSecondHalf !== null) {
    temp = headFirstHalf.next;
    headFirstHalf.next = headSecondHalf;
    headFirstHalf = temp;

    temp = headSecondHalf.next;
    headSecondHalf.next = headFirstHalf;
    headSecondHalf = temp;
  }
  // set the next of the last node to 'null'
  if (headFirstHalf !== null) {
    headFirstHalf.next = null;
  }
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


var head = new Node(2);
head.next = new Node(4);
head.next.next = new Node(6);
head.next.next.next = new Node(8);
head.next.next.next.next = new Node(10);
head.next.next.next.next.next = new Node(12);
reorder(head);
head.print_list();
/*
Time Complexity#
The above algorithm will have a time complexity of O(N)
O(N)
 where ‘N’ is the number of nodes in the LinkedList.

Space Complexity
The algorithm runs in constant space O(1) */