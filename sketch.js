let showQuestionMark = false;
let questionGlitch = 0;
let heart;
let AM;
let pulseSize = 1;
let fadeAlpha = 0;
let currentState = 'splash';
let heartRate = 60;

function preload() {
  heart = loadSound('audio/heartbeat.mp3');
  AM = loadImage('imgs/AM-tower.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  textFont('Courier New');
  noStroke();

  heart.loop();
  heart.rate(1.0); // Normal speed
  heart.setVolume(0.7);
}

function draw() {
  background(0);
  
  if (currentState === 'splash') {
    drawSplash();
    handleSplashTransition();
  } else {
    drawTextScene();
  }
}

function updateHeartRate() {
  // Increase heart rate when hovering interactive elements
  let targetBPM = 60; // Base rate
  
  if (currentState === 'text') {
    if (isHovering(width/2, height/2 + 40, "And I must scream")) {
      targetBPM = 120; // Faster when hovering important text
    } else if (showQuestionMark) {
      targetBPM = 90; // Elevated when question mark visible
    }
  }
  
  // Smooth transition
  heartRate = lerp(heartRate, targetBPM, 0.05);
  
  // Map BPM to playback rate (60bpm = 1.0, 120bpm = 2.0)
  heart.rate(map(heartRate, 60, 120, 1.0, 2.0));
}

function drawSplash() {
  let sizePulse = sin(frameCount * 0.1) * 0.05 + 1;  
  push();
  translate(width/2, height/2);
  scale(sizePulse);
  image(AM, 0, 0, 400, 400);
  pop();
}

function handleSplashTransition() {
  if (frameCount > 100) {
    fadeAlpha += 2;
    if (fadeAlpha >= 255) {
      currentState = 'text';
    }
  }
  fill(0, fadeAlpha);
  rect(0, 0, width, height);
}

function drawTextScene() {
  background(0, 128);
  
   hoveredLine1 = isHovering(width/2, height/2 - 40, "I have no mouth");
  
  // Draw first line
  textSize(32);
  if (hoveredLine1) {
    fill(200, 0, 0);
    textSize(34);
  } else {
    fill(255);
  }
  text("I have no mouth", width/2, height/2 - 40);
  
  // Check if mouse is over second line
  let secondLineHover = isHovering(width/2, height/2 + 40, "And I must scream");
  
  // Show question mark when second line is hovered
  if (secondLineHover) {
    showQuestionMark = true;
  }
  
  // Draw first line
  textSize(32);
  fill(255);
  text("I have no mouth", width/2, height/2 - 40);
  
  // Draw second line (with hover effect)
  if (secondLineHover) {
    fill(200, 0, 0);
    textSize(34);
  } else {
    fill(255);
    textSize(32);
  }
  text("And I must scream", width/2, height/2 + 40);
  
  // Draw question mark if second line was hovered
  if (showQuestionMark) {
    drawGlitchyQuestionMark();
  }
}

function drawGlitchyQuestionMark() {
  questionGlitch += 0.05;
  let baseX = width/2;
  let baseY = height/2 + 100;
  let glitchAmount = map(sin(questionGlitch), -1, 1, 0, 10); // Reduced glitch intensity
  
  // Draw question mark with slight glitch
  push();
  translate(baseX + random(-glitchAmount, glitchAmount), 
           baseY + random(-glitchAmount, glitchAmount));
  fill(255);
  textSize(48);
  text("?", 0, 0);
  pop();
  
  // Optional: Add occasional bigger glitch
  if (random() > 0.97) {
    push();
    translate(baseX, baseY);
    rotate(random(-0.1, 0.1));
    fill(255, 50, 50);
    textSize(55);
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