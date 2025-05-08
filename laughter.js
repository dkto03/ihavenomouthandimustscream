let haElements = [];
let customFont;
let glitchIntensity = 0;
let lastMouseX = 0;
let hoverImages = [];

function preload() {
  customFont = loadFont('assets/RubikBrokenFax-Regular.ttf');
  
  // SIMPLIFIED IMAGE LOADING (your preferred way)
  hoverImages = [
    loadImage('assets/p1.png'),
    loadImage('assets/p2.png'),
    loadImage('assets/p3.png'),
    loadImage('assets/p4.png'),
    loadImage('assets/p5.png')
  ];
}

function setup() {
  // FORCE BLACK BACKGROUND FIRST
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('laughter-container');
  background(0); // Immediate black
  
  textAlign(CENTER, CENTER);
  
  // Create HAs only if images loaded
  if (hoverImages.length === 5) {
    for (let i = 0; i < 5; i++) {
      haElements.push({
        x: random(width),
        y: random(height),
        size: random(30, 60),
        isVisible: true,
        isFlashing: false,
        flashStart: 0,
        assignedImage: hoverImages[i]
      });
    }
  } else {
    console.error("Images didn't load!");
    // Fallback: Just show text
    fill(255);
    text("ERROR: Missing images in /assets/", width/2, height/2);
  }
}

function draw() {
  background(0);
  
  // Calculate mouse movement intensity
  const mouseSpeed = abs(mouseX - lastMouseX);
  lastMouseX = mouseX;
  glitchIntensity = constrain(mouseSpeed * 0.3, 0, 15);
  
  let visibleCount = 0;
  
  // Draw visible HA elements
  textFont(customFont);
  haElements.forEach(ha => {
    if (ha.isVisible) {
      visibleCount++;
      
      // Glitch effect
      const gx = random(-glitchIntensity, glitchIntensity);
      const gy = random(-glitchIntensity/2, glitchIntensity/2);
      
      // Check hover
      const d = dist(mouseX, mouseY, ha.x + gx, ha.y + gy);
      
      if (d < ha.size/2 && !ha.isFlashing) {
        ha.isFlashing = true;
        ha.flashStart = frameCount;
        flashPosition = { x: ha.x, y: ha.y };
      }
      
      // Draw HA if not flashing
      if (!ha.isFlashing) {
        push();
        translate(gx, gy);
        fill(255, 0, 0);
        textSize(ha.size);
        text("HA", ha.x, ha.y);
        pop();
      }
      // Handle flash sequence
      else {
        const framesFlashing = frameCount - ha.flashStart;
        
        // Flash image for 30 frames (~0.5s at 60fps)
        if (framesFlashing < 30) {
          push();
          translate(gx, gy);
          tint(255, map(framesFlashing, 0, 30, 255, 0));
          imageMode(CENTER);
          image(
            ha.assignedImage, 
            ha.x, 
            ha.y, 
            ha.size * 5, 
            ha.size * 5
          );
          pop();
        } 
        // Disappear after flash
        else if (framesFlashing > 60) { // ~1 second total
          ha.isVisible = false;
        }
      }
    }
  });
  
// REPLACE your current transition code in laughter.js with this:

function checkHACount() {
    const visibleCount = haElements.filter(ha => ha.isVisible).length;
    
    if (visibleCount === 0) {
      // 1. Create iframe to preload you.html silently
      const preloader = document.createElement('iframe');
      preloader.style.display = 'none';
      preloader.src = 'you.html';
      document.body.appendChild(preloader);
      
      // 2. INSTANT cut (no delay)
      window.location.replace("you.html"); 
      // Note: replace() prevents back-button issues
    }
  }
  
  // Call this in your draw() loop instead of setTimeout:
  checkHACount();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}