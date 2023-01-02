/*Coin Change


Introduction

Given an infinite supply of ‘n’ coin denominations and a total money amount, we are asked to find the total number of distinct ways to make up that amount.

Example:

Denominations: {1,2,3}
Total amount: 5
Output: 5
Explanation: There are five ways to make the change for '5', here are those ways:
  1. {1,1,1,1,1}
  2. {1,1,1,2}
  3. {1,2,2}
  4. {1,1,3}
  5. {2,3}

Problem Statement

Given a number array to represent different coin denominations and a total amount ‘T’, we need to find all the different ways to make a change for ‘T’ with the given coin denominations. We can assume an infinite supply of coins, therefore, each coin can be chosen multiple times.

Basic Solution

This problem follows the Unbounded Knapsack pattern.

A basic brute-force solution could be to try all combinations of the given coins to select the ones that give a total sum of ‘T’. This is what our algorithm will look like:

for each coin 'c'
  create a new set which includes one quantity of coin 'c' if it does not exceed 'T', and
     recursively call to process all coins
  create a new set without coin 'c', and recursively call to process the remaining coins
return the count of sets who have a sum equal to 'T'

This problem is quite similar to Count of Subset Sum. The only difference here is that after including the item (i.e., coin), we recursively call to process all the items (including the current coin). In ‘Count of Subset Sum’, however, we were recursively calling to process only the remaining items.

Code

Here is the code for the brute-force solution:*/
let countChange = function (denominations, total) {
  function countChangeRecursive(denominations, total, currentIndex) {
    // base checks
    if (total === 0) return 1;

    if (denominations.length === 0 || currentIndex >= denominations.length) {
      return 0;
    }

    // recursive call after selecting the coin at the currentIndex
    // if the coin at currentIndex exceeds the total, we shouldn't process this
    let sum1 = 0;
    if (denominations[currentIndex] <= total) {
      sum1 = countChangeRecursive(
        denominations,
        total - denominations[currentIndex],
        currentIndex
      );
    }

    // recursive call after excluding the coin at the currentIndex
    const sum2 = countChangeRecursive(denominations, total, currentIndex + 1);

    return sum1 + sum2;
  }

  return countChangeRecursive(denominations, total, 0);
};

console.log(`Number of ways to make change: ---> ${countChange([1, 2, 3], 5)}`);
/*Time and Space Complexity

The time complexity of the above algorithm is exponential O(2^{C+T})O(2
​C+T
​​ ), where ‘C’ represents total coin denominations and ‘T’ is the total amount that we want to make change. The space complexity will be O(C+T)O(C+T).

Let’s try to find a better solution.

Top-down Dynamic Programming with Memoization

We can use memoization to overcome the overlapping sub-problems. We will be using a two-dimensional array to store the results of solved sub-problems. As mentioned above, we need to store results for every coin combination and for every possible sum:


*/
let countChange = function (denominations, total) {
  const dp = [];

  function countChangeRecursive(denominations, total, currentIndex) {
    // base checks
    if (total === 0) return 1;

    if (denominations.length === 0 || currentIndex >= denominations.length) {
      return 0;
    }

    dp[currentIndex] = dp[currentIndex] || [];
    // if we have already processed a similar sub-problem, return the result from memory
    if (typeof dp[currentIndex][total] !== 'undefined')
      return dp[currentIndex][total];

    // recursive call after selecting the coin at the currentIndex
    // if the number at currentIndex exceeds the total, we shouldn't process this
    let sum1 = 0;
    if (denominations[currentIndex] <= total) {
      sum1 = countChangeRecursive(
        denominations,
        total - denominations[currentIndex],
        currentIndex
      );
    }

    // recursive call after excluding the number at the currentIndex
    const sum2 = countChangeRecursive(denominations, total, currentIndex + 1);

    dp[currentIndex][total] = sum1 + sum2;
    return dp[currentIndex][total];
  }

  return countChangeRecursive(denominations, total, 0);
};

console.log(`Number of ways to make change: ---> ${countChange([1, 2, 3], 5)}`);
/*Bottom-up Dynamic Programming

We will try to find if we can make all possible sums, with every combination of coins, to populate the array dp[TotalDenominations][Total+1].

So for every possible total ‘t’ (0<= t <= Total) and for every possible coin index (0 <= index < denominations.length), we have two options:

Exclude the coin. Count all the coin combinations without the given coin up to the total ‘t’ => dp[index-1][t]
Include the coin if its value is not more than ‘t’. In this case, we will count all the coin combinations to get the remaining total: dp[index][t-denominations[index]]
Finally, to find the total combinations, we will add both the above two values:

  dp[index][t] = dp[index-1][t] + dp[index][t-denominations[index]]
Let’s draw this visually with the following example:

  Denominations: [1, 2, 3]
  Total: 5
Let’s start with our base case of zero total:


'0' total can always be found through an empty set

total: 1, index:0=> dp[index][total - denominations[index]], since index =0, we didn't consider dp[index-1][total]

total: 2-5, index:0=> dp[index][total - denominations[index]], since index =0, we didn't consider dp[index-1][total]

total: 1, index:1=> dp[index-1][total] , we didn't consider dp[index][total - denominations[index]], since 'total < denominations[index]'

total: 2, index:1=> dp[index-1][total] + dp[index][total - denominations[index]]

total: 3, index:1=> dp[index-1][total] + dp[index][total - denominations[index]]

total: 4, index:1=> dp[index-1][total] + dp[index][total - denominations[index]]

total: 5, index:1=> dp[index-1][total] + dp[index][total - denominations[index]]

total: 5, index:2=> dp[index-1][total] + dp[index][total - denominations[index]]
Code

Here is the code for our bottom-up dynamic programming approach:*/
let countChange = function (denominations, total) {
  const n = denominations.length;
  const dp = Array(denominations.length)
    .fill(0)
    .map(() => Array(total + 1).fill(0));

  // populate the total=0 columns, as we will always have an empty set for zero total
  for (let i = 0; i < n; i++) dp[i][0] = 1;
  // process all sub-arrays for all capacities

  for (let i = 0; i < n; i++) {
    for (let t = 1; t <= total; t++) {
      if (i > 0) dp[i][t] = dp[i - 1][t];
      if (t >= denominations[i]) dp[i][t] += dp[i][t - denominations[i]];
    }
  }

  // total combinations will be at the bottom-right corner.
  return dp[n - 1][total];
};

console.log(`Number of ways to make change: ---> ${countChange([1, 2, 3], 5)}`);
/*
Time and Space complexity

The above solution has time and space complexity of O(C*T) where ‘C’ represents total coin denominations and ‘T’ is the total amount that we want to make change.*/
