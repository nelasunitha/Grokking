/* You are asked to design a file system that allows you to create new paths and associate them with different values.

The format of a path is one or more concatenated strings of the form: / followed by one or more lowercase English letters. For example, "/leetcode" and "/leetcode/problems" are valid paths while an empty string "" and "/" are not.

Implement the FileSystem class:

bool createPath(string path, int value) Creates a new path and associates a value to it if possible and returns true. Returns false if the path already exists or its parent path doesn't exist.
int get(string path) Returns the value associated with path or returns -1 if the path doesn't exist.


Example 1:

Input:
["FileSystem","createPath","get"]
[[],["/a",1],["/a"]]
Output:
[null,true,1]
Explanation:
FileSystem fileSystem = new FileSystem();

fileSystem.createPath("/a", 1); // return true
fileSystem.get("/a"); // return 1
Example 2:

Input:
["FileSystem","createPath","createPath","get","createPath","get"]
[[],["/leet",1],["/leet/code",2],["/leet/code"],["/c/d",1],["/c"]]
Output:
[null,true,true,2,false,-1]
Explanation:
FileSystem fileSystem = new FileSystem();

fileSystem.createPath("/leet", 1); // return true
fileSystem.createPath("/leet/code", 2); // return true
fileSystem.get("/leet/code"); // return 2
fileSystem.createPath("/c/d", 1); // return false because the parent path "/c" doesn't exist.
fileSystem.get("/c"); // return -1 because this path doesn't exist.*/
class FileSystem {
  constructor() {
    this.fs = {};
  }
  createPath(path, value) {
    const paths = path.split('/');
    let file = this.isPathValid(this.fs, paths);
    // console.log('f', file)
    const last = paths[paths.length - 1];
    // console.log(last)
    if (file[last]) return false;

    file[last] = new treeNode(value);
    return true;
  }

  /**
   * @param {string} path
   * @return {number}
   */
  get(path) {
    let paths = path.split('/');
    const file = this.isPathValid(this.fs, paths);
    if (!file) return -1;
    const last = paths[path.length - 1];
    if (file[last]) return -1;
    return file[last].value;
  }
  isPathValid(file, paths) {
    for (let i = 1; i < paths.length - 1; i++) {
      let path = paths[i];
      if (!file[path]) return false;
      file = file[path].next;
    }
    return file;
  }
}
/*create returning true - possibility
false - no parent folder or current path doesn't exist
get return -1 if there is no value associates /return the assoc. value.
edge case file path is empty str/ '/'
["/leet",1]
paths =['', leet]

*/

class treeNode {
  constructor(value, next = null) {
    (this.value = value), (this.next = next);
  }
}
