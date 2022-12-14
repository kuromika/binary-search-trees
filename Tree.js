import mergeSort from "@mika-alpha/merge-sort";
import Node from './Node.js';

class Tree {

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

        } else if (!this.find(value)) {
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

    delete(value) {
        this.root = this.delete(value, this.root);
    }


    delete(value, root) {

        if (root === null) { //if tree is empty or value not found
            return root;
        } else if (value < root.data) {
            root.left = this.delete(value, root.left); //search lesser
        } else if (value > root.data) {
            root.right = this.delete(value, root.right); //search greater
        } else {
            if (root.left === null && root.right === null) { // no child
                root = null;
            } else if (root.left === null) { //one child
                root = root.right;
            } else if (root.right === null) { // one child
                root = root.left;
            } else { //two child
                const temp = this.findMin(root.right);
                root.data = temp.data;
                root.right = this.delete(temp.data, root.right);
                
            }
        }
        return root;
    }

    findMin(current) {
        if (current.left === null) {
            return current;
        } else {
            return this.findMin(current.left);
        }
    }

    levelOrder(cb) {

        if (this.root === null) {
            return;
        }

        if (!cb) {
            return this._levelOrder([this.root], []);
        } else {
            this._levelOrder([this.root], cb);
        }
    }

 
    _levelOrder(queue, cb) {

        if (queue.length > 0) {

            const root = queue.shift();

            if (Array.isArray(cb)) {
                cb.push(root.data);
            } else {
                cb(root);
            }

            if (root.left !== null) {
                queue.push(root.left);
            }

            if (root.right !== null) {
                queue.push(root.right);
            }

            this._levelOrder(queue, cb);
        }
        return cb;
    }

 
    preorder(cb) {

        if (!cb) {
            return this._preorder(this.root, []);
        }
        this._preorder(this.root, cb);
    }

    _preorder(root, cb) {
        if (root === null) {
            return;
        }
        if (Array.isArray(cb)) {
            cb.push(root.data);
        } else {
            cb(root);
        }
        this._preorder(root.left, cb);
        this._preorder(root.right, cb);
        return cb;
        
    }

    inorder(cb) {

        if (!cb) {
            return this._inorder(this.root, []);
        }
        return this._inorder(this.root, cb);

    }

    _inorder(root, cb) {
        if (root === null) {
            return;
        }

        this._inorder(root.left, cb);
        if (Array.isArray(cb)) {
            cb.push(root.data);
        } else {
            cb(root);
        }
        this._inorder(root.right, cb);

        return cb;

    }

    postorder(cb) {
        if (!cb) {
            return this._postorder(this.root, []);
        } 
        return this._postorder(this.root, cb)
    }


    _postorder(root, cb) {
        if (root === null) {
            return;
        }

        this._postorder(root.left, cb);
        this._postorder(root.right, cb);
        if (Array.isArray(cb)) {
            cb.push(root.data); 
        } else {
            cb(root);
        }
        return cb;

    }

    height(root = this.root) {

        if (root === null) {
            return -1;
        }
        const leftHeight = this.height(root.left);
        const rightHeight = this.height(root.right);

        return Math.max(leftHeight, rightHeight) + 1;
        
    }

    depth(data, root = this.root) {
        if (root === null || root.data === data) {
            return 0;
        }
        if (data < root.data) {
            return 1 + this.depth(data, root.left);
        } else if (data > root.data) {
            return 1 + this.depth(data, root.right);
        }
    }

    isBalanced(root = this.root) {

        if (root === null){
            return;
        }

        const leftHeight = this.height(root.left);
        const rightHeight = this.height(root.right);

        return (Math.abs(leftHeight - rightHeight) <= 1);
    }

    static rebalance(tree) {
        return buildTree(tree.inorder());
    }
}

function buildTree(array) {

    // create a set from the sorted param array, then spread it into an array
    const sortedArray = [...new Set(mergeSort(array))];

    return _buildTree(sortedArray, 0, sortedArray.length - 1);
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
        prettyPrint(node.right, `${prefix}${isLeft ? '???   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '????????? ' : '????????? '}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '???   '}`, true);
    }
}


function test() {

    const testTree = new Tree([5, 4, 10, 20, 25, 15, 3, 2, 6]);

    console.log('is balanced: ' + testTree.isBalanced());
    console.log('pre: ' + testTree.preorder());
    console.log('in: ' + testTree.inorder());
    console.log('post: ' + testTree.postorder());

    for (let i = 0; i < 10; i++){
    testTree.insert(100 + i * 10);
    }

    console.log('is balanced: ' + testTree.isBalanced());

    testTree.root = Tree.rebalance(testTree);

    console.log(testTree.isBalanced());
    console.log('pre: ' + testTree.preorder());
    console.log('in: ' + testTree.inorder());
    console.log('post: ' + testTree.postorder());

}

