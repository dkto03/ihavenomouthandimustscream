(function() {
  let fadeAlpha = 0;
  let lastMouseX = 0;
  let glitchIntensity = 0;
  
  new p5(function(p) {
    p.setup = function() {
      let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
      canvas.parent('sketch-container');
      p.textSize(32);
      p.textAlign(p.CENTER, p.CENTER);
      p.textFont('Rubik Broken Fax');
      lastMouseX = p.mouseX;
    };

    p.draw = function() {
      // Calculate mouse speed
      const mouseSpeed = Math.abs(p.mouseX - lastMouseX);
      lastMouseX = p.mouseX;
      
      // Dynamic glitch intensity (0-10 scale)
      glitchIntensity = p.constrain(mouseSpeed * 0.2, 0, 10);
      
      p.background(0);
      fadeAlpha = p.min(fadeAlpha + 1, 255);
      
      // Base text (always visible)
      p.fill(255, 0, 0, fadeAlpha);
      p.text("And I begin to hate", p.width/2, p.height/2);
      
      // Glitch layer (intensity based on mouse movement)
      if(glitchIntensity > 1) {
        p.push();
        p.translate(
          p.random(-glitchIntensity, glitchIntensity),
          p.random(-glitchIntensity/2, glitchIntensity/2)
        );
        p.fill(
          p.random(100, 255),
          p.random(100), 
          p.random(100), 
          fadeAlpha * 0.7
        );
        p.text("I begin to hate", 
          p.width/2 + p.random(-10, 10),
          p.height/2 + p.random(-5, 5)
        );
        p.pop();
        
        // Extra distortion effect when moving fast
        if(glitchIntensity > 6) {
          p.push();
          p.translate(
            p.random(-glitchIntensity*2, glitchIntensity*2),
            0
          );
          p.fill(0, 255, 0, fadeAlpha * 0.4);
          p.text("Ȉ̷̟͠ ̸̦͒̿b̵̛̗̽ḛ̷̾̿g̶̳̈́̓i̷̠̽̈́n̴̤̽͝ ̷̝̆̿t̴̩̊̆o̸̗̽͝ ̵̩̑̈́ḧ̸́͜͠a̴̹͛̽ț̶͆͠e̸̫̽̿", 
            p.width/2, 
            p.height/2
          );
          p.pop();
        }
      }
    };

    p.windowResized = function() {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
  });
})();