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

function deleteNode(val, root) {
    if (root === null) {
        return root;
    }
    if (val < root.data) {
        root.left = deleteNode(val, root.left);
        return root;
    }
    else if (val > root.data) {
        root.right = deleteNode(val, root.right);
        return root;
    }

    if (root.left === null) {
        let temp = root.right;
        delete root;
        return temp;
    }
    else if (root.right === null) {
        let temp = root.left;
        delete root;
        return temp;
    }
    else {
        let successorParent = root;
        let successor = root.right;
        while (successor.left !== null) {
            successorParent = successor;
            successor = successor.left;
        }
        if (successorParent !== root) {
            successorParent.left = successor.right;
        }
        else {
            successorParent.right = successor.right;
        }
        root.data = successor.data;
        delete successor;
        return root;
    }
}
/*
const tree1 = Tree([1,2,4,5,6,7]);
prettyPrint(tree1.root);

insert(3,tree1.root);

prettyPrint(tree1.root);

deleteNode(3, tree1.root);
prettyPrint(tree1.root);

deleteNode(1, tree1.root);
prettyPrint(tree1.root);

deleteNode(6, tree1.root);
prettyPrint(tree1.root);
*/
const tree2 = Tree([1, 3, 6, 9, 13, 17, 22, 27, 33, 39]);
prettyPrint(tree2.root);
deleteNode(13, tree2.root);
prettyPrint(tree2.root);