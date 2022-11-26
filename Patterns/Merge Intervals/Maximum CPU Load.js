//Maximum CPU Load (hard)
/*
We are given a list of Jobs. Each job has a Start time, an End time, and a CPU load when it is running. Our goal is to find the maximum CPU load at any time if all the jobs are running on the same machine.

Example 1:

Jobs: [[1,4,3], [2,5,4], [7,9,6]]
Output: 7
Explanation: Since [1,4,3] and [2,5,4] overlap, their maximum CPU load (3+4=7) will be when both the
jobs are running at the same time i.e., during the time interval (2,4).
Example 2:

Jobs: [[6,7,10], [2,4,11], [8,12,15]]
Output: 15
Explanation: None of the jobs overlap, therefore we will take the maximum load of any job which is 15.
Example 3:

Jobs: [[1,4,2], [2,4,1], [3,6,5]]
Output: 8
Explanation: Maximum CPU load will be 8 as all jobs overlap during the time interval [3,4].
Try it yourself
Try solving this question here:*/
class Job {
  constructor(start, end, cpu_load) {
    this.start = start;
    this.end = end;
    this.cpu_load = cpu_load;
  }
}

const find_max_cpu_load = function (jobs) {
  // TODO: Write your code here
  let startTime = [],
    endTime = [],
    cpuLoad = [];
  let currentCpu = 0,
    maxCpu = 0,
    i = 0,
    j = 0;
  for (let k = 0; k < jobs.length; k++) {
    startTime.push(jobs[k].start);
    endTime.push(jobs[k].end);
    cpuLoad.push(jobs[k].cpu_load);
  }
  startTime.sort((a, b) => a - b);
  endTime.sort((a, b) => a - b);
  cpuLoad.sort((a, b) => a - b);

  while (i < jobs.length) {
    if (startTime[i] < endTime[j]) {
      currentCpu += cpuLoad[i];
      i++;
    } else {
      currentCpu -= cpuLoad[j];
      j++;
    }
    maxCpu = Math.max(currentCpu, maxCpu);
  }
  return maxCpu;
};

console.log(
  `Maximum CPU load at any time: ${find_max_cpu_load([
    new Job(1, 4, 3),
    new Job(2, 5, 4),
    new Job(7, 9, 6),
  ])}`
);
console.log(
  `Maximum CPU load at any time: ${find_max_cpu_load([
    new Job(6, 7, 10),
    new Job(2, 4, 11),
    new Job(8, 12, 15),
  ])}`
);
console.log(
  `Maximum CPU load at any time: ${find_max_cpu_load([
    new Job(1, 4, 2),
    new Job(2, 4, 1),
    new Job(5, 6, 5),
  ])}`
);

/*     Solution
The problem follows the Merge Intervals pattern and can easily be converted to Minimum Meeting Rooms. Similar to ‘Minimum Meeting Rooms’ where we were trying to find the maximum number of meetings happening at any time, for ‘Maximum CPU Load’ we need to find the maximum number of jobs running at any time. We will need to keep a running count of the maximum CPU load at any time to find the overall maximum load.

Code
Here is what our algorithm will look like:*/
const Heap = require('./collections/heap'); //http://www.collectionsjs.com

class Job {
  constructor(start, end, cpuLoad) {
    this.start = start;
    this.end = end;
    this.cpuLoad = cpuLoad;
  }
}

function find_max_cpu_load(jobs) {
  // sort the jobs by start time
  jobs.sort((a, b) => a.start - b.start);

  let maxCPULoad = 0,
    currentCPULoad = 0;
  const minHeap = new Heap([], null, (a, b) => b.end - a.end);

  for (j = 0; j < jobs.length; j++) {
    // remove all the jobs that have ended
    while (minHeap.length > 0 && jobs[j].start >= minHeap.peek().end) {
      currentCPULoad -= minHeap.pop().cpuLoad;
    }
    // add the current job into min_heap
    minHeap.push(jobs[j]);
    currentCPULoad += jobs[j].cpuLoad;
    maxCPULoad = Math.max(maxCPULoad, currentCPULoad);
  }
  return maxCPULoad;
}

console.log(
  `Maximum CPU load at any time: ` +
    `${find_max_cpu_load([
      new Job(1, 4, 3),
      new Job(2, 5, 4),
      new Job(7, 9, 6),
    ])}`
);
console.log(
  `Maximum CPU load at any time: ` +
    `${find_max_cpu_load([
      new Job(6, 7, 10),
      new Job(2, 4, 11),
      new Job(8, 12, 15),
    ])}`
);
console.log(
  `Maximum CPU load at any time: ` +
    `${find_max_cpu_load([
      new Job(1, 4, 2),
      new Job(2, 4, 1),
      new Job(5, 6, 5),
    ])}`
);
