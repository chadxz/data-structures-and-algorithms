# data structures and algorithms

Because interviews are hard.

### Notes

* **Hash Table** - has fixed bucket size. Hash input keys to assign them to one
    of the available buckets, then use a LinkedList for each bucket to handle
    collisions. When looking up the value, hash the key to determine the bucket,
    then do a standard find on the bucket's list to do collision resolution.

    The number of collisions in the key space is inversely proportional to the
    bucket size: Larger bucket size = less collisions. 

  
