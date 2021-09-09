import draw from "/draw.js";
import { forEachCell, getSurroundingCells, getBombCount } from "./utils.js";
import { FLAG, EMPTY, BOMB, UNEXPLORED, CELL_SIZE } from "./constants.js";

// TODO: game over detection (win or lose)
// TODO: recursively expand empty cells
// TODO: generate numbers
// TODO: bigger map
// TODO: display progress (e.g. x/y 💣 bombs placed)

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// TODO: generate numbers automatically using genBombNumbers()
/*
const MAP_SOLUTION = [
  [EMPTY, BOMB, EMPTY, EMPTY, BOMB],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, BOMB, BOMB, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
];
*/
const MAP_SOLUTION = [
  ["1", BOMB, "1", "1", BOMB],
  ["2", "3", "3", "2", "1"],
  ["1", BOMB, BOMB, "1", EMPTY],
  ["1", "2", "2", "1", EMPTY],
];
const MAP = [];

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

const loop = (tick) => {
  draw(ctx, MAP, tick);
  requestAnimationFrame(loop);
};

const onResize = (e) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

const isCellInBounds = (cellX, cellY, cells) =>
  cellX >= 0 &&
  cellY >= 0 &&
  cellY < cells.length &&
  cellX < cells[cellY].length;

const tapCell = (cellX, cellY) => {
  if (!isCellInBounds(cellX, cellY, MAP_SOLUTION)) {
    return;
  }
  if (MAP[cellY][cellX] === FLAG) {
    return;
  }
  // TODO: enable first tap to always hit an empty cell
  MAP[cellY][cellX] = MAP_SOLUTION[cellY][cellX];
  if (MAP_SOLUTION[cellY][cellX] === EMPTY) {
    const surroundingCells = getSurroundingCells(MAP_SOLUTION, cellX, cellY);
    // TODO: recursively fill all blanks by checking surrounding spaces
    forEachCell(surroundingCells, (x, y, value) => {
      if (value !== BOMB) {
        if (isCellInBounds(cellX + x - 1, cellY + y - 1, MAP)) {
          MAP[cellY + y - 1][cellX + x - 1] = value;
        }
      }
    });
  }
};

const flagCell = (cellX, cellY) => {
  /*
    if is valid cell...
    if is unexplored cell...or flagged
    toggle
  */
  if (!isCellInBounds(cellX, cellY, MAP)) {
    return;
  }
  const cell = MAP[cellY][cellX];
  if (cell === UNEXPLORED || cell === FLAG) {
    MAP[cellY][cellX] = cell === UNEXPLORED ? FLAG : UNEXPLORED;
  }
};

const init = () => {
  ctx.imageSmoothingEnabled = false;
  onResize();
  window.addEventListener("resize", onResize);

  // mouse click events
  const getCoordinatesFromEvent = (e) => ({
    cellX: ~~(e.clientX / CELL_SIZE),
    cellY: ~~(e.clientY / CELL_SIZE),
  });
  // left click
  canvas.addEventListener("click", (e) => {
    const { cellX, cellY } = getCoordinatesFromEvent(e);
    tapCell(cellX, cellY);
  });
  // right click
  canvas.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    const { cellX, cellY } = getCoordinatesFromEvent(e);
    flagCell(cellX, cellY);
  });

  // setup new level
  MAP.length = 0;
  MAP_SOLUTION.forEach((row) =>
    MAP.push(new Array(row.length).fill().map(() => UNEXPLORED))
  );

  requestAnimationFrame(loop);
};
init();
