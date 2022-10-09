import mergeSort from "@mika-alpha/merge-sort";
import Node from './Node.js';

class Tree{

    root;

    constructor(array) {
        this.root = buildTree(array);
    }

    get root() {
        return this._root;
    }

    set root(node) {
        this._root = node;
    }

    find(value, node = this.root) {

        if (node === null) {
            return null;
        } else if (node.data === value) {
            return node;
        } 

        if (node.data > value) {
            return this.find(value, node.left);
        } else if (node.data < value) {
            return this.find(value, node.right);
        }
        
    }

    insert(value) {
        if (this.root === null) {
            this.root = new Node(value);

        } else {
            this._insert(value, this.root);
        }
    }

    _insert(value, current) {

        if (current === null) {
            return new Node(value);
        } else if (value < current.data) {
            current.left = this._insert(value, current.left);
        } else {
            current.right = this._insert(value, current.right);
        }
        return current;
    }
}

function buildTree(array) {
    
    // create a set from the sorted param array, then spread it into an array
    const sortedArray = [...new Set(mergeSort(array))];

    return _buildTree(sortedArray, 0, sortedArray.length-1);
}

function _buildTree(array, start, end) {

    if (start > end) { return null };

    const mid = Math.floor((start + end) / 2);
    const root = new Node(array[mid]);

    root.left = _buildTree(array, start, mid - 1);
    root.right = _buildTree(array, mid + 1, end);

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

const testTree = new Tree([]);

prettyPrint(testTree.root);

