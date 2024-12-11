import fs from 'node:fs';
// const input = 'demo';
const input = 'input';
const data = fs.readFileSync(`${import.meta.dirname}/${input}.txt`, 'utf8');
const map = data
  .trim()
  .split('\n')
  .map((line) => line.split('').map((h) => parseInt(h)));
const mapSize = map.length;

interface Location {
  x: number;
  y: number;
  h: number;
  children?: Location[];
}

// Find trailheads
const locations: Location[] = [];
for (let y = 0; y < mapSize; y++) {
  for (let x = 0; x < mapSize; x++) {
    locations.push({ x, y, h: map[y][x] });
  }
}

locations.forEach((t) => {
  findChildren(t);
});

const starts = locations.filter((l) => l.h === 0);
const paths = getPaths(starts);
const fullPaths = paths.filter((p) => p.length === 10);

// part 1
// const scorePaths = fullPaths.map((p) => `${p[0]} ${p[9]}`);
// const scoreSet = new Set(scorePaths);
// console.log(scoreSet.size);
// part 2
const ratingPaths = fullPaths.map((p) => p.join(' '));
const ratingSet = new Set(ratingPaths);
console.log(ratingSet.size);

function getPaths(locations: Location[], path = []): Location[][] {
  let result = [];
  locations.forEach((loc) => {
    if (loc.children.length) {
      result.push(...getPaths(loc.children, [...path, render(loc)]));
    } else {
      result.push([...path, render(loc)]);
    }
  });
  return result;
}

function findChildren(l: Location) {
  // get neighbors
  const up = locations.find(
    (location) =>
      location.x === l.x && location.y === l.y - 1 && location.h === l.h + 1
  );
  const down = locations.find(
    (location) =>
      location.x === l.x && location.y === l.y + 1 && location.h === l.h + 1
  );
  const left = locations.find(
    (location) =>
      location.x === l.x - 1 && location.y === l.y && location.h === l.h + 1
  );
  const right = locations.find(
    (location) =>
      location.x === l.x + 1 && location.y === l.y && location.h === l.h + 1
  );
  l.children = [up, down, left, right].filter((l) => l !== undefined);
}

function render(l) {
  return `${l.x},${l.y}|${l.h}`;
}
