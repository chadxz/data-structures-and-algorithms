"use strict";
const assert = require('assert');
const LinkedList = require('./linked-list');

class QueueItem {
    constructor(linkedListItem) {
        this.value = linkedListItem.value;
    }
}

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
     * @returns {QueueItem|null}
     */
    dequeue() {
        const listItem = this.list.deleteHead();
        if (listItem) {
            return new QueueItem(listItem);
        }

        return null;
    }

    /**
     * Grab the top of the queue without dequeueing it
     * Complexity: O(1)
     * @returns {QueueItem|null}
     */
    peek() {
        const listItem = this.list.head;
        if (listItem) {
            return new QueueItem(listItem);
        }

        return null;
    }

    get length() {
        return this.list.length;
    }
}

if (require.main === module) {
    (function testQueue() {
        const queue = new Queue();
        queue.enqueue(1);
        queue.enqueue(2);

        assert.strictEqual(queue.length, 2);

        const item = queue.dequeue();

        assert(item instanceof QueueItem);
        assert.strictEqual(item.value, 1);

        queue.enqueue(3);
        queue.enqueue(4);

        assert.strictEqual(queue.dequeue()?.value, 2);
        assert.strictEqual(queue.dequeue()?.value, 3);
        assert.strictEqual(queue.dequeue()?.value, 4);
        assert.strictEqual(queue.dequeue()?.value, undefined);

        queue.enqueue(10);
        const peekItem = queue.peek();
        assert(peekItem instanceof QueueItem);
        assert.strictEqual(peekItem.value, 10);
        assert.strictEqual(queue.length, 1);
        assert.strictEqual(queue.dequeue()?.value, 10);
        assert.strictEqual(queue.length, 0);
    })();

}
