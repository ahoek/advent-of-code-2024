import fs from 'node:fs';
// const input = 'demo';
// const [width, height] = [11, 7];
const input = 'input';
const [width, height] = [101, 103];
const data = fs.readFileSync(`${import.meta.dirname}/${input}.txt`, 'utf8');

interface Vector {
  x: number;
  y: number;
}

interface Robot {
  p: Vector;
  v: Vector;
}

const robots: Robot[] = data
  .trim()
  .split('\n')
  .map((m) => m.split(' '))
  .map((m) => ({
    p: getVector(m[0]),
    v: getVector(m[1]),
  }));

const endRobots: Vector[] = [];
for (const robot of robots) {
  const end = move(robot, 100);
  endRobots.push(end);
}

const safetyFactor = calculateSafetyFactor(endRobots);
console.log({ safetyFactor });

function calculateSafetyFactor(robots: Vector[]): number {
  let quadrants = { 1: 0, 2: 0, 3: 0, 4: 0 };
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const l = robots.filter((r) => r.x === x && r.y === y).length;
      if (l) {
        const q = getQuadrant(x, y);
        if (q !== 0) {
          quadrants[q] += l;
        }
      }
    }
  }
  console.log(quadrants);
  return Object.values(quadrants).reduce((acc, cur) => acc * cur);
}

function getQuadrant(x: number, y: number): number {
  const halfHeight = (height - 1) / 2;
  const halfWidth = (width - 1) / 2;
  if (y < halfHeight) {
    if (x < halfWidth) {
      return 1;
    }
    if (x > halfWidth) {
      return 2;
    }
  }
  if (y > halfHeight) {
    if (x < halfWidth) {
      return 3;
    }
    if (x > halfWidth) {
      return 4;
    }
  }
  return 0;
}

function testPlot(robots: Vector[]): string {
  const map: string[][] = [];
  for (let y = 0; y < height; y++) {
    map.push([]);
    for (let x = 0; x < width; x++) {
      const l = robots.filter((r) => r.x === x && r.y === y).length;
      map[y].push(l !== 0 ? `${l}` : '.');
    }
  }
  return map.map((m) => m.join('')).join('\n');
}

function move(robot: Robot, time: number): Vectos {
  const distance = mul(time, robot.v);
  const virtPos = add(robot.p, distance);
  const pos = bound(virtPos);
  return pos;
}

function add(v1: Vector, v2: Vector): Vector {
  return {
    x: v1.x + v2.x,
    y: v1.y + v2.y,
  };
}

function mul(a: number, v: Vector): Vector {
  return {
    x: a * v.x,
    y: a * v.y,
  };
}

function bound(v: Vector): Vector {
  // Make the number positive in a dumb way
  const factor = 100;
  return {
    x: (factor * width + v.x) % width,
    y: (factor * height + v.y) % height,
  };
}

function getVector(descr: string): Vector {
  const coords = descr.replace(/[^\d,-]/g, '');
  const [x, y] = coords.split(',').map((v) => parseInt(v));
  return { x, y };
}
