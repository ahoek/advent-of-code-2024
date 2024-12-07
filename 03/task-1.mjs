// Read data
import fs from 'node:fs';
const input = 'input';
// const input = 'demo';
const data = fs.readFileSync(`./3/${input}.txt`, 'utf8');

let result = 0;
// console.log(data);
const matches = data.match(/mul\([0-9]+,[0-9]+\)/g);
console.log(matches);
matches.forEach((m) => {
  const cs = m.replace('mul(', '').replace(')', '');
  const [a, b] = cs.split(',');
  result += parseInt(a, 10) * parseInt(b, 10);
});
console.log(result);
