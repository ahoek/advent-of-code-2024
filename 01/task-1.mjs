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

list1.sort();
list2.sort();

const pairs = list1.map((value, i) => [value, list2[i]]);
const distances = pairs.map(([d1, d2]) => Math.abs(d1 - d2));
const distance = distances.reduce((prev, curr) => prev + curr, 0);

console.log(distance);
