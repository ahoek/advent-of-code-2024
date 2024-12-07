// Read data
import fs from 'node:fs';
const input = 'input';
// const input = 'demo';
const data = fs.readFileSync(`./4/${input}.txt`, 'utf8');
const matrix = data.split('\n').map((line) => line.split(''));

let count = 0;
for (let y = 0; y < matrix.length; y++) {
  for (let x = 0; x < matrix[y].length; x++) {
    if (matrix[x][y] === 'A') {
      if (
        (matrix[x - 1]?.[y - 1] === 'M' && matrix[x + 1]?.[y + 1] === 'S') ||
        (matrix[x - 1]?.[y - 1] === 'S' && matrix[x + 1]?.[y + 1] === 'M')
      ) {
        if (
          (matrix[x - 1]?.[y + 1] === 'M' && matrix[x + 1]?.[y - 1] === 'S') ||
          (matrix[x - 1]?.[y + 1] === 'S' && matrix[x + 1]?.[y - 1] === 'M')
        ) {
          count++;
        }
      }
    }
  }
}
console.log(count);
// console.log(matrix);
