"use strict";
const assert = require('assert');
const LinkedList = require('./linked-list');

/**
 * learnings:
 * - a queue is a list that limits where you can add/remove items from
 * - simple implementation with linked list: add to tail and remove from head
 * - don't introduce a class when unnecessary
 */

class Queue {

    /**
     * @returns {Queue}
     */
    constructor() {
        this.list = new LinkedList();
    }

    /**
     * Complexity: O(1)
     * @param value
     * @returns {Queue}
     */
    enqueue(value) {
        this.list.append(value);
        return this;
    }

    /**
     * Complexity: O(1)
     * @returns {*|null}
     */
    dequeue() {
        const listItem = this.list.deleteHead();
        return listItem ? listItem.value : null;
    }

    /**
     * Grab the top of the queue without dequeueing it
     * Complexity: O(1)
     * @returns {*|null}
     */
    peek() {
        return this.list.head ? this.list.head.value: null;
    }

    get size() {
        return this.list.length;
    }
}

if (require.main === module) {
    (function testQueue() {
        const queue = new Queue();
        queue.enqueue(1);
        queue.enqueue(2);

        assert.strictEqual(queue.size, 2);

        const value = queue.dequeue();

        assert.strictEqual(value, 1);

        queue.enqueue(3);
        queue.enqueue(4);

        assert.strictEqual(queue.dequeue(), 2);
        assert.strictEqual(queue.dequeue(), 3);
        assert.strictEqual(queue.dequeue(), 4);
        assert.strictEqual(queue.dequeue(), null);
    })();

    (function testQueuePeek() {
        const queue = new Queue();

        queue.enqueue(10);
        const value = queue.peek();
        assert.strictEqual(value, 10);
        assert.strictEqual(queue.size, 1);
        assert.strictEqual(queue.dequeue(), 10);
        assert.strictEqual(queue.size, 0);
    })();
}
