189. **Rotate Array**
- rotating more than the length of the list is wasteful. For example, when rotating a 4 value list by 6, it's the same as rotating it by 2. Given this, we can use modulus of the rotation value. 6 % 4 = 2.
- An O(n) solution is to rotate the entire list, then fix the rotation based on the actual rotation amount. For example for k = 3:
    - [1,2,3,4,5,6,7] - original list
    - [7,6,5,4,3,2,1] - entire list rotated
    - [5,6,7,4,3,2,1] - k elements at the front rotated
    - [5,6,7,1,2,3,4] - the remainder rotated gives result

