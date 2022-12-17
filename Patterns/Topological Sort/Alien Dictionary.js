//Alien Dictionary (hard)
/*Problem Statement
There is a dictionary containing words from an alien language for which we don’t know the ordering of the letters. Write a method to find the correct order of the letters in the alien language. It is given that the input is a valid dictionary and there exists an ordering among its letters.

Example 1:

Input: Words: ["ba", "bc", "ac", "cab"]
Output: bac
Explanation: Given that the words are sorted lexicographically by the rules of the alien language, so
from the given words we can conclude the following ordering among its characters:

1. From "ba" and "bc", we can conclude that 'a' comes before 'c'.
2. From "bc" and "ac", we can conclude that 'b' comes before 'a'

From the above two points, we can conclude that the correct character order is: "bac"
Example 2:

Input: Words: ["cab", "aaa", "aab"]
Output: cab
Explanation: From the given words we can conclude the following ordering among its characters:

1. From "cab" and "aaa", we can conclude that 'c' comes before 'a'.
2. From "aaa" and "aab", we can conclude that 'a' comes before 'b'

From the above two points, we can conclude that the correct character order is: "cab"
Example 3:

Input: Words: ["ywx", "wz", "xww", "xz", "zyy", "zwz"]
Output: ywxz
Explanation: From the given words we can conclude the following ordering among its characters:

1. From "ywx" and "wz", we can conclude that 'y' comes before 'w'.
2. From "wz" and "xww", we can conclude that 'w' comes before 'x'.
3. From "xww" and "xz", we can conclude that 'w' comes before 'z'
4. From "xz" and "zyy", we can conclude that 'x' comes before 'z'
5. From "zyy" and "zwz", we can conclude that 'y' comes before 'w'

From the above five points, we can conclude that the correct character order is: "ywxz"
Try it yourself
Try solving this question here:*/
const find_order = function (words) {
  // TODO: Write your code here
  if (words.length === 0) return '';

  const inDegree = {};
  const graph = {};

  words.forEach((word) => {
    for (let i = 0; i < word.length; i++) {
      inDegree[word[i]] = 0;
      graph[word[i]] = [];
    }
  });

  for (let i = 0; i < words.length - 1; i++) {
    let w1 = words[i],
      w2 = words[i + 1];
    let len = Math.min(w1.length, w2.length);
    for (let j = 0; j < len; j++) {
      let parent = w1[j],
        child = w2[j];
      if (parent !== child) {
        graph[parent].push(child);
        inDegree[child]++;
        break;
      }
    }
  }

  let sources = [];
  const chars = Object.keys(inDegree);
  chars.forEach((char) => {
    if (inDegree[char] === 0) sources.push(char);
  });
  let sortedOrder = [];

  while (sources.length) {
    const vertex = sources.shift();
    sortedOrder.push(vertex);
    graph[vertex].forEach((child) => {
      inDegree[child]--;
      if (inDegree[child] === 0) sources.push(child);
    });
  }
  if (sortedOrder.length !== chars.length) return '';

  return sortedOrder.join('');
};

console.log(`Character order: ${find_order(['ba', 'bc', 'ac', 'cab'])}`);
console.log(`Character order: ${find_order(['cab', 'aaa', 'aab'])}`);
console.log(
  `Character order: ${find_order(['ywx', 'wz', 'xww', 'xz', 'zyy', 'zwz'])}`
);
/* Solution
Since the given words are sorted lexicographically by the rules of the alien language, we can always compare two adjacent words to determine the ordering of the characters. Take Example-1 above: [“ba”, “bc”, “ac”, “cab”]

Take the first two words “ba” and “bc”. Starting from the beginning of the words, find the first character that is different in both words: it would be ‘a’ from “ba” and ‘c’ from “bc”. Because of the sorted order of words (i.e. the dictionary!), we can conclude that ‘a’ comes before ‘c’ in the alien language.
Similarly, from “bc” and “ac”, we can conclude that ‘b’ comes before ‘a’.
These two points tell us that we are actually asked to find the topological ordering of the characters, and that the ordering rules should be inferred from adjacent words from the alien dictionary.

This makes the current problem similar to Tasks Scheduling Order, the only difference being that we need to build the graph of the characters by comparing adjacent words first, and then perform the topological sort for the graph to determine the order of the characters.

Code
Here is what our algorithm will look like (only the highlighted lines have changed):*/
const Deque = require('./collections/deque'); //http://www.collectionsjs.com

function find_order(words) {
  if (words.length === 0) {
    return '';
  }

  // a. Initialize the graph
  const inDegree = {}; // count of incoming edges
  const graph = {}; // adjacency list graph

  words.forEach((word) => {
    for (let i = 0; i < word.length; i++) {
      inDegree[word[i]] = 0;
      graph[word[i]] = [];
    }
  });

  // b. Build the graph
  for (i = 0; i < words.length - 1; i++) {
    // find ordering of characters from adjacent words
    let w1 = words[i],
      w2 = words[i + 1];
    for (j = 0; j < Math.min(w1.length, w2.length); j++) {
      let parent = w1[j],
        child = w2[j];
      if (parent !== child) {
        // if the two characters are different
        // put the child into it's parent's list
        graph[parent].push(child);
        inDegree[child] += 1; // increment child's inDegree
        break; // only the first different character between the two words will help us find the order
      }
    }
  }

  // c. Find all sources i.e., all vertices with 0 in-degrees
  const sources = new Deque();
  const chars = Object.keys(inDegree);
  chars.forEach((key) => {
    if (inDegree[key] === 0) {
      sources.push(key);
    }
  });

  // d. For each source, add it to the sortedOrder and subtract one from all of its children's in-degrees
  // if a child's in-degree becomes zero, add it to the sources queue
  sortedOrder = [];
  while (sources.length > 0) {
    vertex = sources.shift();
    sortedOrder.push(vertex);
    graph[vertex].forEach((child) => {
      // get the node's children to decrement their in-degrees
      inDegree[child] -= 1;
      if (inDegree[child] === 0) {
        sources.push(child);
      }
    });
  }

  // if sortedOrder doesn't contain all characters, there is a cyclic dependency between characters, therefore, we
  // will not be able to find the correct ordering of the characters
  if (sortedOrder.length !== chars.length) {
    return '';
  }

  return sortedOrder.join('');
}

console.log(`Character order: ${find_order(['ba', 'bc', 'ac', 'cab'])}`);
console.log(`Character order: ${find_order(['cab', 'aaa', 'aab'])}`);
console.log(
  `Character order: ${find_order(['ywx', 'wz', 'xww', 'xz', 'zyy', 'zwz'])}`
);
/*Time complexity
In step ‘d’, each task can become a source only once and each edge (a rule) will be accessed and removed once. Therefore, the time complexity of the above algorithm will be O(V+E), where ‘V’ is the total number of different characters and ‘E’ is the total number of the rules in the alien language. Since, at most, each pair of words can give us one rule, therefore, we can conclude that the upper bound for the rules is O(NO(N)
 where ‘N’ is the number of words in the input. So, we can say that the time complexity of our algorithm is O(V+N).

Space complexity
The space complexity will be O(V+N), since we are storing all of the rules for each character in an adjacency list.
