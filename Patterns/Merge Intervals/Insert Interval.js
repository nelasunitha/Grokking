/*Problem Statement
Given a list of non-overlapping intervals sorted by their start time, insert a given interval at the correct position and merge all necessary intervals to produce a list that has only mutually exclusive intervals.

Example 1:

Input: Intervals=[[1,3], [5,7], [8,12]], New Interval=[4,6]
Output: [[1,3], [4,7], [8,12]]
Explanation: After insertion, since [4,6] overlaps with [5,7], we merged them into one [4,7].
Example 2:

Input: Intervals=[[1,3], [5,7], [8,12]], New Interval=[4,10]
Output: [[1,3], [4,12]]
Explanation: After insertion, since [4,10] overlaps with [5,7] & [8,12], we merged them into [4,12].
Example 3:

Input: Intervals=[[2,3],[5,7]], New Interval=[1,4]
Output: [[1,4], [5,7]]
Explanation: After insertion, since [1,4] overlaps with [2,3], we merged them into one [1,4].

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

const insert = function (intervals, new_interval) {
  let merged = [];
  // TODO: Write your codeere
  let i = 0;
  while (i < intervals.length && intervals[i].end < new_interval.start) {
    merged.push(intervals[i]);
    i++;
  }
  while (i < intervals.length && intervals[i].start <= new_interval.end) {
    new_interval.start = Math.min(intervals[i].start, new_interval.start);
    new_interval.end = Math.max(intervals[i].end, new_interval.end);
    i++;
  }
  merged.push(new_interval);
  while (i < intervals.length) {
    merged.push(intervals[i]);
    i++;
  }
  return merged;
};

process.stdout.write('Intervals after inserting the new interval: ');
let result = insert(
  [new Interval(1, 3), new Interval(5, 7), new Interval(8, 12)],
  new Interval(4, 6)
);
for (let i = 0; i < result.length; i++) {
  result[i].print_interval();
}
console.log();

process.stdout.write('Intervals after inserting the new interval: ');
result = insert(
  [new Interval(1, 3), new Interval(5, 7), new Interval(8, 12)],
  new Interval(4, 10)
);
for (let i = 0; i < result.length; i++) {
  result[i].print_interval();
}
console.log();

process.stdout.write('Intervals after inserting the new interval: ');
result = insert([new Interval(2, 3), new Interval(5, 7)], new Interval(1, 4));
for (let i = 0; i < result.length; i++) {
  result[i].print_interval();
}
console.log();
/*
Solution
If the given list was not sorted, we could have simply appended the new interval to it and used the merge() function from Merge Intervals. But since the given list is sorted, we should try to come up with a solution better than O(N * logN)
O(N∗logN)

When inserting a new interval in a sorted list, we need to first find the correct index where the new interval can be placed. In other words, we need to skip all the intervals which end before the start of the new interval. So we can iterate through the given sorted listed of intervals and skip all the intervals with the following condition:

intervals[i].end < newInterval.start
Once we have found the correct place, we can follow an approach similar to Merge Intervals to insert and/or merge the new interval. Let’s call the new interval ‘a’ and the first interval with the above condition ‘b’. There are five possibilities:

svg viewer

The diagram above clearly shows the merging approach. To handle all four merging scenarios, we need to do something like this:

    c.start = min(a.start, b.start)
    c.end = max(a.end, b.end)
Our overall algorithm will look like this:

Skip all intervals which end before the start of the new interval, i.e., skip all intervals with the following condition:
    intervals[i].end < newInterval.start
Let’s call the last interval ‘b’ that does not satisfy the above condition. If ‘b’ overlaps with the new interval (a) (i.e. b.start <= a.end), we need to merge them into a new interval ‘c’:
    c.start = min(a.start, b.start)
    c.end = max(a.end, b.end)
We will repeat the above two steps to merge ‘c’ with the next overlapping interval.
Code
Here is what our algorithm will look like:*/
class Interval {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  print_interval() {
    process.stdout.write(`[${this.start}, ${this.end}]`);
  }
}

function insert(intervals, new_interval) {
  let merged = [],
    i = 0;

  // skip and add to output) all intervals that come before the 'new_interval'
  while (i < intervals.length && intervals[i].end < new_interval.start) {
    merged.push(intervals[i]);
    i += 1;
  }

  // merge all intervals that overlap with 'new_interval'
  while (i < intervals.length && intervals[i].start <= new_interval.end) {
    new_interval.start = Math.min(intervals[i].start, new_interval.start);
    new_interval.end = Math.max(intervals[i].end, new_interval.end);
    i += 1;
  }

  // insert the new_interval
  merged.push(new_interval);

  // add all the remaining intervals to the output
  while (i < intervals.length) {
    merged.push(intervals[i]);
    i += 1;
  }

  return merged;
}

process.stdout.write('Intervals after inserting the new interval: ');
let result = insert(
  [new Interval(1, 3), new Interval(5, 7), new Interval(8, 12)],
  new Interval(4, 6)
);
for (i = 0; i < result.length; i++) {
  result[i].print_interval();
}
console.log();

process.stdout.write('Intervals after inserting the new interval: ');
result = insert(
  [new Interval(1, 3), new Interval(5, 7), new Interval(8, 12)],
  new Interval(4, 10)
);
for (i = 0; i < result.length; i++) {
  result[i].print_interval();
}
console.log();

process.stdout.write('Intervals after inserting the new interval: ');
result = insert([new Interval(2, 3), new Interval(5, 7)], new Interval(1, 4));
for (i = 0; i < result.length; i++) {
  result[i].print_interval();
}
console.log();

/*Time complexity
As we are iterating through all the intervals only once, the time complexity of the above algorithm is O(N)
O(N)
, where ‘N’ is the total number of intervals.

Space complexity
The space complexity of the above algorithm will be O(N)
O(N)
 as we need to return a list containing all the merged intervals.*/
