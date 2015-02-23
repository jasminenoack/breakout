var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');

// makes a rectangle
c.fillStyle = "red"
c.fillRect(100, 100, 400, 300);


// makes a shape
c.fillStyle = "yellow";
c.beginPath();
c.moveTo(50, 20);
c.lineTo(200, 50);
c.lineTo(150, 80)
c.closePath();
// fills in the shape
c.fill();

// colors the actual line
c.strokeStyle = "green"
c.lineWidth = 5;
c.stroke();

//
c.beginPath();
c.moveTo(10, 30);
c.bezierCurveTo(50, 90, 159, -30, 200, 30);
c.closePath();


// colors the actual line
c.strokeStyle = "black"
c.lineWidth = 4;
c.stroke();
