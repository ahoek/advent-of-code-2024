import fs from 'node:fs'
const input = 'input'
// const input = 'demo'
const data = fs.readFileSync(`${import.meta.dirname}/${input}.txt`, 'utf8')
const mainMap = data.split('\n').map(row => row.split(''))

interface Position {
  x: number
  y: number
  direction: number
}

const directions = '^>v<'
const directionMoves = [[0,-1], [1,0], [0,1], [-1,0]]

function findPosition(rows: string[][]): Position {
  let position: Position
  rows.some((row: string[], y) => {
    row.some((value: string, x)=> {
      if (directions.includes(value)) {
        position = {x, y, direction: directions.indexOf(mainMap[y][x]) }
        return true
      }
    })
    if (position?.x) return true
  })
  return position
}

const height = mainMap.length
const width = mainMap[0].length

function checkMap(map: string[][], startPosition: Position): boolean {
  const position = {...startPosition}
  const visited = new Set()

  while (true) {
    const positionKey = renderPosition(position)
    if (visited.has(positionKey)) {
      // loop detected
      // console.log(visited.size)
      return true
    }
    visited.add(positionKey)

    const newX = position.x + directionMoves[position.direction][0]
    const newY = position.y + directionMoves[position.direction][1]

    // out of bounds?
    if (newX < 0 || newX >= width || newY < 0 || newY >= height) {
      return false
    }

    if (map[newY][newX] === '#') {
      // turn right
      position.direction = (position.direction + 1) % directions.length
    } else {
      // move
      position.x = newX
      position.y = newY
    }
  }
}

// Check all submaps with extra obstacle
const start = findPosition(mainMap)
const loops = new Set()
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (mainMap[y][x] === '.') {
      const submap = clone(mainMap)
      submap[y][x] = '#'

      if (checkMap(submap, start)) {
        loops.add(`${x},${y}`)
      }
    }
  }
}
console.log(loops.size)

function clone(map: string[][]): string[][] {
  // return JSON.parse(JSON.stringify(map))
  return map.map(row => Array.from(row)) // faster than above
}

function renderPosition(p: Position): string {
  return `${p.x}, ${p.y} ${p.direction}`
}
function renderMap(map: string[][]): string {
  return '\n'+map.map(x => x.join('')).join('\n')
}