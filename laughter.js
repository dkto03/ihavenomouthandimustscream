let haElements = [];
let customFont;
let lastMouseX = 0;

function preload() {
  customFont = loadFont('assets/RubikBrokenFax-Regular.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight).parent('sketch-container');
  textAlign(CENTER, CENTER);
  
  // Create 5 HA elements
  for (let i = 0; i < 5; i++) {
    haElements.push({
      x: random(width),
      y: random(height),
      size: random(30, 60),
      baseX: 0, // For glitch offset
      baseY: 0
    });
  }
}

function draw() {
  background(0);
  
  // Calculate mouse movement intensity
  let mouseSpeed = abs(mouseX - lastMouseX);
  lastMouseX = mouseX;
  let glitchIntensity = constrain(mouseSpeed * 0.2, 0, 10);
  
  // Draw HA elements with glitch
  textFont(customFont);
  for (let ha of haElements) {
    // Update glitch offset based on mouse speed
    ha.baseX = random(-glitchIntensity, glitchIntensity);
    ha.baseY = random(-glitchIntensity/2, glitchIntensity/2);
    
    // Red HA text with glitch effect
    fill(255, 0, 0); // Pure red
    textSize(ha.size);
    push();
    translate(ha.baseX, ha.baseY);
    text("HA", ha.x, ha.y);
    pop();
    
    // Optional: Add secondary glitch layer (more intense)
    if (random() > 0.7) {
      fill(255, 100, 100);
      text("HA", 
        ha.x + random(-glitchIntensity*2, glitchIntensity*2),
        ha.y + random(-glitchIntensity, glitchIntensity)
      );
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}