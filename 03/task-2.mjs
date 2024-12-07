import fs from 'node:fs';

const input = 'input';
// const input = 'demo2';
const data = fs.readFileSync(`./3/${input}.txt`, 'utf8');

let result = 0;
let enabled = true;

const matches = data.match(/mul\([0-9]+,[0-9]+\)|do\(\)|don't\(\)/g);

matches.forEach((m) => {
  if (m.startsWith('mul')) {
    if (enabled) {
      const [_, a, b] = m.match(/mul\((\d+),(\d+)\)/);
      result += parseInt(a) * parseInt(b);
    }
  } else if (m === 'do()') {
    enabled = true;
  } else if (m === "don't()") {
    enabled = false;
  }
});

console.log(result);
