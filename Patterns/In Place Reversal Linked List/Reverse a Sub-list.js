//Reverse a Sub-list (medium)
/*
Problem Statement
Given the head of a LinkedList and two positions ‘p’ and ‘q’, reverse the LinkedList from position ‘p’ to ‘q’.

 Original List:
 Example:
 head
    1   2    3    4    5    null

   p=2, q=4
    1   4   3   2   5    null
 head

Try it yourself
Try solving this question here:*/
class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }

  get_list() {
    let result = '';
    let temp = this;
    while (temp !== null) {
      result += temp.value + ' ';
      temp = temp.next;
    }
    return result;
  }
}

const reverse_sub_list = function (head, p, q) {
  // TODO: Write your code here
  if (p === q) return head;
  let prev = null,
    current = head;
  //first part before reaching sub-list
  let i = 0;
  while (current && i < p - 1) {
    prev = current;
    current = current.next;
    i++;
  }
  //Part where sub list is reversed;
  let lastNodeFirstPart = prev;
  //as after reversing present current will become last node of subList
  let lastNodeSubList = current;
  let next = null;
  i = 0;
  while (current && i < q - p + 1) {
    next = current.next;
    current.next = prev;
    prev = current;
    current = next;
    i++;
  }
  if (lastNodeFirstPart) lastNodeFirstPart.next = prev;
  else head = prev;

  lastNodeSubList.next = current;
  return head;
};

const head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
head.next.next.next = new Node(4);
head.next.next.next.next = new Node(5);

console.log(`Nodes of original LinkedList are: ${head.get_list()}`);
console.log(
  `Nodes of reversed LinkedList are: ${reverse_sub_list(head, 2, 4).get_list()}`
);

/* Solution
The problem follows the In-place Reversal of a LinkedList pattern. We can use a similar approach as discussed in Reverse a LinkedList. Here are the steps we need to follow:

Skip the first p-1 nodes, to reach the node at position p.
Remember the node at position p-1 to be used later to connect with the reversed sub-list.
Next, reverse the nodes from p to q using the same approach discussed in Reverse a LinkedList.
Connect the p-1 and q+1 nodes to the reversed sub-list.
Code
Here is what our algorithm will look like:*/
class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }

  print_list() {
    let temp = this;
    while (temp !== null) {
      process.stdout.write(`${temp.value} `);
      temp = temp.next;
    }
    console.log();
  }
}

function reverse_sub_list(head, p, q) {
  if (p === q) {
    return head;
  }

  // after skipping 'p-1' nodes, current will point to 'p'th node
  let current = head,
    previous = null;
  let i = 0;
  while (current !== null && i < p - 1) {
    previous = current;
    current = current.next;
    i += 1;
  }

  // we are interested in three parts of the LinkedList, the part before index 'p',
  // the part between 'p' and 'q', and the part after index 'q'
  const last_node_of_first_part = previous;
  // after reversing the LinkedList 'current' will become the last node of the sub-list
  const last_node_of_sub_list = current;
  let next = null; // will be used to temporarily store the next node

  i = 0;
  // reverse nodes between 'p' and 'q'
  while (current !== null && i < q - p + 1) {
    next = current.next;
    current.next = previous;
    previous = current;
    current = next;
    i += 1;
  }

  // connect with the first part
  if (last_node_of_first_part !== null) {
    // 'previous' is now the first node of the sub-list
    last_node_of_first_part.next = previous;
    // this means p === 1 i.e., we are changing the first node (head) of the LinkedList
  } else {
    head = previous;
  }

  // connect with the last part
  last_node_of_sub_list.next = current;
  return head;
}

const head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
head.next.next.next = new Node(4);
head.next.next.next.next = new Node(5);

process.stdout.write('Nodes of original LinkedList are: ');
head.print_list();
result = reverse_sub_list(head, 2, 4);
process.stdout.write('Nodes of reversed LinkedList are: ');
result.print_list();
/*
Time complexity
The time complexity of our algorithm will be O(N),where ‘N’ is the total number of nodes in the LinkedList.

Space complexity
We only used constant space, therefore, the space complexity of our algorithm is O(1).

Similar Questions
Problem 1: Reverse the first ‘k’ elements of a given LinkedList.

Solution: This problem can be easily converted to our parent problem; to reverse the first ‘k’ nodes of the list, we need to pass p=1 and q=k.

Problem 2: Given a LinkedList with ‘n’ nodes, reverse it based on its size in the following way:

If ‘n’ is even, reverse the list in a group of n/2 nodes.
If n is odd, keep the middle node as it is, reverse the first ‘n/2’ nodes and reverse the last ‘n/2’ nodes.
Solution: When ‘n’ is even we can perform the following steps:

Reverse first ‘n/2’ nodes: head = reverse(head, 1, n/2)
Reverse last ‘n/2’ nodes: head = reverse(head, n/2 + 1, n)
When ‘n’ is odd, our algorithm will look like:

head = reverse(head, 1, n/2)
head = reverse(head, n/2 + 2, n)
Please note the function call in the second step. We’re skipping two elements as we will be skipping the middle element.*/
