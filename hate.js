(function() {    
    let lastMouseX = 0;
    let glitchIntensity = 0;
    let customFont;
    
    new p5(function(p) {
      p.preload = function() {
        customFont = p.loadFont('assets/RubikBrokenFax-Regular.ttf');
      };
  
      p.setup = function() {
        let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent('sketch-container');
        p.textFont(customFont);
        p.textAlign(p.CENTER, p.CENTER);
      };
  
      p.draw = function() {
        // Calculate mouse movement intensity
        const mouseSpeed = Math.abs(p.mouseX - lastMouseX);
        lastMouseX = p.mouseX;
        glitchIntensity = p.constrain(mouseSpeed * 0.5, 0, 20); // Increased max intensity
        
        p.background(0);
        
        // FULL-SCREEN "type hate" background (subtle)
        p.textSize(20);
        p.fill(100, 0, 0, 30); // Dark red, very transparent
        for (let i = 0; i < 200; i++) { // More instances for full coverage
          p.text("type hate"), 
            p.random(p.width), 
            p.random(p.height)
        }
        
        // MAIN TEXT ===================================
        p.textSize(32);
        
        // "And I begin to" (stable white text)
        p.fill(255);
        p.text("And I begin to", p.width/2 - 90, p.height/2);
        
        // "HATE" with INTENSE SHAKING =================
        let shakeX = p.random(-glitchIntensity*2, glitchIntensity*2);
        let shakeY = p.random(-glitchIntensity, glitchIntensity);
        
        // Base red "HATE" at 50% opacity
        p.push();
        p.translate(shakeX, shakeY);
        p.fill(255, 0, 0, 127); // 50% opacity red
        p.text("HATE", p.width/2 + 90, p.height/2);
        p.pop();
        
        // Glitchy duplicates (3 layers)
        for (let i = 0; i < 3; i++) {
          if (p.random() > 0.7) { // 30% chance per frame
            p.push();
            p.translate(
              shakeX + p.random(-10, 10),
              shakeY + p.random(-5, 5)
            );
            p.fill(
              p.random(150, 255),
              p.random(50),
              p.random(50),
              p.random(50, 100)
            );
            p.text("HATE", p.width/2 + 90, p.height/2);
            p.pop();
          }
        }
      };
      
      p.keyPressed = function() {
        // Your existing typing interaction can go here
      };
    });
})();