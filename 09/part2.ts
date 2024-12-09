import fs from 'node:fs';
// const input = 'demo';
const input = 'input';
const data = fs.readFileSync(`${import.meta.dirname}/${input}.txt`, 'utf8');
const map = data
  .trim()
  .split('')
  .map((x) => parseInt(x));

interface Segment {
  fileID: number | '.';
  length: number;
}

// Generate disk from map
const disk: Segment[] = [];
const fileIDs: number[] = [];
for (let i = 0; i < map.length; i++) {
  if (i % 2 === 0) {
    disk.push({ fileID: i / 2, length: map[i] });
    fileIDs.push(i / 2);
  } else {
    if (map[i] > 0) {
      disk.push({ fileID: '.', length: map[i] });
    }
  }
}
fileIDs.reverse().forEach((id) => {
  // Find file segment
  const fileIndex = disk.findIndex((s) => s.fileID === id);
  // Find first empty segment that fits
  const emptyIndex = disk.findIndex(
    (s) => s.fileID === '.' && s.length >= disk[fileIndex].length
  );

  if (emptyIndex > -1 && emptyIndex < fileIndex) {
    const emptyLength = disk[emptyIndex].length;
    const fileLength = disk[fileIndex].length;
    disk[emptyIndex].length = fileLength;
    swap(disk, emptyIndex, fileIndex);
    if (emptyLength - fileLength) {
      disk.splice(emptyIndex + 1, 0, {
        fileID: '.',
        length: emptyLength - fileLength,
      });
    }
  }
});

// Calculate checksum
let checksum = 0;
let index = 0;
disk.forEach((segment) => {
  if (segment.fileID !== '.') {
    for (let j = 0; j < segment.length; j++) {
      checksum += (index + j) * segment.fileID;
    }
  }
  index += segment.length;
});
console.log('Checksum:', checksum);

function swap(arr: Segment[], b1: number, b2: number) {
  const temp = arr[b1];
  arr[b1] = arr[b2];
  arr[b2] = temp;
}

function renderDisk(disk: Segment[]): string {
  let r = '';
  disk.forEach((segment) => {
    r += `${segment.fileID}`.repeat(segment.length);
  });
  return r;
}
