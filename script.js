const Node = (data = null) => {
  return { data, left: null, right: null };
};

const Tree = (arr) => {
  return { root: buildTree(arr, 0, arr.length - 1) };
};

function buildTree(arr, start, end) {
  if (start > end) return null;
  let mid = parseInt((start + end) / 2);
  let root = Node(arr[mid]);
  root.left = buildTree(arr, start, mid - 1);
  root.right = buildTree(arr, mid + 1, end);
  return root;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function insert(val, root) {
  if (root === null) {
    return Node(val);
  }
  if (val < root.data) {
    root.left = insert(val, root.left);
  } else if (val > root.data) {
    root.right = insert(val, root.right);
  }
  return root;
}

function deleteNode(val, root) {
  if (root === null) {
    return root;
  }
  if (val < root.data) {
    root.left = deleteNode(val, root.left);
    return root;
  } else if (val > root.data) {
    root.right = deleteNode(val, root.right);
    return root;
  }

  if (root.left === null) {
    let temp = root.right;
    delete root;
    return temp;
  } else if (root.right === null) {
    let temp = root.left;
    delete root;
    return temp;
  } else {
    let successorParent = root;
    let successor = root.right;
    while (successor.left !== null) {
      successorParent = successor;
      successor = successor.left;
    }
    if (successorParent !== root) {
      successorParent.left = successor.right;
    } else {
      successorParent.right = successor.right;
    }
    root.data = successor.data;
    delete successor;
    return root;
  }
}

function find(target, root) {
  if (root === null || root.data === target) {
    return root;
  }
  if (target > root.data) {
    return find(target, root.right);
  } else {
    return find(target, root.left);
  }
}

function levelOrder(root, callback) {
  /*
    We need a queue for saving the discovered nodes. First, we 
    enqueue the root node (arr.push(root)).

    If the queue is not empty, we can dequeue the node from the 
    queue (arr.shift()), and print it/store it in a results array.

    Then we can enqueue the children of the root node. Next we 
    dequeue/print the first child and enqueue its children, simply
    repeating the process. Becauseof FIFO (first come first served)
    this will play out in level-order. The base-case will be when
    the nodes have no children.
    */
  let queue = [];
  let results = [];
  if (root === null) return;
  queue.push(root);
  while (queue[0]) {
    let currentNode = queue[0];
    callback(currentNode);
    results.push(queue.shift().data);
    if (currentNode.left) {
      queue.push(currentNode.left);
    }
    if (currentNode.right) {
      queue.push(currentNode.right);
    }
  }
  return results;
}

function preorder(root, results = [], callback) {
  /*
First visit root, then left subtree, then right subtree.
Print the root data. Then make a recursive call to  the left child.
Then make a recursive call to the right subtree. Base case is if
root is null.
*/
  if (root === null) return;
  if (callback) {
    callback(root);
  }
  results.push(root.data);
  preorder(root.left, results, callback);
  preorder(root.right, results, callback);
  return results;
}

function inorder(root, results = [], callback) {
  /*
    First visit left subtree, then root, then right subtree
    */
  if (root === null) return;
  inorder(root.left, results, callback);
  if (callback) {
    callback(root);
  }
  results.push(root.data);
  inorder(root.right, results, callback);
  return results;
}

function postorder(root, results = [], callback) {
  /*
    First visit left subtree, then right subtree, then root
    */
  if (root === null) return;
  postorder(root.left, results, callback);
  postorder(root.right, results, callback);
  if (callback) {
    callback(root);
  }
  results.push(root.data);
  return results;
}

function height(node) {
  if (node === null || !node || find(node) === false) return -1;
  return Math.max(height(node.left), height(node.right)) + 1;
}

function depth(root, node) {
  let level = -1;
  if (root === null) return -1;
  if (
    root === node ||
    (level = depth(root.left, node)) >= 0 ||
    (level = depth(root.right, node)) >= 0
  ) {
    return level + 1;
  }
  return level;
}

const tree1 = Tree([1, 2, 4, 5, 6, 7]);
const tree2 = Tree([1, 3, 6, 9, 13, 17, 22, 27, 33, 39]);
prettyPrint(tree1.root);
//insert(3, tree1.root);
//prettyPrint(tree1.root);
//deleteNode(6, tree1.root);
//prettyPrint(tree1.root);
console.log(preorder(tree1.root));
