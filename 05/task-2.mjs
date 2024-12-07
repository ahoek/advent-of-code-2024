// Read data
import fs from 'node:fs';
const input = 'input';
// const input = 'demo';
const data = fs.readFileSync(`./5/${input}.txt`, 'utf8');

const [orders, pagesString] = data.split('\n\n');

const pairs = orders
  .split('\n')
  .map((o) => o.split('|').map((p) => parseInt(p)));
const updates = pagesString
  .split('\n')
  .map((u) => u.split(',').map((u) => parseInt(u)));

const compare = (u1, u2) => {
  let order = 0;

  pairs.forEach(([p1, p2]) => {
    if (p1 === u1 && p2 === u2) {
      order = 1;
    }
    if (p2 === u1 && p1 === u2) {
      order = -1;
    }
  });
  return order;
};

const isCorrect = (update) => {
  let correct = true;
  for (let i = 0; i < update.length; i++) {
    for (let j = i + 1; j < update.length; j++) {
      if (compare(update[i], update[j]) === -1) {
        correct = false;
        break;
      }
    }
  }
  return correct;
};

const middleNumber = (update) => {
  const i = Math.floor(update.length / 2);
  return update[i];
};

let total = 0;
updates.forEach((update) => {
  if (!isCorrect(update)) {
    update.sort((a, b) => compare(a, b));
    total += middleNumber(update);
  }
});

console.log(total);
