//Intervals Intersection (medium)
/*
Problem Statement
Given two lists of intervals, find the intersection of these two lists. Each list consists of disjoint intervals sorted on their start time.

Example 1:

Input: arr1=[[1, 3], [5, 6], [7, 9]], arr2=[[2, 3], [5, 7]]
Output: [2, 3], [5, 6], [7, 7]
Explanation: The output list contains the common intervals between the two lists.
Example 2:

Input: arr1=[[1, 3], [5, 7], [9, 12]], arr2=[[5, 10]]
Output: [5, 7], [9, 10]
Explanation: The output list contains the common intervals between the two lists.
Try it yourself
Try solving this question here:*/
class Interval {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  print_interval() {
    process.stdout.write(`[${this.start}, ${this.end}]`);
  }
}

const merge = function (intervals_a, intervals_b) {
  let result = [];
  // TODO: Write your code here
  let i = 0,
    j = 0;
  while (i < intervals_a.length && j < intervals_b.length) {
    let aOLb =
      intervals_a[i].start >= intervals_b[j].start &&
      intervals_a[i].start <= intervals_b[j].end;
    let bOLA =
      intervals_b[j].start >= intervals_a[i].start &&
      intervals_b[j].start <= intervals_a[i].end;
    if (aOLb || bOLA) {
      let start1 = Math.max(intervals_a[i].start, intervals_b[j].start);

      let end1 = Math.min(intervals_a[i].end, intervals_b[j].end);
      // console.log(start, end)
      result.push(new Interval(start1, end1));
    }
    if (intervals_a[i].end < intervals_b[j].end) i++;
    else j++;
  }
  return result;
};

process.stdout.write('Intervals Intersection: ');
let result = merge(
  [new Interval(1, 3), new Interval(5, 6), new Interval(7, 9)],
  [new Interval(2, 3), new Interval(5, 7)]
);
for (let i = 0; i < result.length; i++) {
  result[i].print_interval();
}
console.log();

process.stdout.write('Intervals Intersection: ');
result = merge(
  [new Interval(1, 3), new Interval(5, 7), new Interval(9, 12)],
  [new Interval(5, 10)]
);
for (let i = 0; i < result.length; i++) {
  result[i].print_interval();
}
console.log();
/*
Solution
This problem follows the Merge Intervals pattern. As we have discussed under Insert Interval, there are five overlapping possibilities between two intervals ‘a’ and ‘b’. A close observation will tell us that whenever the two intervals overlap, one of the interval’s start time lies within the other interval. This rule can help us identify if any two intervals overlap or not.

svg viewer

Now, if we have found that the two intervals overlap, how can we find the overlapped part?

Again from the above diagram, the overlapping interval will be equal to:

    start = max(a.start, b.start)
    end = min(a.end, b.end)
That is, the highest start time and the lowest end time will be the overlapping interval.

So our algorithm will be to iterate through both the lists together to see if any two intervals overlap. If two intervals overlap, we will insert the overlapped part into a result list and move on to the next interval which is finishing early.

Code
Here is what our algorithm will look like*/

class Interval {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  print_interval() {
    process.stdout.write(`[${this.start}, ${this.end}]`);
  }
}

function merge(intervals_a, intervals_b) {
  let result = [],
    i = 0,
    j = 0;

  while (i < intervals_a.length && j < intervals_b.length) {
    // check if intervals overlap and intervals_a[i]'s start time lies within the other intervals_b[j]
    a_overlaps_b =
      intervals_a[i].start >= intervals_b[j].start &&
      intervals_a[i].start <= intervals_b[j].end;

    // check if intervals overlap and intervals_b[j]'s start time lies within the other intervals_a[i]
    b_overlaps_a =
      intervals_b[j].start >= intervals_a[i].start &&
      intervals_b[j].start <= intervals_a[i].end;

    // store the the intersection part
    if (a_overlaps_b || b_overlaps_a) {
      result.push(
        new Interval(
          Math.max(intervals_a[i].start, intervals_b[j].start),
          Math.min(intervals_a[i].end, intervals_b[j].end)
        )
      );
    }
    // move next from the interval which is finishing first
    if (intervals_a[i].end < intervals_b[j].end) {
      i += 1;
    } else {
      j += 1;
    }
  }

  return result;
}

process.stdout.write('Intervals Intersection: ');
let result = merge(
  [new Interval(1, 3), new Interval(5, 6), new Interval(7, 9)],
  [new Interval(2, 3), new Interval(5, 7)]
);
for (i = 0; i < result.length; i++) {
  result[i].print_interval();
}
console.log();

process.stdout.write('Intervals Intersection: ');
result = merge(
  [new Interval(1, 3), new Interval(5, 7), new Interval(9, 12)],
  [new Interval(5, 10)]
);
for (i = 0; i < result.length; i++) {
  result[i].print_interval();
}
console.log();
/*Time complexity#
As we are iterating through both the lists once, the time complexity of the above algorithm is O(N + M) where ‘N’ and ‘M’ are the total number of intervals in the input arrays respectively.

Space complexity
Ignoring the space needed for the result list, the algorithm runs in constant space O(1).*/
