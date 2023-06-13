const Node = (data = null) => {
    return {data, left: null, right: null}
}

const Tree = (arr) => {
    return {root: buildTree(arr, 0, arr.length - 1)};
}

function buildTree(arr, start, end) {
    if (start > end) return null;
    let mid = parseInt((start + end) / 2);
    let root = Node(arr[mid]);
    root.left = buildTree(arr, start, mid-1);
    root.right = buildTree(arr, mid+1, end)
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
    }
    else if (val > root.data) {
        root.right = insert(val, root.right);
    }
    return root;
}

const tree1 = Tree([1,2,4,5,6,7]);
prettyPrint(tree1.root);

insert(3,tree1.root);

prettyPrint(tree1.root);