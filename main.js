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

  levelOrder(callback) {
    if (!callback) {
      throw new Error("Need a callback function");
    }

    let queueOrder = [this.root];

    while (queueOrder.length !== 0) {
      let currentNode = queueOrder.shift();
      callback(currentNode);

      if (currentNode.left !== null) {
        queueOrder.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queueOrder.push(currentNode.right);
      }
    }
  }

  inOrder(callback) {
    if (!callback) {
      throw new Error("Need a callback function");
    }

    function recursiveInOrder(node, callback) {
      if (node === null) return;
      recursiveInOrder(node.left, callback);
      callback(node);
      recursiveInOrder(node.right, callback);
    }
    recursiveInOrder(this.root, callback);
  }

  preOrder(callback) {
    if (!callback) {
      throw new Error("Need a callback function");
    }

    function recursivePreOrder(node, callback) {
      if (node === null) return;
      callback(node);
      recursivePreOrder(node.left, callback);
      recursivePreOrder(node.right, callback);
    }
    recursivePreOrder(this.root, callback);
  }

  postOrder(callback) {
    if (!callback) {
      throw new Error("Need a callback function");
    }

    function recursivePostOrder(node, callback) {
      if (node === null) return;
      recursivePostOrder(node.left, callback);
      recursivePostOrder(node.right, callback);
      callback(node);
    }
    recursivePostOrder(this.root, callback);
  }

  height(node = this.root) {
    if (node === null) return -1;

    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node) {
    function recursiveDepth(root, value, currentDepth = 0) {
      if (root === null) return -1;
      if (root.data === value) {
        return currentDepth;
      }
      if (root.data > value) {
        return recursiveDepth(root.left, value, currentDepth + 1);
      } else if (root.data < value) {
        return recursiveDepth(root.right, value, currentDepth + 1);
      }
      return -1;
    }
    return recursiveDepth(this.root, node.data);
  }

  isBalanced(root = this.root) {
    if (root === null) return true;

    if (this.isBalanced(root.left) && this.isBalanced(root.right)) {
      let leftHeight = this.height(root.left);
      let rightHeight = this.height(root.right);
      return Math.abs(leftHeight - rightHeight) <= 1;
    }
    return false;
  }

  rebalance() {
    let newArray = [];
    this.levelOrder((node) => {
      newArray.push(node.data);
    });
    this.root = this.buildTree(newArray);
  }
}

let tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(tree.root);

tree.prettyPrint();

tree.insert(6);
tree.remove(4);
tree.prettyPrint();
