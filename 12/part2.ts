import fs from 'node:fs';
// const input = 'demo';
const input = 'input';
const data = fs.readFileSync(`${import.meta.dirname}/${input}.txt`, 'utf8');
// console.log(data);
const map = data
  .trim()
  .split('\n')
  .map((line) => line.split(''));
const mapSize = map.length;

interface Location {
  x: number;
  y: number;
  v: string;
  children?: Location[];
  d?: boolean;
}

const locations: Location[] = [];
for (let y = 0; y < mapSize; y++) {
  for (let x = 0; x < mapSize; x++) {
    locations.push({ x, y, v: map[y][x], d: false });
  }
}
locations.forEach((t) => {
  findChildren(t);
});

const groups: Record<string, Location[]> = {};
const sides: Record<string, number> = {};

for (const loc of locations) {
  if (loc.d) {
    continue;
  }
  const key = render(loc);
  groups[key] = [loc];
  loc.d = true;
  growLoc(loc, key);
}

findSides();

function findSides() {
  let prev = '';
  let prevUp = '';
  let upSize = 0;
  let prevDown = '';
  let downSize = 0;
  for (let y = 0; y < mapSize; y++) {
    prev = '';
    prevUp = '';
    prevDown = '';
    upSize = 0;
    downSize = 0;
    for (let x = 0; x < mapSize; x++) {
      const curr = map[y][x];
      const up = map[y - 1]?.[x];
      const down = map[y + 1]?.[x];
      if (up !== curr) {
        if (!(prev === curr && prevUp !== prev)) {
          upSize += 1;
          addSide(x, y, curr);
        }
      }
      if (down !== curr) {
        if (!(prev === curr && prevDown !== prev)) {
          downSize += 1;
          addSide(x, y, curr);
        }
      }
      prev = curr;
      prevUp = up;
      prevDown = down;
    }
  }

  // just copy paste of up and down for left and right :-O
  for (let x = 0; x < mapSize; x++) {
    prev = '';
    prevUp = '';
    prevDown = '';
    upSize = 0;
    downSize = 0;
    for (let y = 0; y < mapSize; y++) {
      const curr = map[y][x];
      const up = map[y]?.[x - 1];
      const down = map[y]?.[x + 1];
      if (up !== curr) {
        if (!(prev === curr && prevUp !== prev)) {
          upSize += 1;
          addSide(x, y, curr);
        }
      }
      if (down !== curr) {
        if (!(prev === curr && prevDown !== prev)) {
          downSize += 1;
          addSide(x, y, curr);
        }
      }
      prev = curr;
      prevUp = up;
      prevDown = down;
    }
  }
}

function addSide(x: number, y: number, v: string) {
  const key = getGroupKey(x, y, v);
  if (!sides[key]) {
    sides[key] = 1;
  } else {
    sides[key] += 1;
  }
}

function getGroupKey(x: number, y: number, v: string): string {
  const search: Location = { x, y, v };
  const group = Object.keys(groups).filter((key) =>
    groups[key].map(render).includes(render(search))
  );
  return group;
}

let totalPrice = 0;
for (const key of Object.keys(groups)) {
  totalPrice += groupPrice(key);
}

console.log(totalPrice);

function groupPrice(key: string): number {
  return sides[key] * groups[key].length;
}

function growLoc(loc: Location, key: string) {
  for (const c of loc.children) {
    if (c.d) {
      continue;
    }
    groups[key].push(c);
    c.d = true;
    growLoc(c, key);
  }
}

function findChildren(l: Location) {
  // get neighbors
  const up = locations.find(
    (location) =>
      location.x === l.x && location.y === l.y - 1 && location.v === l.v
  );
  const down = locations.find(
    (location) =>
      location.x === l.x && location.y === l.y + 1 && location.v === l.v
  );
  const left = locations.find(
    (location) =>
      location.x === l.x - 1 && location.y === l.y && location.v === l.v
  );
  const right = locations.find(
    (location) =>
      location.x === l.x + 1 && location.y === l.y && location.v === l.v
  );
  l.children = [up, down, left, right].filter((l) => l !== undefined);
}

function render(l: Location) {
  return `${l.x},${l.y}|${l.v}`;
}
