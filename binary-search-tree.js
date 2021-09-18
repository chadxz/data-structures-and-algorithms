"use strict";
const util = require('util');
const Queue = require('./queue');

class BinarySearchNode {
    constructor(value) {
        this.value = value;
        /** @var {BinarySearchNode} */
        this.left = null;
         /** @var {BinarySearchNode} */
        this.right = null;
    }

    /**
     * Complexity: O(log(n))
     *
     * @param {BinarySearchNode} node
     * @returns {BinarySearchNode} the parent the node was added to
     */
    insert(node) {
        return node.value >= this.value ?
            this.setRight(node) : this.setLeft(node);
    }

    /**
     * Complexity: O(log(n))
     *
     * @param node
     * @returns {BinarySearchNode} the parent the node was added to
     */
    setLeft(node) {
        if (!this.left) {
            this.left = node;
            return this;
        }

        return this.left.insert(node);
    }

    /**
     * Complexity: O(log(n))
     *
     * @param node
     * @returns {BinarySearchNode} the parent the node was added to
     */
    setRight(node) {
        if (!this.right) {
            this.right = node;
            return this;
        }

        return this.right.insert(node);
    }
}

class BinarySearchTree {
    /**
     * @returns {BinarySearchTree}
     */
    constructor() {
        /** @var {BinarySearchNode} */
        this.root = null;
    }

    /**
     * Complexity: O(log(n))
     *
     * @param value
     * @returns {BinarySearchTree}
     */
    insert(value) {
        const node = new BinarySearchNode(value);
        if (!this.root) {
            this.root = node;
            return this;
        }

        this.root.insert(node);
        return this;
    }

    /**
     * @returns {Generator<*>}
     */
    *inOrderTraversal(root = this.root) {
        if (!root) {
            return null;
        }

        yield * this.inOrderTraversal(root.left);
        yield root.value;
        yield * this.inOrderTraversal(root.right);
    }

    /**
     * @returns {Generator<*>}
     */
    *preOrderTraversal(root = this.root) {
        if (!root) {
            return null;
        }

        yield root.value;
        yield * this.preOrderTraversal(root.left);
        yield * this.preOrderTraversal(root.right);
    }

    /**
     * @returns {Generator<*>}
     */
    *postOrderTraversal(root = this.root) {
        if (!root) {
            return null;
        }

        yield root.value;
        yield * this.postOrderTraversal(root.left);
        yield * this.postOrderTraversal(root.right);
    }

    /**
     * @returns {Generator<*>}
     */
    *breadthFirstTraversal() {
        if (!this.root) {
            return null;
        }

        const queue = new Queue();
        let current = this.root;
        while (current) {
            yield current.value;
            if (current.left) {
                queue.enqueue(current.left);
            }
            if (current.right) {
                queue.enqueue(current.right);
            }
            current = queue.dequeue();
        }
    }

    static fromArray(value) {
        const bst = new this;
        Array.from(value).forEach(v => bst.insert(v));
        return bst;
    }
}

if (require.main === module) {
    (function testBinarySearchTree() {
        const bst = new BinarySearchTree();
        bst.insert(2);
        bst.insert(4);
        bst.insert(-1);
        bst.insert(10);
        console.log(util.inspect(bst, { depth: null }));
    })();
    (function binaryInOrderTraversal() {
        const bst = BinarySearchTree.fromArray([10,12,8,15,4,11]);
        console.log('inOrder', util.inspect([...bst.inOrderTraversal()], { depth: null }));
    })();
    (function binaryPreOrderTraversal() {
        const bst = BinarySearchTree.fromArray([10,12,8,15,4,11]);
        console.log('preOrder', util.inspect([...bst.preOrderTraversal()], { depth: null }));
    })();
    (function binaryPostOrderTraversal() {
        const bst = BinarySearchTree.fromArray([10,12,8,15,4,11]);
        console.log('postOrder', util.inspect([...bst.postOrderTraversal()], { depth: null }));
    })();
    (function binaryBreadthFirstTraversal() {
        const bst = BinarySearchTree.fromArray([10,12,8,15,4,11]);
        console.log('breadthFirst', util.inspect([...bst.breadthFirstTraversal()], { depth: null }));
    })();
}
