//Rotate a LinkedList (medium)
/* Given the head of a Singly LinkedList and a number ‘k’, rotate the LinkedList to the right by ‘k’ nodes.

 Original List:
 head

    1   2   3   4   5   6    null
  head
 k=3
    4    5     6    1    2    3   null   */
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

const rotate = function (head, rotations) {
  // TODO: Write your code here
  if (!head || !head.next || rotations <= 0) return head;

  let lastNode = head;
  let listLength = 1;
  while (lastNode.next) {
    lastNode = lastNode.next;
    listLength++;
  }
  lastNode.next = head;
  rotations = rotations % listLength;
  let skipLength = listLength - rotations;
  let lastNodeRotatedList = head;
  for (let i = 0; i < skipLength - 1; i++) {
    lastNodeRotatedList = lastNodeRotatedList.next;
  }
  head = lastNodeRotatedList.next;
  lastNodeRotatedList.next = null;
  return head;
};

const head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
head.next.next.next = new Node(4);
head.next.next.next.next = new Node(5);
head.next.next.next.next.next = new Node(6);

console.log(`Nodes of original LinkedList are: ${head.get_list()}`);
console.log(`Nodes of rotated LinkedList are: ${rotate(head, 3).get_list()}`);

/*
    Solution
Another way of defining the rotation is to take the sub-list of ‘k’ ending nodes of the LinkedList and connect them to the beginning. Other than that we have to do three more things:

Connect the last node of the LinkedList to the head, because the list will have a different tail after the rotation.
The new head of the LinkedList will be the node at the beginning of the sublist.
The node right before the start of sub-list will be the new tail of the rotated LinkedList.
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

function rotate(head, rotations) {
  if (head === null || head.next === null || rotations <= 0) {
    return head;
  }

  // find the length and the last node of the list
  let last_node = head;
  let list_length = 1;
  while (last_node.next !== null) {
    last_node = last_node.next;
    list_length += 1;
  }
  last_node.next = head; // connect the last node with the head to make it a circular list
  rotations %= list_length; // no need to do rotations more than the length of the list
  skip_length = list_length - rotations;
  last_node_of_rotated_list = head;
  for (i = 0; i < skip_length - 1; i++) {
    last_node_of_rotated_list = last_node_of_rotated_list.next;
  }

  // 'last_node_of_rotated_list.next' is pointing to the sub-list of 'k' ending nodes
  head = last_node_of_rotated_list.next;
  last_node_of_rotated_list.next = null;
  return head;
}

const head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
head.next.next.next = new Node(4);
head.next.next.next.next = new Node(5);
head.next.next.next.next.next = new Node(6);

process.stdout.write('Nodes of original LinkedList are: ');
head.print_list();
result = rotate(head, 3);
process.stdout.write('Nodes of reversed LinkedList are: ');
result.print_list();

/* Time complexity
The time complexity of our algorithm will be O(N) where ‘N’ is the total number of nodes in the LinkedList.

Space complexity
We only used constant space, therefore, the space complexity of our algorithm is O(1).*/
