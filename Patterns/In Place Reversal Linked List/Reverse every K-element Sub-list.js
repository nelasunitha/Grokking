//Reverse every K-element Sub-list (medium)
/*Given the head of a LinkedList and a number ‘k’, reverse every ‘k’ sized sub-list starting from the head.

If, in the end, you are left with a sub-list with less than ‘k’ elements, reverse it too.

 Original List:
 Example:
 head
 head
    1    2    3    4    5    6      7    8    null
k=3
 Reversed Sub-list:
    3    2    1    6    5    4    8    7   null

Try it yourself
Try solving this question here:*/
class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }

  get_list() {
    result = '';
    temp = this;
    while (temp !== null) {
      result += temp.value + ' ';
      temp = temp.next;
    }
    return result;
  }
}

const reverse_every_k_elements = function (head, k) {
  // TODO: Write your code here
  if (k <= 1 || head === null) {
    return head;
  }
  let current = head,
    prev = null;
  while (true) {
    const lastNodeFirstPart = prev;
    const lastNodeSubList = current;
    let i = 0,
      next = null;
    while (current && i < k) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
      i++;
    }
    if (lastNodeFirstPart) lastNodeFirstPart.next = prev;
    else head = prev;

    lastNodeSubList.next = current;
    if (current === null) {
      break;
    }
    prev = lastNodeSubList;
  }

  return head;
};

const head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
head.next.next.next = new Node(4);
head.next.next.next.next = new Node(5);
head.next.next.next.next.next = new Node(6);
head.next.next.next.next.next.next = new Node(7);
head.next.next.next.next.next.next.next = new Node(8);

console.log(`Nodes of original LinkedList are: ${head.get_list()}`);
console.log(
  `Nodes of reversed LinkedList are: ${reverse_every_k_elements(
    head,
    3
  ).get_list()}`
);

/* Solution
The problem follows the In-place Reversal of a LinkedList pattern and is quite similar to Reverse a Sub-list. The only difference is that we have to reverse all the sub-lists. We can use the same approach, starting with the first sub-list (i.e. p=1, q=k) and keep reversing all the sublists of size ‘k’.

Code
Most of the code is the same as Reverse a Sub-list; only the highlighted lines have a majority of the changes:*/
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

function reverse_every_k_elements(head, k) {
  if (k <= 1 || head === null) {
    return head;
  }

  let current = head,
    previous = null;
  while (true) {
    const last_node_of_previous_part = previous;
    // after reversing the LinkedList 'current' will become the last node of the sub-list
    const last_node_of_sub_list = current;
    let next = null; // will be used to temporarily store the next node
    let i = 0;
    while (current !== null && i < k) {
      // reverse 'k' nodes
      next = current.next;
      current.next = previous;
      previous = current;
      current = next;
      i += 1;
    }

    // connect with the previous part
    if (last_node_of_previous_part !== null) {
      last_node_of_previous_part.next = previous;
    } else {
      head = previous;
    }
    // connect with the next part
    last_node_of_sub_list.next = current;

    if (current === null) {
      break;
    }
    previous = last_node_of_sub_list;
  }
  return head;
}

const head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
head.next.next.next = new Node(4);
head.next.next.next.next = new Node(5);
head.next.next.next.next.next = new Node(6);
head.next.next.next.next.next.next = new Node(7);
head.next.next.next.next.next.next.next = new Node(8);

process.stdout.write('Nodes of original LinkedList are: ');
head.print_list();
result = reverse_every_k_elements(head, 3);
process.stdout.write('Nodes of reversed LinkedList are: ');
result.print_list();

/*
Time complexity
The time complexity of our algorithm will be O(N) where ‘N’ is the total number of nodes in the LinkedList.

Space complexity
We only used constant space, therefore, the space complexity of our algorithm is O(1).*/
