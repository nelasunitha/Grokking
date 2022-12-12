function scheduleTasks(tasks, prerequisites) {
  const sortedOrder =[];
  const graph = Array(tasks).fill(0).map(() => Array());
  const inDegree = Array(tasks).fill(0)
  prerequisites.forEach((pre) => {
    let parent = pre[0];
    let child = pre[1];
    graph[parent].push(child);
    inDegree[child]++;
  })

  const sources =[];
  for(let i =0; i< inDegree.length; i++) {
    if(inDegree[i] === 0)
    sources.push(i)
  }
  while(sources.length) {
    const vertex = sources.shift();
    sortedOrder.push(vertex);
    graph[vertex].forEach((child) => {
      inDegree[child]--;
      if(inDegree[child] === 0)
      sources.push(child)
    })
  }
  console.log(sortedOrder)
  if(sortedOrder.length !== tasks) return [];
  return sortedOrder
}
// console.log('scheduleTasks', scheduleTasks(3, [[0, 1], [1, 2]]))
// console.log('scheduleTasks', scheduleTasks(3, [[0, 1], [1, 2], [2, 0]]))
console.log('scheduleTasks', scheduleTasks(6, [[2, 5], [0, 5], [0, 4], [1, 4], [3, 2], [1, 3]]))