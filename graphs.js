var data = [16, 68, 20, 30, 54];

var canvas = document.getElementById('bars');

var bars = canvas.getContext('2d');

bars.fillStyle = "white";
bars.fillRect(0,0,500,500);

bars.fillStyle = "blue";
for(var i=0; i<data.length; i++) {
  var dp = data[i];
  // 25 + i*100 x pos changes with i from for loop
  // 2 y position from top of canvas
  // 50 width of bar
  // dep*5 = height of bar
  bars.fillRect(40 + i*100, 460 - dp*5, 50, dp*5 );
}

bars.fillStyle = "black";
bars.lineWidth = 2.0;
bars.beginPath();
bars.moveTo(30, 10);
bars.lineTo(30, 460);
bars.lineTo(490, 460);
bars.stroke();

bars.fillstyle = "black";
for(var i = 0; i < 6; i++) {
  bars.fillText((5-i)*20 + "",4, i*80+60);
  bars.beginPath();
  bars.moveTo(25, i*80+60);
  bars.lineTo(30, i*80+60);
  bars.stroke();
}

var labels = ["JAN", "FEB", "MAR", "APR", "MAY"];
for(var i = 0; i < 5; i++) {
  bars.fillText(labels[i], 50 + i*100, 475)
}




var pieCanvas = document.getElementById('pie')
var pie = pieCanvas.getContext('2d')
var pieData = [100, 68, 20, 30, 100]
pie.fillStyle = "white";
pie.fillRect(0,0,500,500);


var colors = ["orange", "red", "green", "blue", "purple"];
var total = 0;
for (var i = 0; i < pieData.length; i++ ) {
  total += pieData[i];
}

var prevAngle = 0;
for (var i = 0; i < pieData.length; i++) {
  var fraction = pieData[i]/total;
  var angle = prevAngle + fraction*Math.PI*2

  // pie.fillStyle = colors[i];
  var grad = pie.createRadialGradient(250, 250, 10, 250, 250, 100);
  grad.addColorStop(0, "white");
  grad.addColorStop(1, colors[i]);
  pie.fillStyle = grad;

  pie.beginPath();
  pie.moveTo(250,250);
  pie.arc(250, 250, 100, prevAngle, angle, false);
  pie.lineTo(250, 250);

  pie.fill();

  pie.strokeStyle = "black";
  pie.stroke();

  prevAngle = angle;
}

pie.fillStyle = "black";
pie.font = "24pt sans-serif";
var text = "Sales Data from 2025";
var metrics = pie.measureText(text);
pie.fillText(text, 250 - metrics.width/2, 400);
