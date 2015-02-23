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
  lost,
  d,
  lives,
  background,
  lego;



// $(document).keydown(onKeyDown);
// $(document).keyup(onKeyUp);
$(document).mousemove(onMouseMove);
$("#canvas").click(clickEvent)

function checkLost() {
  if (lost) {
    togglePause()
    if (lives > 1) {
      lost = false;
      lives -= 1;
      resetBoard();
    }
  }
}

function clickEvent() {
  if (lost) {
    lost = false;
    init()
  } else if (pause === undefined || isWon()) {
    init()
  } else {
    togglePause()
  }
}

function circle(x,y,r) {
  var grd = ctx.createRadialGradient(x, y, r/5, x, y, r)
  grd.addColorStop(0, "grey")
  grd.addColorStop(1, "black")


  ctx.fillStyle = grd //"gray"


  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
}

function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function draw() {
  clear();
  checkLost();
  if (isWon()) {
    wonMessage();
  } else {
    drawBoard();
    hit();
    // movePaddle();
    pauseMessage();
    x += dx;
    y += dy;
  }
}

function drawBackground() {
  ctx.drawImage(
    background,
    0,
    0,
    WIDTH,
    HEIGHT
  );
}

function drawBoard() {
  drawBackground();
  circle(x, y, d);
  drawBricks();
  drawLives();
  drawPaddle();
}

function drawBricks() {
  for (i = 0; i < NROWS; i++) {
    for (j = 0; j < NCOLS; j++) {
      if (bricks[i][j] == 1) {
        ctx.drawImage(
          lego,
          // i * 15,
          // i * 15,
          // 100,
          // 100,
          (j * (BRICKWIDTH + PADDING))+ PADDING,
          (i * (BRICKHEIGHT + PADDING)) + PADDING,
          BRICKWIDTH,
          BRICKHEIGHT
        );
      }
    }
  }
}

function drawLives() {
  ctx.fillStyle = "White"
  ctx.font = "18px sans-serif";
  ctx.fillText("Lives: " + lives, 50, HEIGHT - 20);
}

function drawPaddle() {
  rect(paddlex, HEIGHT-paddleh, paddlew, paddleh);
}

function endInterval() {
  clearInterval(interval)
}

function hit() {
  hitWalls();
  hitBricks();
}

function hitBricks() {
  rowHeight = BRICKHEIGHT + PADDING;
  colWidth = BRICKWIDTH + PADDING;

  row = Math.floor((y - d)/rowHeight);
  col = Math.floor(x / colWidth);

  if (
    (y - d) < NROWS * rowHeight && row >= 0 &&
    col >= 0 && bricks[row][col] == 1
  ) {
    dy = -dy;
    bricks[row][col] = 0;
  }
}

function hitPaddle() {
  if (dy < 0) {
    return
  }

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
  if (x > WIDTH - d || x < 0 + d) {
    dx = -dx;
  }
  if (y < 0) {
    dy = -dy;
  } else if ( y > HEIGHT - paddleh/3 - d) {
    if (x > paddlex - d && x < paddlex + paddlew + d) {
      hitPaddle()
    } else {
      lost = true;
      endInterval;
      dy = -dy;
    }
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
  y = HEIGHT / 3 + 20 ;
  dx = WIDTH / 150;
  dy = HEIGHT / 75;
 d= 10;
}

function initBricks() {
  BRICKHEIGHT = 15;
  NROWS = Math.floor(HEIGHT / 3 / (BRICKHEIGHT + 1 ));
  NCOLS = Math.floor(WIDTH / (paddlew * 3 / 5));
  BRICKWIDTH = ((WIDTH - 1)/NCOLS) - 1;
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

function initLives() {
  lives = 3;
}

function initMouse() {
  canvasMinX = $("#canvas").offset().left;
  canvasMaxX = canvasMinX + WIDTH;
}

function initPaddle() {
  paddleh = 10 ;
  paddlew = WIDTH/5;
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
  clear();
  drawBackground();
  ctx.fillStyle = "white"
  ctx.font = "60px sans-serif bold";
  ctx.fillText("Welcome!", 10, 50);
  ctx.font = "32px sans-serif";
  ctx.fillText("Play BreakOut", 20, 100);
  ctx.font = "26px sans-serif";
  ctx.fillText("Click to Start!", 50, 150);
}

function lowerDeltaY() {
  if (dy >= -HEIGHT/150) {
    return
  } else {
    dy -= dy/3
  }
}

function movePaddle() {
  if (rightDown) {
    paddlex += 5
  } else if (leftDown) {
    paddlex -= 5
  }
}

// function onKeyDown(evt) {
//   if (evt.keyCode == 39) {
//     rightDown = true;
//   }
//   else if (evt.keyCode == 37) {
//     leftDown = true;
//   }
// }
//
// function onKeyUp(evt) {
//   if (evt.keyCode == 39) {
//     rightDown = false;
//   } else if (evt.keyCode == 37) leftDown = false;
// }

function onMouseMove(evt) {
  if (evt.pageX > canvasMinX + paddlew/3 && evt.pageX < canvasMaxX - paddlew/3) {
    paddlex = evt.pageX - canvasMinX - paddlew/2;
  }
}

function pauseMessage() {
  ctx.fillStyle = "White"
  if (lost) {
    ctx.font = "42px sans-serif";
    ctx.fillText("GAME OVER!", 50, 150);
    ctx.font = "26px sans-serif";
    ctx.fillText("Click to Restart!", 50, 180);
  } else if (pause){
    ctx.font = "26px sans-serif";
    ctx.fillText("Click to Resume", 50, 150);
  } else {
    ctx.font = "26px sans-serif";
    ctx.fillText("Click to Pause", 50, 150);
  }
}

function raiseDeltaY() {
  if (dy <= (-HEIGHT/40)) {
    return
  } else {
    dy += dy/3
  }
}

function rect(x, y, w, h) {
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();
}

function resetBoard() {
  initBall()
}

function start() {
  initBall();
  initPaddle();
  initBricks();
  initUIVars();
  initLives();
  draw();
}

function togglePause() {
 if(pause) {
    pause = false
    initInterval()
  } else {
    pause = true
    endInterval()
  }
}

function isWon() {
  for ( var i = 0; i < bricks.length; i++ ) {
    if (bricks[i].indexOf(1) !== -1) {
      return false
    }
  }
  return true
}

function wonMessage() {
  togglePause();
  drawBackground();
  ctx.fillStyle = "White"
  ctx.font = "96px sans-serif";
  ctx.fillText("You Win", 10, 100);
  ctx.font = "26px sans-serif";
  ctx.fillText("Click to Play Again!", 50, 150);
}

// load images


background = new Image();
background.src = "background.jpg"
lego = new Image();
lego.src = "lego.jpg"
background.onload = function() {
  init()
}
