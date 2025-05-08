let haElements = [];
let customFont;
let lastMouseX = 0;
let glitchIntensity = 0;

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
      isVisible: true,
      id: i
    });
  }
}

function draw() {
  background(0);

  const mouseSpeed = abs(mouseX - lastMouseX);
  lastMouseX = mouseX;
  glitchIntensity = constrain(mouseSpeed * 0.3, 0, 15);

  let visibleCount = 0;

  textFont(customFont);
  haElements.forEach(ha => {
    if (ha.isVisible) {
      visibleCount++;
      
      // Update glitch offsets
      ha.baseX = random(-glitchIntensity, glitchIntensity);
      ha.baseY = random(-glitchIntensity/2, glitchIntensity/2);
      
      // Draw with glitch effect
      push();
      translate(ha.baseX, ha.baseY);
      fill(255, 0, 0);
      textSize(ha.size);
      text("HA", ha.x, ha.y);
      pop();
      
      // Check hover (with glitch-aware detection)
      const d = dist(mouseX, mouseY, ha.x + ha.baseX, ha.y + ha.baseY);
      if (d < ha.size/2) { // More precise hover area
        ha.isVisible = false;
      }
    }
  });
  
  // Transition when all are gone
  if (visibleCount === 0) {
    setTimeout(() => {
      window.location.href = "you.html";
    }, 1000);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}