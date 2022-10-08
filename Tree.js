import mergeSort from "@mika-alpha/merge-sort";
import Node from './Node.js';

class Tree{

    root;

    constructor(array) {
        // create a set from the sorted param array, then spread it into an array
        const sortedArray = [...new Set(mergeSort(array))];
        this.root = buildTree(sortedArray, 0, sortedArray.length-1);
    }

    get root() {
        return this._root;
    }

    set root(node) {
        this._root = node;
    }

}

function buildTree(array, start, end) {

    if (start > end) { return null };

    const mid = Math.floor((start + end) / 2);
    const root = new Node(array[mid]);

    root.left = buildTree(array, start, mid - 1);
    root.right = buildTree(array, mid + 1, end);

    return root;

}

// function from The Odin Project
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

const testTree = new Tree([2,3,4,1,2,3,5,6,7]);

prettyPrint(testTree.root);