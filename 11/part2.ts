import fs from 'node:fs';
// const input = 'demo';
// const input = 'demo2';
const input = 'input';
const data = fs.readFileSync(`${import.meta.dirname}/${input}.txt`, 'utf8');
const stones: number[] = data
  .trim()
  .split(' ')
  .map((n) => parseInt(n, 10));

// console.log(stones);
// const blinks = 25; // part1
// const blinks = 45;
const blinks = 75; // part2

const cache = new Map();
let stoneCount = 0;
for (const stone of stones) {
  stoneCount += blink(stone);
}

console.log('Stone count:', stoneCount, cache.size);
// 11 259 883
// 1174000000
function blink(stone: number, level = 0) {
  const key = `${level}:${stone}`;
  if (cache.has(key)) {
    return cache.get(key);
  }
  if (level === blinks) {
    return 1;
  }

  let count = 0;
  level += 1;
  if (stone === 0) {
    count += blink(1, level);
  } else if (`${stone}`.length % 2 === 0) {
    const s = `${stone}`;
    const half = s.length / 2;
    count += blink(parseInt(s.slice(0, half)), level);
    count += blink(parseInt(s.slice(half)), level);
  } else {
    count += blink(stone * 2024, level);
  }

  cache.set(key, count);
  return count;
}
