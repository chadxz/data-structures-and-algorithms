# data structures and algorithms

Because interviews are hard. Learning from [treklheb/javascript-algorithms](https://github.com/trekhleb/javascript-algorithms).

### Notes

* **Hash Table** - has fixed bucket size. Hash input keys to assign them to one
    of the available buckets, then use a LinkedList for each bucket to handle
    collisions. When looking up the value, hash the key to determine the bucket,
    then do a standard find on the bucket's list to do collision resolution.

    The number of collisions in the key space is inversely proportional to the
    bucket size: Larger bucket size = less collisions. 

  
* **Graphs** 
    * Can be directed (digraph) or undirected
    * Can be weighted or unweighted
    * undirected graphs can be represented as a digraph
    * Special edge types
        * Self-loop
        * Multi-edge (i.e. flights between same cities on different airlines)
    * Graph with no special edges is a "simple graph"
        * Max edges in simple digraph: N * (N-1)
            * if |V| = 10, |E| <= 90
            * if |V| = 100, |E| < 9000
        * Max edges in simple graph: (N * (N-1)) / 2
            * if |V| = 10, |E| <= 45 
    * A _Walk_ is a sequence of vertices where each adjacent pair is connected
        by an edge.
    * A _Path_ (or _Simple Path_) is a walk through a set of connected vertices
        that does not pass through the same vertex twice.
    * A _Strongly Connected_ graph is a digraph where every vertex can connect
        to any other vertex. _Connected_ refers to an undirected graph of the same.
    * _Closed Walk_ starts an ends at the same vertex.
    * Avoid operations that are on the order of edges, as that is O(n^2)
        * i.e. _Edge List_ data structure
    * When building an Adjacency Matrix data structure, use hash table to
        map node name to index to turn connection test from O(n) to O(1)
    * Adjacency Matrix uses O(n^2) space complexity
