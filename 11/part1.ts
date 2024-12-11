import fs from 'node:fs';
// const input = 'demo';
// const input = 'demo2';
const input = 'input';
const data = fs.readFileSync(`${import.meta.dirname}/${input}.txt`, 'utf8');
const stones: string[] = data.trim().split(' ');

console.log(stones);
const blinks = 25; // part1
// const blinks = 75; // part2

let result = stones;
for (let i = 0; i < blinks; i++) {
  result = blink(result);
  console.log(i, result.length);
}

const stoneCount = result.length;
console.log(stoneCount);

function blink(stones: string[]): string[] {
  const newStones = stones.map((stone) => {
    if (stone === '0') {
      return '1';
    }
    if (stone.length % 2 === 0) {
      const half = stone.length / 2;
      return `${parseInt(stone.slice(0, half))} ${parseInt(stone.slice(half))}`;
    }
    return `${parseInt(stone) * 2024}`;
  });
  return newStones.join(' ').split(' ');
}
