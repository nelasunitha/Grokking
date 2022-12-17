//Reconstructing a Sequence (hard)
/* Given a sequence originalSeq and an array of sequences, write a method to find if originalSeq can be uniquely reconstructed from the array of sequences.

Unique reconstruction means that we need to find if originalSeq is the only sequence such that all sequences in the array are subsequences of it.

Example 1:

Input: originalSeq: [1, 2, 3, 4], seqs: [[1, 2], [2, 3], [3, 4]]
Output: true
Explanation: The sequences [1, 2], [2, 3], and [3, 4] can uniquely reconstruct
[1, 2, 3, 4], in other words, all the given sequences uniquely define the order of numbers
in the 'originalSeq'.
Example 2:

Input: originalSeq: [1, 2, 3, 4], seqs: [[1, 2], [2, 3], [2, 4]]
Output: false
Explanation: The sequences [1, 2], [2, 3], and [2, 4] cannot uniquely reconstruct
[1, 2, 3, 4]. There are two possible sequences we can construct from the given sequences:
1) [1, 2, 3, 4]
2) [1, 2, 4, 3]
Example 3:

Input: originalSeq: [3, 1, 4, 2, 5], seqs: [[3, 1, 5], [1, 4, 2, 5]]
Output: true
Explanation: The sequences [3, 1, 5] and [1, 4, 2, 5] can uniquely reconstruct
[3, 1, 4, 2, 5].
Try it yourself
Try solving this question here:*/
/*Given a sequence originalSeq and an array of sequences, write a method to find if originalSeq can be uniquely reconstructed from the array of sequences.

Unique reconstruction means that we need to find if originalSeq is the only sequence such that all sequences in the array are subsequences of it.

Example 1:

Input: originalSeq: [1, 2, 3, 4], seqs: [[1, 2], [2, 3], [3, 4]]
Output: true
Explanation: The sequences [1, 2], [2, 3], and [3, 4] can uniquely reconstruct
[1, 2, 3, 4], in other words, all the given sequences uniquely define the order of numbers
in the 'originalSeq'.
Example 2:

Input: originalSeq: [1, 2, 3, 4], seqs: [[1, 2], [2, 3], [2, 4]]
Output: false
Explanation: The sequences [1, 2], [2, 3], and [2, 4] cannot uniquely reconstruct
[1, 2, 3, 4]. There are two possible sequences we can construct from the given sequences:
1) [1, 2, 3, 4]
2) [1, 2, 4, 3]
Example 3:

Input: originalSeq: [3, 1, 4, 2, 5], seqs: [[3, 1, 5], [1, 4, 2, 5]]
Output: true
Explanation: The sequences [3, 1, 5] and [1, 4, 2, 5] can uniquely reconstruct
[3, 1, 4, 2, 5].
Try it yourself
Try solving this question here:*/
const Deque = require('./collections/deque'); //http://www.collectionsjs.com

const can_construct = function(originalSeq, sequences) {
  // TODO: Write your code here
  let sortedOrder = [];

  let graph = {};
  let inDegree = {};

  sequences.forEach((seq) => {
    for(let i =0; i< seq.length; i++) {
      inDegree[seq[i]] = 0;
      graph[seq[i]] = []
    }
  })

  sequences.forEach((seq) => {
    for(let i =1; i< seq.length; i++) {
      let parent = seq[i-1];
      let child = seq[i];
      graph[parent].push(child);
      inDegree[child]++
    }
  })

  const vertices = Object.keys(inDegree);



  if(vertices.length !== originalSeq.length) return false;
  const source = new Deque;


  vertices.forEach(ver => {
    if(inDegree[ver] === 0) source.push(ver)
  })



  while(source.length) {
    if(source.length > 1) return false;

    // console.log(originalSeq[sortedOrder.length],source.peek() )
    if(originalSeq[sortedOrder.length] !== +source.peek()) return false

    let vertex = source.shift();


    sortedOrder.push(vertex);
    graph[vertex].forEach((child) => {
      inDegree[child]--;
      if(inDegree[child] === 0) source.push(child)
    })

  }
  // console.log(sortedOrder)


  return sortedOrder.length === originalSeq.length;
};

console.log(`Can construct: ${can_construct([1, 2, 3, 4], [[1, 2], [2, 3], [3, 4]])}`)
console.log(`Can construct: ${can_construct([1, 2, 3, 4], [[1, 2], [2, 3], [2, 4]])}`)
console.log(`Can construct: ${can_construct([3, 1, 4, 2, 5], [[3, 1, 5], [1, 4, 2, 5]])}`)

/*Solution
Since each sequence in the given array defines the ordering of some numbers, we need to combine all these ordering rules to find two things:

Is it possible to construct the originalSeq from all these rules?
Are these ordering rules not sufficient enough to define the unique ordering of all the numbers in the originalSeq? In other words, can these rules result in more than one sequence?
Take Example-1:

originalSeq: [1, 2, 3, 4], seqs:[[1, 2], [2, 3], [3, 4]]
The first sequence tells us that ‘1’ comes before ‘2’; the second sequence tells us that ‘2’ comes before ‘3’; the third sequence tells us that ‘3’ comes before ‘4’. Combining all these sequences will result in a unique sequence: [1, 2, 3, 4].

The above explanation tells us that we are actually asked to find the topological ordering of all the numbers and also to verify that there is only one topological ordering of the numbers possible from the given array of the sequences.

This makes the current problem similar to Tasks Scheduling Order with two differences:

We need to build the graph of the numbers by comparing each pair of numbers in the given array of sequences.
We must perform the topological sort for the graph to determine two things:
Can the topological ordering construct the originalSeq?
That there is only one topological ordering of the numbers possible. This can be confirmed if we do not have more than one source at any time while finding the topological ordering of numbers.
Code
Here is what our algorithm will look like (only the highlighted lines have changed):*/
const Deque = require('./collections/deque'); //http://www.collectionsjs.com


function can_construct(originalSeq, sequences) {
  sortedOrder = [];
  if (originalSeq.length <= 0) {
    return false;
  }

  // a. Initialize the graph
  const inDegree = {}; // count of incoming edges
  const graph = {}; // adjacency list graph

  sequences.forEach((sequence) => {
    for (let i = 0; i < sequence.length; i++) {
      inDegree[sequence[i]] = 0;
      graph[sequence[i]] = [];
    }
  });

  // b. Build the graph
  sequences.forEach((sequence) => {
    for (let i = 1; i < sequence.length; i++) {
      const parent = sequence[i - 1];
      child = sequence[i];
      graph[parent].push(child);
      inDegree[child] += 1;
    }
  });

  // if we don't have ordering rules for all the numbers we'll not able to uniquely construct the sequence
  const vertices = Object.keys(inDegree);
  if (vertices.length !== originalSeq.length) {
    return false;
  }

  // c. Find all sources i.e., all vertices with 0 in-degrees
  const sources = new Deque();
  vertices.forEach((key) => {
    if (inDegree[key] === 0) {
      sources.push(key);
    }
  });


  // d. For each source, add it to the sortedOrder and subtract one from all of its children's in-degrees
  // if a child's in-degree becomes zero, add it to the sources queue
  while (sources.length > 0) {
    if (sources.length > 1) {
      return false; // more than one sources mean, there is more than one way to reconstruct the sequence
    }
    if (originalSeq[sortedOrder.length] != sources.peek()) {
      // the next source(or number) is different from the original sequence
      return false;
    }

    const vertex = sources.shift();
    sortedOrder.push(vertex);
    graph[vertex].forEach((child) => { // get the node's children to decrement their in-degrees
      inDegree[child] -= 1;
      if (inDegree[child] === 0) {
        sources.push(child);
      }
    });
  }


  // if sortedOrder's size is not equal to original sequence's size, there is no unique way to construct
  return sortedOrder.length === originalSeq.length;
}


console.log(`Can construct: ${
  can_construct([1, 2, 3, 4], [
    [1, 2],
    [2, 3],
    [3, 4],
  ])}`);
console.log(`Can construct: ${
  can_construct([1, 2, 3, 4], [
    [1, 2],
    [2, 3],
    [2, 4],
  ])}`);
console.log(`Can construct: ${
  can_construct([3, 1, 4, 2, 5], [
    [3, 1, 5],
    [1, 4, 2, 5],
  ])}`);
  /* Time complexity#
In step ‘d’, each number can become a source only once and each edge (a rule) will be accessed and removed once. Therefore, the time complexity of the above algorithm will be O(V+E)
O(V+E)
, where ‘V’ is the count of distinct numbers and ‘E’ is the total number of the rules. Since, at most, each pair of numbers can give us one rule, we can conclude that the upper bound for the rules is O(N)
O(N)
where ‘N’ is the count of numbers in all sequences. So, we can say that the time complexity of our algorithm is O(V+N)
O(V+N.

Space complexity
The space complexity will be O(V+N), since we are storing all of the rules for each number in an adjacency list.*/