// move the ball
var ctx,
  WIDTH,
  HEIGHT,
  paddlex,
  paddleh,
  paddlew,
  interval,
  canvasMinX,
  canvasMaxX,
  bricks,
  NROWS,
  NCOLS,
  BRICKWIDTH,
  BRICKHEIGHT,
  PADDING,
  i,
  j,
  x,
  y,
  dx,
  dy,
  ctx,
  pause,
  rightDown,
  leftDown,
  lost;

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);
$(document).mousemove(onMouseMove);
$("#canvas").click(togglePause)

// get a reference to the canvas, set the interval
function init() {
  if (!ctx) {
    initCanvas();
    initMouse();
  }
  initBall();
  initPaddle();
  initBricks();
  initUIVars();

  draw()
}

function initCanvas() {
  var canvas = document.getElementById('canvas');
  WIDTH = canvas.width;
  HEIGHT = canvas.height;
  ctx = canvas.getContext('2d');
}

function initMouse() {
  canvasMinX = $("#canvas").offset().left
  canvasMaxX = canvasMinX + WIDTH;
}

function initBall() {
  x = 150;
  y = 150;
  dx = 2;
  dy = 4;
}

function initPaddle() {
  paddleh = 10;
  paddlew = 75;
  paddlex = WIDTH/2 - paddlew/2;
}

function initBricks() {
  NROWS = 5;
  NCOLS = 5;
  BRICKWIDTH = (WIDTH/NCOLS) - 1;
  BRICKHEIGHT = 15;
  PADDING = 1;

  bricks = new Array(NROWS);
  for (i = 0; i < NROWS; i++){
    bricks[i] = new Array(NCOLS);
    for (j=0; j<NCOLS; j++) {
      bricks[i][j] = 1;
    }
  }
}

function initUIVars() {
  if (pause === undefined){
    pause = true;
  }
  rightDown = false;
  leftDown = false;
  lost = false;
}

function draw() {
  clear();
  checkLost()
  drawBoard();
  circle(x, y, 10);
  checkWalls();
  movePaddle();
  drawBricks();
  hitBricks();
  rect(paddlex, HEIGHT-paddleh, paddlew, paddleh);

  x += dx;
  y += dy;
}

function checkLost() {
  if (lost) {
    togglePause()
    init()
  }
}

function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function drawBoard() {
  ctx.fillStyle = "black";
  ctx.rect(0,0,WIDTH, HEIGHT);
  ctx.fill();
}

function circle(x,y,r) {
  ctx.fillStyle = "blue"
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
}

function checkWalls() {
  if (x + dx > WIDTH || x + dx < 0) {
    dx = -dx;
  }
  if (y + dy < 0) {
    dy = -dy;
  } else if ( y + dy > HEIGHT ) {
    if (x > paddlex && x < paddlex + paddlew) {
      dy = -dy;
    } else {
      lost = true;
      endInterval;
      dy = -dy;
    }
  }
}

function movePaddle() {
  if (rightDown) {
    paddlex += 5
  } else if (leftDown) {
    paddlex -= 5
  }
}

function onKeyDown(evt) {
  if (evt.keyCode == 39) {
    rightDown = true;
  }
  else if (evt.keyCode == 37) {
    leftDown = true;
  }
}

function onKeyUp(evt) {
  if (evt.keyCode == 39) {
    rightDown = false;
  } else if (evt.keyCode == 37) leftDown = false;
}

function onMouseMove(evt) {
  if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
    paddlex = evt.pageX - canvasMinX - paddlew/2;
  }
}

function drawBricks() {
  for (i = 0; i < NROWS; i++) {
    for (j = 0; j < NCOLS; j++) {
      if (bricks[i][j] == 1) {
        rect((j * (BRICKWIDTH + PADDING))+ PADDING,
             (i * (BRICKHEIGHT + PADDING)) + PADDING,
             BRICKWIDTH, BRICKHEIGHT)
      }
    }
  }
}

function hitBricks() {
  rowHeight = BRICKHEIGHT + PADDING;
  colWidth = BRICKWIDTH + PADDING;
  row = Math.floor(y/rowHeight);
  col = Math.floor(x/colWidth);

  if (
    y < NROWS * rowHeight && row >= 0 &&
    col >= 0 && bricks[row][col] == 1
  ) {
    dy = -dy;
    bricks[row][col] = 0;
  }
}

function rect(x, y, w, h) {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();
}

function togglePause() {
 if (pause) {
    pause = false
    initInterval()
  } else {
    pause = true
    endInterval()
  }
}

function initInterval() {
  return interval = setInterval(draw, 10);
}

function endInterval() {
  clearInterval(interval)
}
// End library code
init();
