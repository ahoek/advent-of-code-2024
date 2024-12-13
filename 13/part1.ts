import fs from 'node:fs';
// const input = 'demo';
const input = 'input';
const data = fs.readFileSync(`${import.meta.dirname}/${input}.txt`, 'utf8');

interface Vector {
  x: number;
  y: number;
}

interface Machine {
  A: Vector;
  B: Vector;
  prize: Vector;
}
// console.log(data);
const machines: Machine[] = data
  .trim()
  .split('\n\n')
  .map((m) => m.split('\n'))
  .map((m) => ({
    A: getVector(m[0]),
    B: getVector(m[1]),
    prize: getVector(m[2]),
  }));

let totalTokens = 0;
for (const m of machines) {
  let tokens = Infinity;
  for (let x = 1; x < 100; x++) {
    const A = m.A.x * x;
    const remainder = m.prize.x - A;
    if (remainder < 0) {
      continue;
    }
    const solutionFound = remainder % m.B.x === 0;
    if (solutionFound) {
      const Apresses = x;
      const Bpresses = remainder / m.B.x;
      const t = Apresses * 3 + Bpresses;
      if (Apresses <= 100 && Bpresses <= 100 && t < tokens) {
        // check of y adds up
        if (Apresses * m.A.y + Bpresses * m.B.y === m.prize.y) {
          tokens = t;
        }
      }
    }
  }
  if (tokens < Infinity) {
    totalTokens += tokens;
  }
}

console.log({ totalTokens });

function getVector(descr: string): Vector {
  const coords = descr.replace(/[^\d,]/g, '');
  const [x, y] = coords.split(',').map((v) => parseInt(v));
  return { x, y };
}
