// Read data
import fs from 'node:fs';
const data = fs.readFileSync('1/task-1-input.txt', 'utf8');
const lines = data.split('\n');

// Create lists
const list1 = [];
const list2 = [];
lines.forEach((line) => {
  const [n1, n2] = line.split(/\s+/).map((n) => parseInt(n, 10));
  list1.push(n1);
  list2.push(n2);
});
const occurrences = list2.reduce(function (acc, curr) {
  return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
}, {});

let result = 0;
list1.forEach((n1) => {
  result += n1 * (occurrences[n1] ?? 0);
});

console.log('result', result);
