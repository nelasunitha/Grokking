//Start of LinkedList Cycle (medium)

/*Given the head of a Singly LinkedList that contains a cycle, write a function to find the starting node of the cycle.

 head     Cycle st
    1   2   3   4   5   6  -> 3

    head       Cycle st
    1   2   3   4   5   6  -> 4

    head,Cycle st
    1   2   3   4   5   6  -> 1
    Try it yourself#*/
class Node {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

// function startOfLL(head) {
//   let slow =head, fast = head, pointer = head;

//   if(!head || !head.next) return null;

//   while(fast && fast.next) {
//     slow = slow.next;
//     fast = fast.next.next;
//     if(slow === fast) break;
//   }
//   if(fast !== slow) return null;

//   while(pointer !== slow) {
//     slow = slow.next;
//     pointer = pointer.next;
//   }
//   return slow;
// }
// const head = new Node(1);
// head.next  = new Node(2);
// head.next.next  = new Node(3);
// head.next.next.next  = new Node(4);
// head.next.next.next.next  = new Node(5);
// head.next.next.next.next.next  = new Node(6);
// head.next.next.next.next.next.next = head.next.next;

// class Node {
//   constructor(value, next=null){
//     this.value = value;
//     this.next = next;
//   }
// }

const find_cycle_start = function (head) {
  // TODO: Write your code here
  let fast = head,
    slow = head,
    pointer = head;
  //if no element or elements not more than 2 to form a cycle will return null
  if (!head || !head.next) return null;
  //loop continue until slow meets fast
  while (fast && fast.next) {
    fast = fast.next.next; //3,5,1,3,5,1,3,5
    //found the cycle and breaks
    slow = slow.next; //2,4,5,1,2,3,4,5
    console.log('f', fast.value, 's', slow.value);
    if (fast === slow) break;
  }
  //if cycle not found
  if (fast !== slow) return null;
  //the beginning of the cycle will be where slow and pointer intersects whreeas when fast === slow is middle of LL
  // slow = head;
  while (pointer !== slow) {
    pointer = pointer.next;
    slow = slow.next;
  }
  return slow;
};

const head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
head.next.next.next = new Node(4);
head.next.next.next.next = new Node(5);
head.next.next.next.next.next = new Node(6);

head.next.next.next.next.next.next = head.next.next;
console.log(`LinkedList cycle start: ${find_cycle_start(head).value}`);

head.next.next.next.next.next.next = head.next.next.next;
console.log(`LinkedList cycle start: ${find_cycle_start(head).value}`);

head.next.next.next.next.next.next = head;
console.log(`LinkedList cycle start: ${find_cycle_start(head).value}`);

/* Solution
If we know the length of the LinkedList cycle, we can find the start of the cycle through the following steps:

Take two pointers. Let’s call them pointer1 and pointer2.
Initialize both pointers to point to the start of the LinkedList.
We can find the length of the LinkedList cycle using the approach discussed in LinkedList Cycle. Let’s assume that the length of the cycle is ‘K’ nodes.
Move pointer2 ahead by ‘K’ nodes.
Now, keep incrementing pointer1 and pointer2 until they both meet.
As pointer2 is ‘K’ nodes ahead of pointer1, which means, pointer2 must have completed one loop in the cycle when both pointers meet. Their meeting point will be the start of the cycle.*/

class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

function find_cycle_start(head) {
  cycle_length = 0;
  // find the LinkedList cycle
  let slow = head,
    fast = head;
  while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
    slow = slow.next;
    if (slow === fast) {
      // found the cycle
      cycle_length = calculate_cycle_length(slow);
      break;
    }
  }
  return find_start(head, cycle_length);
}

function calculate_cycle_length(slow) {
  let current = slow,
    cycle_length = 0;
  while (true) {
    current = current.next;
    cycle_length += 1;
    if (current === slow) {
      break;
    }
  }
  return cycle_length;
}

function find_start(head, cycle_length) {
  let pointer1 = head,
    pointer2 = head;
  // move pointer2 ahead 'cycle_length' nodes
  while (cycle_length > 0) {
    pointer2 = pointer2.next;
    cycle_length -= 1;
  }
  // increment both pointers until they meet at the start of the cycle
  while (pointer1 !== pointer2) {
    pointer1 = pointer1.next;
    pointer2 = pointer2.next;
  }

  return pointer1;
}

const head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
head.next.next.next = new Node(4);
head.next.next.next.next = new Node(5);
head.next.next.next.next.next = new Node(6);

head.next.next.next.next.next.next = head.next.next;
console.log(`LinkedList cycle start: ${find_cycle_start(head).value}`);

head.next.next.next.next.next.next = head.next.next.next;
console.log(`LinkedList cycle start: ${find_cycle_start(head).value}`);

head.next.next.next.next.next.next = head;
console.log(`LinkedList cycle start: ${find_cycle_start(head).value}`);

/* Time Complexity
As we know, finding the cycle in a LinkedList with ‘N’ nodes and also finding the length of the cycle requires O(N). Also, as we saw in the above algorithm, we will need O(N) to find the start of the cycle. Therefore, the overall time complexity of our algorithm will be O(N)
.

Space Complexity
The algorithm runs in constant space O(1) */
