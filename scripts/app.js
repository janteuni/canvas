// import styles
require('../styles/app.css');

// Core
(function(){

  // init canvas
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  document.body.appendChild(canvas);
  canvas.width = window.innerWidth;
  canvas.height = 400;

  var mouse = null;

  // var define size
  var w = 100;
  var h = 50;

  resize();
  draw();

  function draw() {
    // define main colors
    ctx.fillStyle = "#98ddc2";
    ctx.strokeStyle = "#55bb91";
    ctx.lineWidth = 5;

    // background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw
    var odd = 0;
    for (var y = window.innerHeight; y > -h; y -= h) {
      for (var x = window.innerWidth; x > -w; x -= w) {
        var offset = 0;
        if (odd % 2 == 0) {
          offset = -w / 2;
        }
        ctx.beginPath();
        ctx.moveTo(x + offset, y);
        ctx.bezierCurveTo(x + offset + 120, y + 50, x + offset + 40, y + 130, x + offset - 40, y + 60);
        ctx.stroke();
        ctx.fill();
      }
      odd++;
    }
    if (mouse) {
      console.log(mouse);
    }
    requestAnimationFrame(draw);
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
