import fs from 'node:fs';
const input = 'input';
// const input = 'demo';
const data = fs.readFileSync(`${import.meta.dirname}/${input}.txt`, 'utf8');
const map = data
  .trim()
  .split('\n')
  .map((line) => line.trim().split(''));
const height = map.length;
const width = map[0].length;

interface Location {
  x: number;
  y: number;
}
// Find unique character locations (antennas)
const antennas = {};
const antennaLocs = new Set<string>();

for (let x = 0; x < map[0].length; x++) {
  for (let y = 0; y < map.length; y++) {
    const loc = map[y][x];
    if (loc !== '.') {
      if (!antennas[loc]) {
        antennas[loc] = [];
      }
      antennas[loc].push({ x, y });
      antennaLocs.add(renderLocation({ x, y }));
    }
  }
}

// Calculate antinode locations
const antiLocs = new Set<string>();

// const offsets = [1, -2]; // part1
const offsets = arrayRange(-48, 48); // bit overkill

Object.keys(antennas).forEach((a) => {
  const locations = antennas[a];
  const pairs = getPairs(locations);
  pairs.forEach(([p1, p2]) => {
    const delta: Location = {
      x: p1.x - p2.x,
      y: p1.y - p2.y,
    };
    offsets.forEach((offset) => {
      const anti: Location = {
        x: p1.x + offset * delta.x,
        y: p1.y + offset * delta.y,
      };
      if (!outOfBounds(anti)) {
        antiLocs.add(renderLocation(anti));
      }
    });
  });
});

console.log(antiLocs.size);

function getPairs(a: Location[]): Location[][] {
  return a.map((v, i) => a.slice(i + 1).map((w) => [v, w])).flat();
}

function outOfBounds(loc: Location): boolean {
  return loc.x < 0 || loc.x >= width || loc.y < 0 || loc.y >= height;
}

function renderLocation(location: Location): string {
  return `${location.x},${location.y}`;
}

function arrayRange(start: number, stop: number): number[] {
  return Array.from({ length: stop - start + 1 }, (_, index) => start + index);
}
