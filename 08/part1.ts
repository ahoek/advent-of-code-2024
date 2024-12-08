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
// Find unique character locations
const antennas = {};
const antennaLocs = new Set<string>();
const antiLocs = new Set<string>();

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
Object.keys(antennas).forEach((a) => {
  const locations = antennas[a];
  const pairs = getPairs(locations);
  pairs.forEach((pair) => {
    const antis = [
      {
        x: pair[0].x + (pair[0].x - pair[1].x),
        y: pair[0].y + (pair[0].y - pair[1].y),
      },
      {
        x: pair[1].x + (pair[1].x - pair[0].x),
        y: pair[1].y + (pair[1].y - pair[0].y),
      },
    ];

    antis.forEach((anti) => {
      if (!outOfBounds(anti)) {
        antiLocs.add(renderLocation(anti));
      }
    });
  });
});
console.log(antiLocs.size);
// 209 too low

function getPairs(a: Location[]): Location[][] {
  return a.map((v, i) => a.slice(i + 1).map((w) => [v, w])).flat();
}

function outOfBounds(loc: Location): boolean {
  return loc.x < 0 || loc.x >= width || loc.y < 0 || loc.y >= height;
}

function renderLocation(location: Location): string {
  return `${location.x},${location.y}`;
}
