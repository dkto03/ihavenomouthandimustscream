let customFont;
let glitchIntensity = 0;
let lastMouseX = 0;

function preload() {
  customFont = loadFont('assets/RubikBrokenFax-Regular.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight).parent('five-container');
  textFont(customFont);
  textAlign(CENTER, CENTER);
  textSize(40);
  noCursor();
}

function draw() {
  // Glitch effect based on mouse speed
  const mouseSpeed = abs(mouseX - lastMouseX);
  lastMouseX = mouseX;
  glitchIntensity = constrain(mouseSpeed * 0.2, 0, 15);
  
  background(0);
  
  // Main text with glitch
  drawGlitchText("THE END?", width/2, height/2 - 50);
  
  // Subtext
  fill(100);
  text("CLICK ANYWHERE TO RESTART", width/2, height/2 + 50);
  
  // Additional glitch effects
  if (random() > 0.95) {
    fill(255, 0, 0, 50);
    rect(0, 0, width, height);
  }
}

function drawGlitchText(txt, x, y) {
  // Base text
  fill(255);
  text(txt, x, y);
  
  // Glitch layers
  for (let i = 0; i < 3; i++) {
    if (random() > 0.6) {
      push();
      translate(
        random(-glitchIntensity, glitchIntensity),
        random(-glitchIntensity/2, glitchIntensity/2)
      );
      fill(random(255), 0, random(255));
      text(txt, x, y);
      pop();
    }
  }
}

function mousePressed() {
  // Restart the experience
  window.location.href = "index.html";
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}