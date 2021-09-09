const EMPTY = " ";
const BOMB = "B";

const MAP = [
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, BOMB, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, BOMB, EMPTY, EMPTY],
  [BOMB, BOMB, EMPTY, EMPTY, BOMB, EMPTY],
  [EMPTY, EMPTY, EMPTY, BOMB, EMPTY, EMPTY],
];

// Given a 3x3 array, return a count of surrounding squares
const getBombCount = (input) => {
  let total = 0;
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const isCenter = x === 1 && y === 1;
      const isBomb = input[y][x] === BOMB;
      if (!isCenter && isBomb) {
        total++;
      }
    }
  }
  return total;
};

// Given an large array (input) and a position within that array (x, y)
// Return a 3x3 array of values centered on (x, y)
const getSurroundingCells = (input, x, y) => {
  const output = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
  ];
  for (let outputY = 0; outputY < output.length; outputY++) {
    for (let outputX = 0; outputX < output[outputY].length; outputX++) {
      const xRelativeToCenter = outputX - 1;
      const yRelativeToCenter = outputY - 1;
      const inputX = xRelativeToCenter + x;
      const inputY = yRelativeToCenter + y;
      const isInputYInBounds = inputY >= 0 && inputY < input.length;
      const isInputXInBounds =
        isInputYInBounds && inputX >= 0 && inputX < input[inputY].length;
      if (isInputXInBounds && isInputYInBounds) {
        output[outputY][outputX] = input[inputY][inputX];
      }
    }
  }
  return output;
};

// Given a 2D array, return an array with numbers
const genBombNumbers = (input) => {
  const output = JSON.parse(JSON.stringify(input));
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const curr = input[y][x];
      if (curr === BOMB) {
        continue;
      } else {
        const numBombs = getBombCount(getSurroundingCells(input, x, y));
        output[y][x] = numBombs > 0 ? numBombs.toString() : EMPTY;
      }
    }
  }
  return output;
};

const createMap = (width, height, numBombs) => {
  // Create a 2D array filled with EMPTY
  const map = new Array(height).fill().map(() => new Array(width).fill(EMPTY));
  // Fill map with random bombs
  for (let i = 0; i < numBombs; i++) {
    x = ~~(Math.random() * width);
    y = ~~(Math.random() * height);
    if (map[y][x] !== BOMB) {
      map[y][x] = BOMB;
      const cellAboveIsInBounds = true;
      const cellAboveIsABomb = true;
      if (cellAboveIsInBounds && !cellAboveIsABomb) {
        if (cellAboveIsEmpty) {
          cellAbove = "1";
        } else {
          cellAbove = `${Number(cellAbove) + 1}`;
        }
      }
    } else {
      i--; // try again
    }
  }
  return map;
};

const map = createMap(20, 10, 25);
const result = genBombNumbers(MAP);

const displayGrid = (grid) => {
  const rowLength = grid[0].length * 2 + 1;
  console.log(`.${"-".repeat(rowLength - 2)}.`);
  for (let y = 0; y < grid.length; y++) {
    let line = "|";
    for (let x = 0; x < grid[y].length; x++) {
      line += `${grid[y][x]}|`;
    }
    console.log(line);
  }
  console.log(`\`${"-".repeat(rowLength - 2)}'`);
};

displayGrid(map);

/*
displayGrid(MAP);
console.log("\n\n");
displayGrid(result);
*/
