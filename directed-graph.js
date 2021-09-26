"use strict";
const assert = require('assert');

class DirectedGraphVertex {
    constructor(name) {
        this.name = name;
        this.connections = [];
    }

    connect(vertexName) {
        this.connections.push(vertexName);
    }
}

class DirectedGraph {
    constructor() {
        this.vertices = {};
    }

    addVertex(vertexName) {
        if (!this.vertices.hasOwnProperty(vertexName)) {
            this.vertices[vertexName] = new DirectedGraphVertex(vertexName);
        }
    }

    addEdge(source, destination) {
        this.addVertex(source);
        this.addVertex(destination);

        this.vertices[source].connect(destination);
    }

    hasCycle() {
        // perform a dfs for a node that has already been seen
        const toCheck = new Set(Object.values(this.vertices));
        const checking = new Set();
        const checked = new Set();

        while (toCheck.size > 0) {
            if (this._checkForCycle(toCheck.values().next().value, toCheck, checking, checked)) {
                return true;
            }
        }

        return false;
    }

    _checkForCycle(vertex, toCheck, checking, checked) {
        this._move(vertex, toCheck, checking);

        for (let connectedVertexName of vertex.connections) {
            const current = this.vertices[connectedVertexName];
            if (checked.has(current)) {
                continue; // skip it, already been checked
            }
            if (checking.has(current)) {
                return true; // detected a cycle
            }
            if (this._checkForCycle(current, toCheck, checking, checked)) {
                return true; // unwinding
            }
        }

        this._move(vertex, checking, checked);
        return false;
    }

    /**
     * @param {DirectedGraphVertex} vertex
     * @param {Set} sourceSet
     * @param {Set} destSet
     * @private
     */
    _move(vertex, sourceSet, destSet) {
        sourceSet.delete(vertex);
        destSet.add(vertex);
    }
}

module.exports = DirectedGraph;

if (require.main === module) {
    (function createDirectedGraph() {
        const graph = new DirectedGraph();
        graph.addEdge(1, 2);
        graph.addEdge(1, 3);

        assert.deepStrictEqual(graph.vertices['1'].connections, [2, 3]);
        assert.deepStrictEqual(graph.vertices['2'].connections, []);
        assert.deepStrictEqual(graph.vertices['3'].connections, []);
    })();

    (function checkForCycle() {
        const graph = new DirectedGraph();
        graph.addEdge(1, 2);
        graph.addEdge(4, 1);
        graph.addEdge(4, 5);
        graph.addEdge(5, 6);
        graph.addEdge(6, 4);
        assert.deepStrictEqual(graph.hasCycle(), true);
    })();
}
