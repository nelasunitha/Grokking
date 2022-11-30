//Reverse alternating K-element Sub-list (medium)
/*Given the head of a LinkedList and a number ‘k’, reverse every alternating ‘k’ sized sub-list starting from the head.

If, in the end, you are left with a sub-list with less than ‘k’ elements, reverse it too.

 Original List:
 Example:
 head
 head  1   2    3      4     5     6     7    8     null
 Reversed Sub-list:
 k=2
    2    1   3   4   6    5    7   8   null
Try it yourself
Try solving this question here:*/
class Node {
  constructor(value, next=null){
    this.value = value;
    this.next = next;
  }

  get_list() {
    result = "";
    temp = this;
    while (temp !== null) {
      result += temp.value + " ";
      temp = temp.next;
    }
    return result;
  }
};


const reverse_alternate_k_elements = function(head, k) {
  // TODO: Write your code here
  if (k <= 1 || head === null) {
    return head;
  }
  let prev = null, current = head;
  while(current) {
    const lastNodeFirst = prev;
    let lastNodeSubSet = current;
    let next = null, i = 0;
    while(current !== null && i < k) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
      i++;
    }
    if(lastNodeFirst) lastNodeFirst.next = prev;
    else head = prev;
    lastNodeSubSet.next = current;
    i = 0;
    while(current && i < k) {
      prev = current;
      current = current.next;
      i++
    }
  }
  return head;
};



const head = new Node(1)
head.next = new Node(2)
head.next.next = new Node(3)
head.next.next.next = new Node(4)
head.next.next.next.next = new Node(5)
head.next.next.next.next.next = new Node(6)
head.next.next.next.next.next.next = new Node(7)
head.next.next.next.next.next.next.next = new Node(8)

console.log(`Nodes of original LinkedList are: ${head.get_list()}`)
console.log(`Nodes of reversed LinkedList are: ${reverse_alternate_k_elements(head, 2).get_list()}`)
/* Solution
The problem follows the In-place Reversal of a LinkedList pattern and is quite similar to Reverse every K-element Sub-list. The only difference is that we have to skip ‘k’ alternating elements. We can follow a similar approach, and in each iteration after reversing ‘k’ elements, we will skip the next ‘k’ elements.

Code
Most of the code is the same as Reverse every K-element Sub-list; only the highlighted lines have a majority of the changes:*/
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

function reverse_alternate_k_elements(head, k) {
  if (k <= 1 || head === null) {
    return head;
  }

  let current = head,
    previous = null;
  while (current !== null) {  // break if we've reached the end of the list
    const last_node_of_previous_part = previous;
    // after reversing the LinkedList 'current' will become the last node of the sub-list
    const last_node_of_sub_list = current;
    let next = null; // will be used to temporarily store the next node

    // reverse 'k' nodes
    let i = 0;
    while (current !== null && i < k) {
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

    // skip 'k' nodes
    i = 0;
    while (current !== null && i < k) {
      previous = current;
      current = current.next;
      i += 1;
    }
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
result = reverse_alternate_k_elements(head, 2);
process.stdout.write('Nodes of reversed LinkedList are: ');
result.print_list();

/* Time complexity
The time complexity of our algorithm will be O(N),where ‘N’ is the total number of nodes in the LinkedList.

Space complexity
We only used constant space, therefore, the space complexity of our algorithm is O(1).*/
