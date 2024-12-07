import fs from 'node:fs'
const input = 'input';
// const input = 'demo'
const data = fs.readFileSync(`${import.meta.dirname}/${input}.txt`, 'utf8')
const calculations = data
  .split('\n').map(l => l.split(': '))
  .map(([result, numbers]) => ({
    result: parseInt(result, 10),
    numbers: numbers.split(' ').map(x => parseInt(x, 10)),
  }))

let total = 0
calculations.forEach(({ result, numbers }) => {
  const results: number[] = [numbers[0]];
  for (let i = 1; i < numbers.length; i++) {
    results.forEach((a, index) => {
      const b = numbers[i]
      results[index] = a + b
      results.push(a * b)
    })
  }
  if (results.some(r => r === result)) {
    total += result
  }
})
console.log('total', total)
