class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.array = array;
    this.root = this.buildTree(this.array);
  }

  #sortArray(array) {
    array.sort(function (a, b) {
      return a - b;
    });
    let sortedArray = array.filter(function (value, index, self) {
      return self.indexOf(value) === index;
    });
    return sortedArray;
  }

  buildTree(array) {
    let sortedArray = this.#sortArray(array);
    function recursiveTree(array, start, end) {
      if (start > end) return null;
      let mid = Math.floor((start + end) / 2);
      let root = new Node(array[mid]);

      root.left = recursiveTree(array, start, mid - 1);
      root.right = recursiveTree(array, mid + 1, end);

      return root;
    }
    return recursiveTree(sortedArray, 0, sortedArray.length - 1);
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  insert(value) {
    function recursiveInsert(root, data) {
      if (root === null) {
        return new Node(data);
      }

      if (root.data === data) {
        return root;
      }

      if (data < root.data) {
        root.left = recursiveInsert(root.left, data);
      } else if (data > root.data) {
        root.right = recursiveInsert(root.right, data);
      }
      return root;
    }

    return recursiveInsert(this.root, value);
  }

  remove(value) {
    function recursiveRemove(root, data) {
      if (root === null) {
        return root;
      }

      if (data < root.data) {
        root.left = recursiveRemove(root.left, data);
      } else if (data > root.data) {
        root.right = recursiveRemove(root.right, data);
      } else if (data === root.data) {
        if (root.left === null) {
          return root.right;
        } else if (root.right === null) {
          return root.left;
        } else if (root.left && root.right) {
          let successor = root.right;
          while (successor && successor.left) {
            successor = successor.left;
          }
          root.data = successor.data;
          root.right = recursiveRemove(root.right, successor.data);
        }
      }
      return root;
    }
    return recursiveRemove(this.root, value);
  }

  find(value) {
    function recursiveFind(root, data) {
      if (root === null) return root;
      if (root.data === data) {
        return root;
      } else if (data < root.data) {
        return recursiveFind(root.left, data);
      } else if (data > root.data) {
        return recursiveFind(root.right, data);
      }
    }
    return recursiveFind(this.root, value);
  }
}

let tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(tree.root);

tree.prettyPrint();

tree.insert(6);
tree.remove(4);
tree.prettyPrint();
