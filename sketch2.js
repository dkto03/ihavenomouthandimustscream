// sketch2.js - Minimal version for your transition
(function() {
  new p5(function(p) {
    p.setup = function() {
      let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
      canvas.parent('sketch-container');
      p.background(0); // Black background
      p.fill(255); // White text
      p.textSize(32);
      p.textAlign(p.CENTER, p.CENTER);
      p.text("I begin to hate", p.width/2, p.height/2);
    };

    p.windowResized = function() {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
  });
})();