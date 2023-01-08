//Fibonacci numbers


/*Problem Statement
Write a function to calculate the nth Fibonacci number.

Fibonacci numbers are a series of numbers in which each number is the sum of the two preceding numbers. First few Fibonacci numbers are: 0, 1, 1, 2, 3, 5, 8, …

Mathematically we can define the Fibonacci numbers as:

    Fib(n) = Fib(n-1) + Fib(n-2), for n > 1

    Given that: Fib(0) = 0, and Fib(1) = 1

Basic Solution

A basic solution could be to have a recursive implementation of the mathematical formula discussed above:*/


const calculateFibonacci = function(n) {
  if (n < 2) return n;

  return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
};

console.log(`5th Fibonacci is ---> ${calculateFibonacci(5)}`);
console.log(`6th Fibonacci is ---> ${calculateFibonacci(6)}`);
console.log(`7th Fibonacci is ---> ${calculateFibonacci(7)}`);
/* The time complexity of the above algorithm is exponential O(2^n)O(2
​n
​​ ) as we are making two recursive calls in the same function. The space complexity is O(n)O(n) which is used to store the recursion stack.

Let’s visually draw the recursion for CalculateFibonacci(4) to see the overlapping subproblems:


Recursion tree for calculating Fibonacci numbers
We can clearly see the overlapping subproblem pattern: fib(2) has been called twice and fib(1) has been called thrice. We can optimize this using memoization to store the results for subproblems.

Top-down Dynamic Programming with Memoization

We can use an array to store the already solved subproblems. Here is the code:*/



const calculateFibonacci = function(n) {
  const memoize = [];

  function fib(n) {
    if (n < 2) return n;

    // if we have already solved this subproblem, simply return the result from the cache
    if (memoize[n]) return memoize[n];

    memoize[n] = fib(n - 1) + fib(n - 2);
    return memoize[n];
  }

  return fib(n);
};

console.log(`5th Fibonacci is ---> ${calculateFibonacci(5)}`);
console.log(`6th Fibonacci is ---> ${calculateFibonacci(6)}`);
console.log(`7th Fibonacci is ---> ${calculateFibonacci(7)}`);
