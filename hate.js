(function() {    
    let lastMouseX = 0;
    let glitchIntensity = 0;
    let customFont;
    let userTyped = '';
    let targetText = "____";
    let correctInput = false;
    let successTime = 0;
    
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
        // Check for successful input and transition after 2 seconds
        if (correctInput && p.millis() - successTime > 2000) {
          window.location.href = "laughter.html";
          return;
        }
        
        // Calculate mouse movement intensity
        const mouseSpeed = Math.abs(p.mouseX - lastMouseX);
        lastMouseX = p.mouseX;
        glitchIntensity = p.constrain(mouseSpeed * 0.5, 0, 20);
        
        p.background(0);
        
        // GLITCHING "type hate" BACKGROUND
        p.textSize(18);
        p.fill(255, 255, 255, 75);
        for (let i = 0; i < 200; i++) {
          p.push();
          p.translate(
            p.random(-glitchIntensity*10, glitchIntensity*10),
            p.random(-glitchIntensity*10, glitchIntensity*10)
          );
          p.text("type hate", p.random(p.width), p.random(p.height));
          p.pop();
        }
        
        // MAIN TEXT
        p.textSize(32);
        
        // "And I begin to" (stable white text)
        p.fill(255);
        p.text("And I begin to", p.width/2 - 90, p.height/2);
        
        // TEXT INPUT DISPLAY (shows uppercase regardless of input)
        let displayText = userTyped.length > 0 ? userTyped.toUpperCase() : targetText;
        let textOpacity = correctInput ? 255 : 127;
        
        // Base text with dynamic opacity
        p.fill(255, 0, 0, textOpacity);
        p.text(displayText, p.width/2 + 90, p.height/2);
        
        // SHAKING GLITCH EFFECTS (continue animating even after correct input)
        if (glitchIntensity > 0) {
          // Primary glitch layer
          p.push();
          p.translate(
            p.random(-glitchIntensity*3, glitchIntensity*3),
            p.random(-glitchIntensity, glitchIntensity)
          );
          p.fill(255, 100, 100, textOpacity * 0.7);
          p.text(displayText, p.width/2 + 90, p.height/2);
          p.pop();
          
          // Random glitch copies
          for (let i = 0; i < p.floor(glitchIntensity/5); i++) {
            p.push();
            p.translate(
              p.random(-20, 20),
              p.random(-10, 10)
            );
            p.fill(
              255,
              p.random(100),
              p.random(100),
              p.random(50, 150)
            );
            p.text(displayText, p.width/2 + 90, p.height/2);
            p.pop();
          }
        }
        
        // SUCCESS MESSAGE
        if (correctInput) {
          p.fill(0, 255, 0, 150);
          p.textSize(24);
          p.text("✓", p.width/2 + 140, p.height/2 - 10);
        }
      };
      
      p.keyPressed = function() {
        if (correctInput) return; // Ignore input after success
        
        // Only allow letters
        if (p.keyCode >= 65 && p.keyCode <= 90) {
          userTyped += p.key.toLowerCase(); // Store lowercase
          userTyped = userTyped.slice(-4); // Keep last 4 chars
          
          // Check if "hate" was typed (case-insensitive)
          if (userTyped === "hate") {
            correctInput = true;
            successTime = p.millis();
          }
        }
        // Backspace
        if (p.keyCode === 8) {
          userTyped = userTyped.slice(0, -1);
          correctInput = false; // Reset success if editing
        }
      };
    });
})();