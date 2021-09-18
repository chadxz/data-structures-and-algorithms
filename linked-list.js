"use strict";
const assert = require('assert');

/**
 * Learnings:
 * - keep track of head AND tail at all times
 * - Beware primitive obsession. Use classes where possible!
 * - return early instead of branching when possible
 * - if keeping track of tail, don't forget to keep it in sync in all operations
 * - Specify API prior to writing it!
 */

class LinkedListNode {
    /**
     * @param value
     * @returns {LinkedListNode}
     */
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    /**
     * @returns {LinkedList}
     */
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    /**
     * Append a value to the end of the list
     * Complexity: O(1)
     *
     * @param value
     * @returns {LinkedList}
     */
    append(value) {
        const node = new LinkedListNode(value);
        this.length += 1;

        if (this.tail) {
            this.tail.next = node;
            this.tail = node;
            return this;
        }

        this.head = node;
        this.tail = node;
        return this;
    }

    /**
     * Complexity: O(1)
     *
     * @param value
     * @returns {LinkedList}
     */
    prepend(value) {
        const newNode = new LinkedListNode(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
            this.length = 1;
            return this;
        }

        newNode.next = this.head;
        this.head = newNode;
        this.length += 1;
        return this;
    }

    /**
     * Complexity: O(n)
     *
     * @param value
     * @returns {LinkedListNode|null}
     */
    findNodeByValue(value) {
        for (let node of this.traverse()) {
            if (node.value === value) {
                return node;
            }
        }

        return null;
    }

    /**
     * @returns {LinkedListNode|null}
     */
    deleteHead() {
        if (!this.head) {
            return null;
        }

        const deleted = this.head;
        this.head = this.head.next;

        if (deleted === this.tail) {
            this.tail = null;
        }

        this.length -= 1;
        return deleted;
    }

    /**
     * Delete the first node found that contains the given value
     * Complexity: O(n)
     *
     * @param value
     * @returns {LinkedListNode|null}
     */
    delete(value) {
        if (!this.head) {
            return null;
        }

        if (this.head.value === value) {
            const deleted = this.head;
            this.head = this.head.next;

            if (this.tail === deleted) {
                this.tail = null;
            }

            this.length -= 1;
            return deleted;
        }

        let previous = this.head;
        for (let node of this.traverse(this.head.next)) {
            if (node.value === value) {
                previous.next = node.next;

                if (this.tail === node) {
                    this.tail = previous;
                }

                this.length -= 1;
                return node;
            }
            previous = node;
        }

        return null;
    }


    /**
     * Complexity: O(n)
     *
     * @returns {Array}
     */
    toArray() {
        return [...this];
    }

    /**
     * Complexity: O(n)
     *
     * @param {Array} value
     * @returns {LinkedList}
     */
    static fromArray(value) {
        const list = new this();
        Array.from(value).forEach(v => list.append(v));
        return list;
    }

    /**
     * Complexity: O(n)
     *
     * @returns {Generator<*>}
     */
    *[Symbol.iterator]() {
        for (let node of this.traverse()) {
            yield node.value;
        }
    }

    /**
     * Complexity: O(n)
     *
     * @param {LinkedListNode} [from=this.head] Node to start from
     * @returns {Generator<LinkedListNode>}
     */
    *traverse(from = this.head) {
        for (let node = from; node !== null; node = node.next) {
            yield node;
        }
    }

    /**
     * Convert the LinkedList to a string representation of the values,
     * i.e. '1,2,3'
     * Complexity: O(n)
     *
     * @returns {string}
     */
    toString() {
        return [...this].toString();
    }
}

module.exports = LinkedList;

if (require.main === module) {
    // tests
    (function can_instantiate() {
        const list = new LinkedList();
        assert(list instanceof LinkedList);
    })();

    (function append() {
        const list = new LinkedList();
        assert(list.append(2) === list); // returns self
        assert(list.length === 1);
        assert(list.toString() === '2');
    })();

    (function fromArray() {
        const list = LinkedList.fromArray([1,2,3]);
        assert(list.length === 3);
        assert(list.toString() === '1,2,3');
    })();

    (function toArray() {
        const list = LinkedList.fromArray([1,2,3]);
        assert(list.length === 3);
        assert.notStrictEqual(list.toArray(), [1,2,3]);
    })();

    (function findNodeByValue() {
        const list = LinkedList.fromArray([1,2,3]);
        const result = list.findNodeByValue(2);
        assert(result !== null);
        assert.strictEqual(result.value, 2);
    })();

    (function deleteNodeNotExists() {
        const list = LinkedList.fromArray([1,2,3]);
        const result = list.delete(0);
        assert(result === null);
        assert(list.length === 3);
        assert.strictEqual(list.toString(), '1,2,3');
        assert.strictEqual(list.head?.value, 1);
        assert.strictEqual(list.tail?.value, 3);
    })();

    (function deleteNodeHead() {
        const list = LinkedList.fromArray([1,2,3]);
        const result = list.delete(1);
        assert(result.value === 1);
        assert(list.length === 2);
        assert.strictEqual(list.toString(), '2,3');
        assert.strictEqual(list.head?.value, 2);
        assert.strictEqual(list.tail?.value, 3);
    })();

    (function deleteNodeMiddle() {
        const list = LinkedList.fromArray([1,2,3]);
        const result = list.delete(2);
        assert.strictEqual(result.value, 2);
        assert.strictEqual(list.length, 2);
        assert.strictEqual(list.toString(), '1,3');
        assert.strictEqual(list.head?.value, 1);
        assert.strictEqual(list.tail?.value, 3);
    })();

    (function deleteNodeTail() {
        const list = LinkedList.fromArray([1,2,3]);
        const result = list.delete(3);
        assert.strictEqual(result.value, 3);
        assert.strictEqual(list.length, 2);
        assert.strictEqual(list.toString(), '1,2');
        assert.strictEqual(list.head?.value, 1);
        assert.strictEqual(list.tail?.value, 2);
    })();

    (function deleteSingleNode() {
        const list = LinkedList.fromArray([1]);
        const result = list.delete(1);

        assert.strictEqual(result.value, 1);
        assert.strictEqual(list.length, 0);
        assert.strictEqual(list.toString(), '');
        assert.strictEqual(list.head, null);
        assert.strictEqual(list.tail, null);
    })();

    (function deleteHead() {
        const list = LinkedList.fromArray([1,2,3]);
        const result = list.deleteHead();

        assert.strictEqual(result.value, 1);
        assert.strictEqual(list.length, 2);
        assert.strictEqual(list.toString(), '2,3');
        assert.strictEqual(list.head?.value, 2);
        assert.strictEqual(list.tail?.value, 3);
    })();

    (function deleteHeadOnlyItem() {
        const list = LinkedList.fromArray([1]);
        const result = list.deleteHead();

        assert.strictEqual(result.value, 1);
        assert.strictEqual(list.length, 0);
        assert.strictEqual(list.toString(), '');
        assert.strictEqual(list.head, null);
        assert.strictEqual(list.tail, null);
    })();

    (function prependEmptyList() {
        const list = new LinkedList();
        list.prepend(1);

        assert.strictEqual(list.length, 1);
        assert.strictEqual(list.toString(), '1');
        assert.strictEqual(list.head?.value, 1);
        assert.strictEqual(list.tail?.value, 1);
    })();

    (function prependExistingList() {
        const list = LinkedList.fromArray([1,2,3]);
        list.prepend(4);

        assert.strictEqual(list.length, 4);
        assert.strictEqual(list.toString(), '4,1,2,3');
        assert.strictEqual(list.head?.value, 4);
        assert.strictEqual(list.tail?.value, 3);
    })();
}
