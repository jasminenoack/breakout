// move the ball
var x = 150;
var y = 150;
var dx = 2;
var dy = 4;
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
  j;
var rightDown = false;
var leftDown = false;

// get a reference to the canvas, set the interval
function init() {
  var canvas = document.getElementById('canvas');
  WIDTH = canvas.width;
  HEIGHT = canvas.height;
  ctx = canvas.getContext('2d');
  initPaddle();
  initMouse();
  initBricks();
  return interval = setInterval(draw, 10);
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

function initMouse() {
  canvasMinX = $("#canvas").offset().left
  canvasMaxX = canvasMinX + WIDTH;
}

function onMouseMove(evt) {
  if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
    paddlex = evt.pageX - canvasMinX - paddlew/2;
  }
}

function circle(x,y,r) {
  ctx.fillStyle = "blue"
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
}

function rect(x, y, w, h) {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();
}

function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function drawBoard() {
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.rect(0,0,WIDTH, HEIGHT);
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
      clearInterval(interval);
    }
  }
}

function initPaddle() {
  paddlex = WIDTH/2;
  paddleh = 10;
  paddlew = 75;
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

function movePaddle() {
  if (rightDown) {
    paddlex += 5
  } else if (leftDown) {
    paddlex -= 5
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

// End library code

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);
$(document).mousemove(onMouseMove);

function draw() {
  clear();
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

init();



// ctx.fillStyle = "black";
// ctx.fillRect(0,0,300,300);
//
//
// // draw a circle
ctx.fillStyle = "blue"
ctx.beginPath();
ctx.arc(75, 75, 10, 0, Math.PI * 2, true);
ctx.closePath();
ctx.fill();
