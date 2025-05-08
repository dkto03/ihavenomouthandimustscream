let showQuestionMark = false;
let questionGlitch = 0;
let heart, AM;
let pulseSize = 1;
let fadeAlpha = 0;
let currentState = 'splash';
let heartRate = 60;
let customFont;
let heartBeatSize = 32;
let imgGlitch = 0; // For image glitch effects
let lastGlitchTime = 0;
let splashStartTime;

function preload() {
  heart = loadSound('audio/heartbeat.mp3');
  AM = loadImage('imgs/AM-tower.png');  
}

function setup() {
  createCanvas(windowWidth, windowHeight).parent('sketch-container');
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  customFont = 'Rubik Broken Fax';

  heart.loop();
  heart.setVolume(0.7);

  if (customFont) textFont(customFont);
  else textFont('Courier New');

  noStroke();

  splashStartTime = millis(); // record when the splash starts
}

function handleSplashTransition() {
  if (millis() - splashStartTime > 3000) {
    fadeAlpha += 5;
    fill(0, fadeAlpha);
    rect(0, 0, width, height);

    if (fadeAlpha >= 255) {
      currentState = 'text';
    }
  }
}


function draw() {
  background(0);
  
  // Text pulse synced to heartbeat (more dramatic)
  heartBeatSize = map(sin(frameCount * 0.2), -1, 1, 30, 36);
  
  if (currentState === 'splash') {
    drawSplash();
    handleSplashTransition();
  } else {
    drawTextScene();
    if (showQuestionMark) drawGlitchyQuestionMark();
  }
}

// GLITCHY IMAGE EFFECT (Replaces old pulsing)
function drawSplash() {
  // Base image with random glitch offsets
  if (random() > 0.1) { // 90% chance to draw normally
    push();
    translate(width/2, height/2);
    
    // Random glitch transforms
    if (millis() - lastGlitchTime > 1000 && random() > 0.7) {
      imgGlitch = random(0.9, 1.1);
      lastGlitchTime = millis();
    }
    
    scale(imgGlitch);
    rotate(random(-0.05, 0.05));
    image(AM, random(-5, 5), random(-5, 5), 400, 400);
    pop();
  }
  
  // 10% chance for full glitch frame
  if (random() > 0.9) {
    push();
    translate(width/2, height/2);
    tint(255, 50, 50, 150);
    image(AM, random(-20, 20), random(-10, 10), 450, 450);
    noTint();
    pop();
  }
}

// TEXT WITH HEARTBEAT EFFECT
function drawTextScene() {
  background(0, 128);

  let glitchIntensity = map(heartRate, 60, 120, 0, 10);

  // First line
  if (isHovering(width/2, height/2 - 40, "I have no mouth")) {
    drawGlitchText("I have no mouth", width/2, height/2 - 40, glitchIntensity + 5);
  } else {
    drawGlitchText("I have no mouth", width/2, height/2 - 40, glitchIntensity);
  }

  // Second line
  let secondLineHover = isHovering(width/2, height/2 + 40, "And I must scream");
  if (secondLineHover) {
    showQuestionMark = true;
    drawGlitchText("And I must scream", width/2, height/2 + 40, glitchIntensity + 10);
  } else {
    drawGlitchText("And I must scream", width/2, height/2 + 40, glitchIntensity);
  }
}

function drawGlitchText(txt, x, y, intensity) {
  textSize(32);
  fill(255);
  text(txt, x, y); // Base layer

  // Glitch layers
  for (let i = 0; i < 3; i++) {
    if (random() > 0.5) {
      let xOffset = random(-intensity, intensity);
      let yOffset = random(-intensity, intensity);
      fill(random(100, 255), random(100, 255), random(100, 255), 150);
      text(txt, x + xOffset, y + yOffset);
    }
  }
}

// ENHANCED GLITCH QUESTION MARK
function drawGlitchyQuestionMark() {
  let baseX = width/2;
  let baseY = height/2 + 100;
  
  // Base question mark with pulse
  textSize(48 * map(heartRate, 60, 120, 1, 1.5));
  fill(255);
  text("?", baseX, baseY);
  
  // Glitch layer (intensity tied to heart rate)
  if (random() > 0.7) {
    push();
    translate(
      baseX + random(-heartRate/5, heartRate/5),
      baseY + random(-10, 10)
    );
    fill(random(255), random(255), random(255));
    text("?", 0, 0);
    pop();
  }
}

function mousePressed() {
  if (showQuestionMark && dist(mouseX, mouseY, width/2, height/2 + 100) < 30) {
    // Clean up before loading next sketch
    heart.stop();
    remove();
    
    // Load next sketch
    let script = document.createElement('script');
    script.src = 'sketch2.js';
    document.head.appendChild(script);
  }
}

function isHovering(x, y, txt) {
  let tWidth = textWidth(txt);
  let tHeight = textAscent() + textDescent();
  return (
    mouseX > x - tWidth/2 &&
    mouseX < x + tWidth/2 &&
    mouseY > y - tHeight/2 &&
    mouseY < y + tHeight/2
  );
}