import fs from 'node:fs';
// const input = 'demo';
const input = 'input';
const data = fs.readFileSync(`${import.meta.dirname}/${input}.txt`, 'utf8');
const map = data
  .trim()
  .split('')
  .map((x) => parseInt(x));

// Generate disk from map
let disk: (number | string)[] = [];
for (let i = 0; i < map.length; i++) {
  if (i % 2 === 0) {
    disk = [...disk, ...Array(map[i]).fill(i / 2)];
  } else {
    disk = [...disk, ...Array(map[i]).fill('.')];
  }
}

// Fill empty blocks
while (true) {
  const lastFileBlock = disk.findLastIndex((b) => b !== '.');
  const firstEmptyBlock = disk.findIndex((b) => b === '.');
  if (firstEmptyBlock > lastFileBlock) {
    break;
  }
  swap(disk, firstEmptyBlock, lastFileBlock);
}

// Calculate checksum
let checksum = 0;
for (let i = 0; i < disk.length; i++) {
  if (disk[i] !== '.') {
    checksum += i * (disk[i] as number);
  }
}

console.log(checksum);

function swap(arr: any[], b1: number, b2: number) {
  const temp = arr[b1];
  arr[b1] = arr[b2];
  arr[b2] = temp;
}
