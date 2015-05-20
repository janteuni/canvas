// import styles
require('../styles/app.css');

// Core
(function(){

  // init canvas
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  document.body.appendChild(canvas);
  canvas.width = window.innerWidth;
  canvas.height = 500;

  var mouse = null;

  // var define size
  var w = 100;
  var h = 50;

  resize();
  draw();

  function draw() {
    // define main colors
    var gradient = ctx.createLinearGradient(0,0,200,0);
    gradient.addColorStop(0,"#98ddc2");
    gradient.addColorStop(1,"#55bb91");


    ctx.strokeStyle = "#55bb91";
    ctx.lineWidth = 3;

    // background color
    ctx.fillStyle = "#98ddc2";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height - h + 5);
    ctx.fillStyle = gradient;

    // draw
    var odd = 0;
    for (var y = canvas.height - 2 * h; y > -2 * h; y -= h) {
      for (var x = window.innerWidth; x > -w; x -= w) {

        var offset = 0;
        if (odd % 2 == 0) {
          offset = -w / 2;
        }
        var pressure1 = {x: x + offset + 120, y: y + 50};
        var pressure2 = {x: x + offset + 40, y: y + 130};
        if (isMouseInEcaille(x + offset, y)) {
          pressure1.x += 7;
          pressure1.y -= 7;
          pressure2.x += 15;
        }

        ctx.beginPath();
        ctx.moveTo(x + offset, y);
        ctx.bezierCurveTo(pressure1.x, pressure1.y, pressure2.x, pressure2.y, x + offset - 40, y + 60);
        ctx.save();
        ctx.translate(x + offset, y);
        ctx.stroke();
        ctx.fill();
        ctx.restore();
      }
      odd++;
    }
    requestAnimationFrame(draw);
  }

  function isMouseInEcaille(x, y) {
    if (!mouse) {
      return false;
    }
    if (mouse.x > x - w/2 && mouse.x < x + w
    && mouse.y > y - h/2 && mouse.y < y + h) {
      return true;
    }
    return false;
  }

  function resize() {
    canvas.width = window.innerWidth;
  }
  window.addEventListener("resize", resize);
  document.addEventListener("mousemove", function(event){
    if (!mouse) {
      mouse = {};
    }
    mouse.x = event.x;
    mouse.y = event.y;
  });



})();
