// Read data
import fs from 'node:fs'
const input = 'input';
// const input = 'demo';
const data = fs.readFileSync(`./2/${input}.txt`, 'utf8')
const reports = data
  .split('\n')
  .map(r => r.split(' ').map(l => parseInt(l, 10)))

let safeCount = 0;
const isSafe = (r) => {
  let sorted = [...r]
  sorted = sorted.sort((a, b) => a - b)
  const inc = JSON.stringify(r) === JSON.stringify(sorted)
  const dec = JSON.stringify(r) === JSON.stringify([...sorted].reverse())
  if (!inc && !dec) {
    return false
  }

  const unsafe = r.some((curr, i) => {
    if (i === 0) {
      return false
    }
    const diff = Math.abs(r[i-1] - curr)
    return diff < 1 || diff > 3
  })
  
  return !unsafe
}

reports.forEach(r => {
  if (isSafe(r)) {
    safeCount += 1
  }
})
console.log(safeCount)
