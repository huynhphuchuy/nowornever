# List of problems that I have solved
- Problem 1
- Problem 2
- Problem 4

# Problem 1 Complexity

### rotate() function:
- Code line {3} use Array.prototype.reverse, that will take O(n) complexity
- Code line {2} has a loop with O(n-1) complexity
- Code line {1} also has a loop with O(n-1) complexity
- Code line {4} is a recursion considered as an interation with O(m) complexity (m = k % 4)
- Combining above funtions's complexity, we have a the complexity: O(m*n^3)

### Go through the possible values of `m`
- If (k % 4) === 0 the complexity is O(1);
- If (k % 4) === 1 the complexity is O(n^3)
- If (k % 4) >= 2 the complexity is O(m*n^3) 
but the m is an interger and always within [0, 3] so the final complexity should be O(n^3)

# Problem 4 Complexity
- Code line {1], {4} with Array.prototype.shift take O(1) complexity
- Code line {2} has a loop with O(n-1) complexity
- Code line {3} has a loop in the worst case gonna have `n` iteration and will take O(n-1) complexity
- The final complexity would be O(max(1, n^2*1)) = O(n^2)

# How to run all the test suites with jest

- Run `npm run test`

# How to run the Problem 2 's CLI application:

- Run `npm run prob2cli`

![cli screenshot](https://raw.githubusercontent.com/huynhphuchuy/nowornever/master/cli.png)
