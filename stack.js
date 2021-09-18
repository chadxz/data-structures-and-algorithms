"use strict";
const assert = require('assert');
const LinkedList = require("./linked-list");

class Stack {
    constructor() {
        this.list = new LinkedList();
    }

    /**
     * Complexity: O(1)
     *
     * @returns {Stack}
     */
    push(value) {
        this.list.prepend(value);
        return this;
    }

    /**
     * Complexity: O(1)
     *
     * @returns {*|null}
     */
    pop() {
        const listItem = this.list.deleteHead();
        return listItem ? listItem.value : null;
    }

    /**
     *
     * @returns {number}
     */
    get size() {
        return this.list.length;
    }
}

module.exports = Stack;

if (require.main === module) {
    (function testStack() {
        const stack = new Stack();
        stack.push(1).push(2).push(3);
        assert.strictEqual(stack.size, 3);
        const value = stack.pop();
        assert.strictEqual(value, 3);
        assert.strictEqual(stack.pop(), 2);
        assert.strictEqual(stack.pop(), 1);
        assert.strictEqual(stack.pop(), null);
        assert.strictEqual(stack.size, 0);
    })();
}
