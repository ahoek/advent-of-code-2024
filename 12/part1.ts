import fs from 'node:fs';
// const input = 'demo';
const input = 'input';
const data = fs.readFileSync(`${import.meta.dirname}/${input}.txt`, 'utf8');
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
for (const loc of locations) {
  if (loc.d) {
    continue;
  }
  const key = render(loc);
  groups[key] = [loc];
  loc.d = true;
  growLoc(loc, key);
}
let totalPrice = 0;
for (const group of Object.values(groups)) {
  totalPrice += groupPrice(group);
}
console.log(totalPrice);

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

function groupPrice(group: Location[]) {
  let perimeter = 0;
  for (const loc of group) {
    perimeter += 4 - loc.children.length;
  }
  return perimeter * group.length;
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
