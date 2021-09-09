import {
  FLAG,
  EMPTY,
  BOMB,
  UNEXPLORED,
  CELL_SIZE,
  BACKGROUND_COLOR,
  BOMB_RED,
  BRANDEIS_BLUE,
} from "./constants.js";

const drawRoundedRectangle = (ctx, x, y, width, height, radius) => {
  // https://www.tutorialspoint.com/How-to-draw-a-rounded-Rectangle-on-HTML-Canvas
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.fill();
};

const drawCell = (ctx, x, y, type) => {
  const buffer = ~~(CELL_SIZE * 0.1);
  ctx.beginPath();
  ctx.moveTo(x + buffer, y);
  ctx.lineTo(x + CELL_SIZE - buffer, y);
  ctx.moveTo(x + CELL_SIZE, y + buffer);
  ctx.lineTo(x + CELL_SIZE, y + CELL_SIZE - buffer);
  ctx.moveTo(x + CELL_SIZE - buffer, y + CELL_SIZE);
  ctx.lineTo(x + buffer, y + CELL_SIZE);
  ctx.moveTo(x, y + CELL_SIZE - buffer);
  ctx.lineTo(x, y + buffer);
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#888";
  ctx.stroke();

  switch (type) {
    case UNEXPLORED:
      // filled cell
      ctx.fillStyle = BRANDEIS_BLUE;
      drawRoundedRectangle(
        ctx,
        x + buffer,
        y + buffer,
        CELL_SIZE - buffer * 2,
        CELL_SIZE - buffer * 2,
        buffer
      );
      break;
    case FLAG:
      // filled cell
      /*
      ctx.fillStyle = BRANDEIS_BLUE;
      drawRoundedRectangle(
        ctx,
        x + buffer,
        y + buffer,
        CELL_SIZE - buffer * 2,
        CELL_SIZE - buffer * 2,
        buffer
      );
      */
      ctx.font = `${CELL_SIZE - buffer * 4}px Arial`;
      ctx.fillStyle = "white";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillText(FLAG, x + CELL_SIZE / 2, y + CELL_SIZE / 2);
      break;
    case BOMB:
      // TODO: put this into drawBomb(x, y)
      ctx.fillStyle = BOMB_RED;
      ctx.fillRect(
        x + buffer,
        y + buffer,
        CELL_SIZE - buffer * 2,
        CELL_SIZE - buffer * 2
      );

      ctx.font = `${CELL_SIZE - buffer * 4}px Arial`;
      ctx.fillStyle = "white";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillText(BOMB, x + CELL_SIZE / 2, y + CELL_SIZE / 2);
      break;
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      // Draw a number in the cell
      ctx.font = `${CELL_SIZE - buffer * 2}px Arial`;
      ctx.fillStyle = "white";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillText(type, x + CELL_SIZE / 2, y + CELL_SIZE / 2);
      break;
    case EMPTY:
      // intentionally do nothing
      break;
    default:
      break;
  }
};

const draw = (ctx, map, tick) => {
  ctx.translate(0.5, 0.5); // for crisp lines

  // clear the background
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // draw the map
  for (let cellY = 0; cellY < map.length; cellY++) {
    for (let cellX = 0; cellX < map[cellY].length; cellX++) {
      drawCell(ctx, cellX * CELL_SIZE, cellY * CELL_SIZE, map[cellY][cellX]);
    }
  }

  ctx.translate(-0.5, -0.5); // for crisp lines
};

export default draw;
