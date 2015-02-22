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
$("#canvas").click(clickEvent)

// get a reference to the canvas, set the interval


function checkLost() {
  if (lost) {
    togglePause()
  }
}

function clickEvent() {
  if (lost) {
    lost = false;
    init()
  } else if (pause === undefined) {
    init()
  } else {
    togglePause()
  }
}

function circle(x,y,r) {
  ctx.fillStyle = "blue"
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
}

function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function draw() {
  clear();
  checkLost()
  drawBoard();
  pauseMessage()
  circle(x, y, 10);
  hitWalls();
  movePaddle();
  drawBricks();
  hitBricks();
  drawPaddle();

  x += dx;
  y += dy;
}

function drawBoard() {
  ctx.fillStyle = "black";
  ctx.rect(0,0,WIDTH, HEIGHT);
  ctx.fill();
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

function drawPaddle() {
  rect(paddlex, HEIGHT-paddleh, paddlew, paddleh);
}

function endInterval() {
  clearInterval(interval)
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

function hitPaddle() {
  dy = -dy;
  if (x < paddlex + paddlew / 3) {
    if (dx > 0) {
      raiseDeltaY()
    } else {
      lowerDeltaY()
    }

  } else if (x < paddlex + (paddlew / 3) * 2) {
    return

  } else {
    if (dx > 0) {
      lowerDeltaY()
    } else {
      raiseDeltaY()
    }
  }
}

function hitWalls() {
  if (x + dx > WIDTH || x + dx < 0) {
    dx = -dx;
  }
  if (y + dy < 0) {
    dy = -dy;
  } else if ( y + dy > HEIGHT - paddleh ) {
    if (x > paddlex && x < paddlex + paddlew) {
      hitPaddle()
    } else {
      lost = true;
      endInterval;
      dy = -dy;
    }
  }
}

function raiseDeltaY() {
  if (dy >= 8) {
    return
  } else {
    dy += 1
  }
}

function lowerDeltaY() {
  if (dy <= 4) {
    return
  } else {
    dy -= 1
  }
}

function init() {
  if (!ctx) {
    initCanvas();
    initMouse();
    initWelcome();
  } else {
    start();
  }
}

function initBall() {
  x = (Math.random() * WIDTH / 2) + WIDTH / 4;
  y = 150;
  dx = 3;
  dy = 6;
}

function initBricks() {
  NROWS = 8;
  NCOLS = 8;
  BRICKWIDTH = ((WIDTH - 1)/NCOLS) - 1;
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

function initCanvas() {
  var canvas = document.getElementById('canvas');
  WIDTH = canvas.width;
  HEIGHT = canvas.height;
  ctx = canvas.getContext('2d');
}

function initInterval() {
  return interval = setInterval(draw, 10);
}

function initMouse() {
  canvasMinX = $("#canvas").offset().left
  canvasMaxX = canvasMinX + WIDTH;
}

function initPaddle() {
  paddleh = 10 ;
  paddlew = 75;
  paddlex = WIDTH/2 - paddlew/2;
}

function initUIVars() {
  if (pause === undefined){
    pause = true;
  }
  rightDown = false;
  leftDown = false;
  lost = false;
}

function initWelcome() {
  drawBoard();
  ctx.fillStyle = "White"
  ctx.font = "48px sans-serif";
  ctx.fillText("Welcome", 10, 50);
  ctx.font = "32px sans-serif";
  ctx.fillText("Play BreakOut", 20, 100);
  ctx.font = "26px sans-serif";
  ctx.fillText("Click to Start!", 50, 150);
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

function pauseMessage() {
  ctx.fillStyle = "White"
  if (lost) {
    ctx.font = "26px sans-serif";
    ctx.fillText("Click to Restart!", 50, 150);
  } else if (pause){
    ctx.font = "26px sans-serif";
    ctx.fillText("Click to Resume", 50, 150);
  } else {
    ctx.font = "26px sans-serif";
    ctx.fillText("Click to Pause", 50, 150);
  }
}

function rect(x, y, w, h) {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();
}

function start() {
  initBall();
  initPaddle();
  initBricks();
  initUIVars();
  draw();
}

function togglePause() {
 if (pause) {
    pause = false
    initInterval()
  } else {
    pause = true
    endInterval()
    draw
  }
}




// rect(paddlex, HEIGHT-paddleh, paddlew, paddleh);


















// End library code
init();
