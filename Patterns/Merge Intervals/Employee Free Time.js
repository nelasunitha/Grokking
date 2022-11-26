//Employee Free Time (hard)
/* For ‘K’ employees, we are given a list of intervals representing the working hours of each employee. Our goal is to find out if there is a free interval that is common to all employees. You can assume that each list of employee working hours is sorted on the start time.

Example 1:

Input: Employee Working Hours=[[[1,3], [5,6]], [[2,3], [6,8]]]
Output: [3,5]
Explanation: Both the employees are free between [3,5].
Example 2:

Input: Employee Working Hours=[[[1,3], [9,12]], [[2,4]], [[6,8]]]
Output: [4,6], [8,9]
Explanation: All employees are free between [4,6] and [8,9].
Example 3:

Input: Employee Working Hours=[[[1,3]], [[2,4]], [[3,5], [7,9]]]
Output: [5,7]
Explanation: All employees are free between [5,7].
Try it yourself
Try solving this question here:*/
class Interval {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  get_interval() {
    return '[' + this.start + ', ' + this.end + ']';
  }
}

const find_employee_free_time = function (schedule) {
  (intervals = []), (result = []);
  // TODO: Write your code here
  if (!schedule) return [];
  for (let employee = 0; employee < schedule.length; employee++) {
    for (let interval of schedule[employee]) {
      intervals.push(interval);
    }
  }
  console.log(intervals);
  intervals.sort((a, b) => a.start - b.start);
  let maxEnd = intervals[0].end;
  for (let i = 1; i < intervals.length; i++) {
    if (maxEnd < intervals[i].start)
      result.push(new Interval(maxEnd, intervals[i].start));
    maxEnd = Math.max(maxEnd, intervals[i].end);
  }
  return result;
};

let input = [
  [new Interval(1, 3), new Interval(5, 6)],
  [new Interval(2, 3), new Interval(6, 8)],
];
let ntervals = find_employee_free_time(input);
let result = 'Free intervals: ';
for (let i = 0; i < intervals.length; i++)
  result += intervals[i].get_interval();
console.log(result);

input = [
  [new Interval(1, 3), new Interval(9, 12)],
  [new Interval(2, 4)],
  [new Interval(6, 8)],
];
intervals = find_employee_free_time(input);
result = 'Free intervals: ';
for (let i = 0; i < intervals.length; i++)
  result += intervals[i].get_interval();
console.log(result);

input = [
  [new Interval(1, 3)],
  [new Interval(2, 4)],
  [new Interval(3, 5), new Interval(7, 9)],
];
intervals = find_employee_free_time(input);
result = 'Free intervals: ';
for (let i = 0; i < intervals.length; i++)
  result += intervals[i].get_interval();
console.log(result);
/*
Solution
This problem follows the Merge Intervals pattern. Let’s take the above-mentioned example (2) and visually draw it:

Input: Employee Working Hours=[[[1,3], [9,12]], [[2,4]], [[6,8]]]
Output: [4,6], [8,9]
svg viewer

One simple solution can be to put all employees’ working hours in a list and sort them on the start time. Then we can iterate through the list to find the gaps. Let’s dig deeper. Sorting the intervals of the above example will give us:

[1,3], [2,4], [6,8], [9,12]
We can now iterate through these intervals, and whenever we find non-overlapping intervals (e.g., [2,4] and [6,8]), we can calculate a free interval (e.g., [4,6]). This algorithm will take O(N * logN)
O(N∗logN)
 time, where ‘N’ is the total number of intervals. This time is needed because we need to sort all the intervals. The space complexity will be O(N)
O(N)
, which is needed for sorting. Can we find a better solution?

Using a Heap to Sort the Intervals
One fact that we are not utilizing is that each employee list is individually sorted!

How about we take the first interval of each employee and insert it in a Min Heap. This Min Heap can always give us the interval with the smallest start time. Once we have the smallest start-time interval, we can then compare it with the next smallest start-time interval (again from the Heap) to find the gap. This interval comparison is similar to what we suggested in the previous approach.

Whenever we take an interval out of the Min Heap, we can insert the same employee’s next interval. This also means that we need to know which interval belongs to which employee.

Code
Here is what our algorithm will look like:*/
const Heap = require('./collections/heap'); //http://www.collectionsjs.com

class Interval {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  print_interval() {
    process.stdout.write(`[${this.start}, ${this.end}]`);
  }
}

class EmployeeInterval {
  constructor(interval, employeeIndex, intervalIndex) {
    this.interval = interval; // interval representing employee's working hours
    // index of the list containing working hours of this employee
    this.employeeIndex = employeeIndex;
    this.intervalIndex = intervalIndex; // index of the interval in the employee list
  }
}
console.log(EmployeeInterval.interval);

function find_employee_free_time(schedule) {
  let n = schedule.length,
    result = [];
  if (schedule === null || n === 0) {
    return result;
  }
  minHeap = new Heap([], null, (a, b) => b.interval.start - a.interval.start);
  // insert the first interval of each employee to the queue
  for (i = 0; i < n; i++) {
    minHeap.push(new EmployeeInterval(schedule[i][0], i, 0));
  }
  previousInterval = minHeap.peek().interval;
  while (minHeap.length > 0) {
    const queueTop = minHeap.pop();
    // if previousInterval is not overlapping with the next interval, insert a free interval
    if (previousInterval.end < queueTop.interval.start) {
      result.push(new Interval(previousInterval.end, queueTop.interval.start));
      previousInterval = queueTop.interval;
    } else {
      // overlapping intervals, update the previousInterval if needed
      if (previousInterval.end < queueTop.interval.end) {
        previousInterval = queueTop.interval;
      }
    }
    // if there are more intervals available for(the same employee, add their next interval
    const employeeSchedule = schedule[queueTop.employeeIndex];
    if (employeeSchedule.length > queueTop.intervalIndex + 1) {
      minHeap.push(
        new EmployeeInterval(
          employeeSchedule[queueTop.intervalIndex + 1],
          queueTop.employeeIndex,
          queueTop.intervalIndex + 1
        )
      );
    }
  }
  return result;
}

let input = [
  [new Interval(1, 3), new Interval(5, 6)],
  [new Interval(2, 3), new Interval(6, 8)],
];
process.stdout.write('Free intervals: ', (end = ''));
let result = find_employee_free_time(input);
for (i = 0; i < result.length; i++) {
  result[i].print_interval();
}
console.log();

input = [
  [new Interval(1, 3), new Interval(9, 12)],
  [new Interval(2, 4)],
  [new Interval(6, 8)],
];
process.stdout.write('Free intervals: ', (end = ''));
result = find_employee_free_time(input);
for (i = 0; i < result.length; i++) {
  result[i].print_interval();
}
console.log();

input = [
  [new Interval(1, 3)],
  [new Interval(2, 4)],
  [new Interval(3, 5), new Interval(7, 9)],
];
process.stdout.write('Free intervals: ', (end = ''));
result = find_employee_free_time(input);
for (i = 0; i < result.length; i++) {
  result[i].print_interval();
}
console.log();
/*
Time complexity#
The above algorithm’s time complexity is O(N*logK), where ‘N’ is the total number of intervals, and ‘K’ is the total number of employees. This is because we are iterating through the intervals only once (which will take O(N)
O(N), and every time we process an interval, we remove (and can insert) one interval in the Min Heap, (which will take O(logK). At any time, the heap will not have more than ‘K’ elements.

Space complexity
The space complexity of the above algorithm will be O(K) as at any time, the heap will not have more than ‘K’ elements.*/
