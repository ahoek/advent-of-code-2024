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

const maxCycle = width * height;
for (let time = 0; time < maxCycle; time++) {
  const endRobots: Vector[] = [];
  for (const robot of robots) {
    const end = move(robot, time);
    endRobots.push(end);
  }
  const plot = testPlot(endRobots);
  if (time % 1000 === 0) {
    console.log({ time });
  }
  // visually check output if possible cluster
  if (plot.includes('#######')) {
    console.log({ time });
    console.log(plot);
  }
}

function testPlot(robots: Vector[]): string {
  const map: string[][] = [];
  for (let y = 0; y < height; y++) {
    map.push([]);
    for (let x = 0; x < width; x++) {
      const l = robots.filter((r) => r.x === x && r.y === y).length;
      map[y].push(l !== 0 ? '#' : '.');
    }
  }
  return map.map((m) => m.join('')).join('\n');
}

function move(robot: Robot, time: number): Vector {
  const distance = mul(time, robot.v);
  const virtPos = add(robot.p, distance);
  return bound(virtPos);
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

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

function bound(v: Vector): Vector {
  return {
    x: mod(width + v.x, width),
    y: mod(height + v.y, height),
  };
}

function getVector(descr: string): Vector {
  const coords = descr.replace(/[^\d,-]/g, '');
  const [x, y] = coords.split(',').map((v) => parseInt(v));
  return { x, y };
}
