// Read data
import fs from 'node:fs';
const input = 'input';
// const input = 'demo';
const data = fs.readFileSync(`./4/${input}.txt`, 'utf8');
const matrix = data.split('\n').map((line) => line.split(''));

let count = 0;
for (let y = 0; y < matrix.length; y++) {
  for (let x = 0; x < matrix[y].length; x++) {
    if (matrix[x][y] == 'X') {
      // right
      if (
        matrix[x + 1]?.[y] == 'M' &&
        matrix[x + 2]?.[y] == 'A' &&
        matrix[x + 3]?.[y] == 'S'
      ) {
        count++;
      }
      // left
      if (
        matrix[x - 1]?.[y] == 'M' &&
        matrix[x - 2]?.[y] == 'A' &&
        matrix[x - 3]?.[y] == 'S'
      ) {
        count++;
      }
      // up
      if (
        matrix[x]?.[y + 1] == 'M' &&
        matrix[x]?.[y + 2] == 'A' &&
        matrix[x]?.[y + 3] == 'S'
      ) {
        count++;
      }
      // down
      if (
        matrix[x]?.[y - 1] == 'M' &&
        matrix[x]?.[y - 2] == 'A' &&
        matrix[x]?.[y - 3] == 'S'
      ) {
        count++;
      }
      // d right up
      if (
        matrix[x + 1]?.[y - 1] == 'M' &&
        matrix[x + 2]?.[y - 2] == 'A' &&
        matrix[x + 3]?.[y - 3] == 'S'
      ) {
        count++;
      }
      // d right down
      if (
        matrix[x + 1]?.[y + 1] == 'M' &&
        matrix[x + 2]?.[y + 2] == 'A' &&
        matrix[x + 3]?.[y + 3] == 'S'
      ) {
        count++;
      }
      // d left up
      if (
        matrix[x - 1]?.[y - 1] == 'M' &&
        matrix[x - 2]?.[y - 2] == 'A' &&
        matrix[x - 3]?.[y - 3] == 'S'
      ) {
        count++;
      }
      // d left down
      if (
        matrix[x - 1]?.[y + 1] == 'M' &&
        matrix[x - 2]?.[y + 2] == 'A' &&
        matrix[x - 3]?.[y + 3] == 'S'
      ) {
        count++;
      }
    }
  }
}
console.log(count);
// console.log(matrix);
