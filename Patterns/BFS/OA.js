class UF {
  constructor(n) {
    this.parent = new Array.from({ length: n }, (_, i) => i);
    this.count = new Array(n).fill(1);
}

find(x) {
 if (this.parent[x] != x) this.parent[x] = this.find(this.parent[x]);
 return this.parent[x];
}

union(x, y) {
 const xp = this.find(x), yp = this.find(y);
 if (xp == yp) return;

 if (this.count[xp] < this.count[yp]) {
   this.parent[xp] = yp;
   this.count[yp] += this.count[xp];
 } else {
   this.parent[yp] = xp;
   this.count[xp] += this.count[yp];
 }
}
}

const dsu = new UF();

function getTheGroups(n, queries, student1, student2) {
let size =0, result =[], qSize = queries.length;
dsu.find(n);
console.log('f',dsu.find(n) )
let current = 0;
for(let i =0; i < qSize; i++) {
 if(queries[i] === 'Friend') {
   dsu.union(student1[i], student2[i])
   console.log('u',dsu.union(student1[i], student2[i]))
 } else {
   let x = dsu.parent[student1[i]];
   let y =dsu.parent[student2[i]];
   if(x === y) result[current++] = dsu.count[x];
   else result[current++] = dsu.count[x] + dsu.cnt[y];;
 }
}
return result
}
console.log(getTheGroups(4, ['Friend','Friend','Total'], [1,2,1],[2,3,4]))