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
const blinks = 45;
// const blinks = 75; // part2

let stoneCount = 0;

let i = 1;
for (const stone of stones) {
  blink(stone, 1);
  console.log('#################### passed stone', i, stones.length);
  i++;
}

console.log('Stone count:', stoneCount);
// 11 259 883
// 1174000000
function blink(stone: number, level: number) {
  let children: number[];

  if (stone === 0) {
    children = [1];
  } else if (`${stone}`.length % 2 === 0) {
    const s = `${stone}`;
    const half = s.length / 2;
    children = [parseInt(s.slice(0, half)), parseInt(s.slice(half))];
  } else {
    children = [stone * 2024];
  }
  if (level === blinks) {
    stoneCount += children.length;
    return;
  }
  const newLevel = level + 1;
  for (const cn of children) {
    blink(cn, newLevel);
  }
}
