# Fevo Dev Test

This is the dev test for Fevo. The goal is to sort a list of accounts, grouping by email.

## Solution

My solution (on the second iteration) was to go with a recursive function. This prevents falling into a trap where after you merge emails on the first layer, other matches could potentially surface without the program consolidating those.

## Thoughts

Though this solution works, it's using recursion and nested `for` loops which leads to a poor time complexity. I would like to use indexes in the future to trade off time for space.

## Running

To run the script, make sure you have [Node.js](https://nodejs.org/en/) installed in your machine. After that, just run:

```
node main.js
```

## Output (From Sample Set)

```
[ { name: 'A',
    emails: [ 'a@gmail.com', 'b@gmail.com', 'a@yahoo.com' ],
    applications: [ 1, 3, 2 ] },
  { name: 'C',
    emails: [ 'c@gmail.com', 'd@gmail.com' ],
    applications: [ 1 ] } ]
```
