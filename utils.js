import { EMPTY, BOMB } from "./constants.js";

export const forEachCell = (cells, callback) => {
  for (let cellY = 0; cellY < cells.length; cellY++) {
    for (let cellX = 0; cellX < cells[cellY].length; cellX++) {
      callback(cellX, cellY, cells[cellY][cellX]);
    }
  }
};

// Given an large array (input) and a position within that array (x, y)
// Return a 3x3 array of values centered on (x, y)
export const getSurroundingCells = (input, x, y) => {
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

// Given a 3x3 array, return a count of surrounding squares
export const getBombCount = (input) => {
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
