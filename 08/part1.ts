import fs from 'node:fs';
// const input = 'input';
const input = 'demo';
const data = fs.readFileSync(`${import.meta.dirname}/${input}.txt`, 'utf8');
console.log(data);
