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
const offset = 10000000000000;
// const offset = 0;
let totalTokens = 0;
for (const m of machines) {
  console.log('####');
  const prize = { x: m.prize.x + offset, y: m.prize.y + offset };
  const A = m.A;
  const B = m.B;

  // solve for:
  // a * A.x + b * B.x = price.x
  // a * A.y + b * B.y = price.y
  // https://www.khanacademy.org/test-prep/v2-sat-math/x0fcc98a58ba3bea7:algebra-easier/x0fcc98a58ba3bea7:solving-systems-of-linear-equations-easier/a/v2-sat-lesson-solving-systems-of-linear-equations

  const b = (prize.y * A.x - A.y * prize.x) / (-(B.x * A.y) + B.y * A.x);
  const a = (prize.x - B.x * b) / A.x;

  // Check if solutions are whole numbers
  if (a !== Math.floor(a) || b !== Math.floor(b)) {
    continue;
  }

  if (A.x * a + B.x * b === prize.x && A.y * a + B.y * b === prize.y) {
    totalTokens += a * 3 + b;
    console.log('prize got for', a, b);
  }
}

console.log({ totalTokens });
// 875318608908 too low

function getVector(descr: string): Vector {
  const coords = descr.replace(/[^\d,]/g, '');
  const [x, y] = coords.split(',').map((v) => parseInt(v));
  return { x, y };
}
