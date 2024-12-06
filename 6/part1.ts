import fs from 'node:fs'
const input = 'input';
// const input = 'demo'
const data = fs.readFileSync(`${import.meta.dirname}/${input}.txt`, 'utf8')
const rows = data.split('\n').map(row => row.split(''))

let position = { x: undefined, y: undefined, direction: undefined }

function findPosition() {
  rows.some((row, y) => {
    row.some((value , x)=> {
      if (['^','v','>','<'].includes(value)) {
        position = {x,y, direction: value }
        return true
      }
    })
    if (position.x) return true
  })
  return position
}

function turn() {
  const turnTo = {
    '^': '>',
    '>': 'v',
    'v': '<',
    '<': '^',
  }
  position.direction = turnTo[position.direction]
}

function move() {
  const {x,y,direction} = position
  const newPosition = {...position}
  switch (direction) {
    case '^':
      newPosition.y = y-1
      break;
    case '>':
      newPosition.x = x+1
      break;
    case 'v':
      newPosition.y = y+1
      break;
    case '<':
      newPosition.x = x-1
      break
  }

  if (rows[newPosition.y]?.[newPosition.x] === undefined) {
    rows[position.y][position.x] = 'X'
    return false
  } else if (rows[newPosition.y][newPosition.x] === '#') {
    turn()
    return true
  }
  rows[position.y][position.x] = 'X'
  position = newPosition
  return true
}
findPosition()
while(move()) {
  // console.log(position)
}

const map = rows.flatMap(row => row.join('')).join('\n')
console.log(map)
console.log(map.match(/X/g).length)
