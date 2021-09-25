"use strict";
const assert = require('assert');
const Queue = require('./queue');

class GraphVertex {
    constructor(name) {
        this.name = name;
        this.connections = [];
    }

    connect(otherVertexName) {
        this.connections.push(otherVertexName);
        return this;
    }

    removeConnection(otherVertexName) {
        this.connections = this.connections.filter(c => c.name === otherVertexName);
        return this;
    }

    popConnection() {
        return this.connections.pop();
    }

    get isConnected() {
        return this.connections.length > 0;
    }
}

/**
 * Adjacency List Undirected Graph
 */
class UndirectedGraph {
    constructor() {
        this.vertices = {};
    }

    /**
     * Complexity: O(1)
     *
     * @param name
     * @returns {GraphVertex}
     */
    addVertex(name) {
        if (!this.vertices.hasOwnProperty(name)) {
            this.vertices[name] = new GraphVertex(name);
        }

        return this.vertices[name];
    }

    /**
     * Complexity: O(1)
     *
     * @param source
     * @param destination
     */
    addEdge(source, destination) {
        this.addVertex(source).connect(destination);
        this.addVertex(destination).connect(source);
    }

    /**
     * Complexity: O(v)
     * @param source
     * @param destination
     */
    removeEdge(source, destination) {
        this.vertices[source].removeConnection(destination);
        this.vertices[destination].removeConnection(source);
    }

    /**
     * Complexity: O(v + e)
     * @param name
     */
    removeVertex(name) {
        while (this.vertices[name].isConnected) {
            const connectedVertexName = this.vertices[name].popConnection();
            this.removeEdge(name, connectedVertexName);
        }
        delete this.vertices[name];
    }

    /**
     * Breadth First Search = First In First Out (Queue)
     * Complexity: O(v + e)
     *
     * @param start
     * @returns {Generator<*, null, *>}
     */
    *breadthFirstTraversal(start) {
        if (!this.vertices.hasOwnProperty(start)) {
            return null;
        }

        const queue = new Queue();
        let current = this.vertices[start];
        let seen = {};
        while (current) {
            if (!seen.hasOwnProperty(current.name)) {
                yield current;
                seen[current.name] = 1;
                for (let connection of current.connections) {
                    if (!seen.hasOwnProperty(connection)) {
                        queue.enqueue(this.vertices[connection]);
                    }
                }
            }

            current = queue.dequeue();
        }
    }

    /**
     * Depth First Traversal = Last In First Out (Stack)
     * Complexity: O(v + e)
     * @param vertexName
     * @param seen
     * @returns {any}
     */
    *depthFirstTraversal(vertexName, seen = {}) {
        if (!this.vertices.hasOwnProperty(vertexName)) {
            return null;
        }

        if (seen.hasOwnProperty(vertexName)) {
            return null;
        }

        yield this.vertices[vertexName];
        seen[vertexName] = 1;

        for (let connectedVertexName of this.vertices[vertexName].connections) {
            if (!seen.hasOwnProperty(connectedVertexName)) {
                yield * this.depthFirstTraversal(connectedVertexName, seen);
            }
        }
    }
}

module.exports = UndirectedGraph;

if (require.main === module) {

    function createGraph() {
        /**
         *    2         6
         *  /  \      /
         * 1    3 -- 5
         *  \  /      \
         *   4         7
         */
        const graph = new UndirectedGraph();
        graph.addEdge(1, 2);
        graph.addEdge(1, 4);
        graph.addEdge(2, 3);
        graph.addEdge(4, 3);
        graph.addEdge(3, 5);
        graph.addEdge(5, 6);
        graph.addEdge(5, 7);
        return graph;
    }

    (function buildUndirectedGraph() {
        const graph = createGraph();

        assert.deepStrictEqual(graph.vertices['1'].connections, [2, 4]);
        assert.deepStrictEqual(graph.vertices['2'].connections, [1, 3]);
        assert.deepStrictEqual(graph.vertices['3'].connections, [2, 4, 5]);
        assert.deepStrictEqual(graph.vertices['4'].connections, [1, 3]);
        assert.deepStrictEqual(graph.vertices['5'].connections, [3, 6, 7]);
        assert.deepStrictEqual(graph.vertices['6'].connections, [5]);
        assert.deepStrictEqual(graph.vertices['7'].connections, [5]);

    })();

    (function breadthFirstTraversal() {
        const graph = createGraph();

        const iterator = graph.breadthFirstTraversal(1);
        assert.strictEqual(iterator.next().value.name, 1);
        assert.strictEqual(iterator.next().value.name, 2);
        assert.strictEqual(iterator.next().value.name, 4);
        assert.strictEqual(iterator.next().value.name, 3);
        assert.strictEqual(iterator.next().value.name, 5);
        assert.strictEqual(iterator.next().value.name, 6);
        assert.strictEqual(iterator.next().value.name, 7);
        assert.strictEqual(iterator.next().done, true);


        const iteratorFrom6 = graph.breadthFirstTraversal(6);
        assert.strictEqual(iteratorFrom6.next().value.name, 6);
        assert.strictEqual(iteratorFrom6.next().value.name, 5);
        assert.strictEqual(iteratorFrom6.next().value.name, 3);
        assert.strictEqual(iteratorFrom6.next().value.name, 7);
        assert.strictEqual(iteratorFrom6.next().value.name, 2);
        assert.strictEqual(iteratorFrom6.next().value.name, 4);
        assert.strictEqual(iteratorFrom6.next().value.name, 1);
        assert.strictEqual(iteratorFrom6.next().done, true);
    })();
    (function depthFirstTraversal() {
        const graph = createGraph();

        const iterator = graph.depthFirstTraversal(1);
        assert.strictEqual(iterator.next().value.name, 1);
        assert.strictEqual(iterator.next().value.name, 2);
        assert.strictEqual(iterator.next().value.name, 3);
        assert.strictEqual(iterator.next().value.name, 4);
        assert.strictEqual(iterator.next().value.name, 5);
        assert.strictEqual(iterator.next().value.name, 6);
        assert.strictEqual(iterator.next().value.name, 7);
        assert.strictEqual(iterator.next().done, true);

        const iteratorFrom6 = graph.depthFirstTraversal(6);
        assert.strictEqual(iteratorFrom6.next().value.name, 6);
        assert.strictEqual(iteratorFrom6.next().value.name, 5);
        assert.strictEqual(iteratorFrom6.next().value.name, 3);
        assert.strictEqual(iteratorFrom6.next().value.name, 2);
        assert.strictEqual(iteratorFrom6.next().value.name, 1);
        assert.strictEqual(iteratorFrom6.next().value.name, 4);
        assert.strictEqual(iteratorFrom6.next().value.name, 7);
        assert.strictEqual(iteratorFrom6.next().done, true);
    })();
}
