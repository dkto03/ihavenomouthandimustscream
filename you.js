let currentLoop = 0;
let currentIndex = 0;
let isShowing = false;
let images = [];
let customFont;
const reveals = [
  { text: "softness", image: "cage1.png" },
  { text: "viscera", image: "cage2.png" },
  { text: "fluids", image: "cage3.png" },
  { text: "flexibility", image: "cage4.png" }
];

function preload() {
  customFont = loadFont('assets/RubikBrokenFax-Regular.ttf');
  reveals.forEach(reveal => {
    images.push(loadImage(`assets/${reveal.image}`));
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight).parent('you-container');
  textFont(customFont);
  textAlign(CENTER, CENTER);
  textSize(40);
}

function draw() {
  background(0);
  
  if (isShowing) {
    // Show current image/text pair
    const img = images[currentIndex];
    const scale = min(width/img.width, height/img.height) * 0.7;
    imageMode(CENTER);
    image(img, width/2, height/2, img.width*scale, img.height*scale);
    
    fill(255, 0, 0);
    text(reveals[currentIndex].text, width/2, height - 100);
  } 
  else {
    // Show idle screen
    drawGlitchText("Your  #-+%%%%#", width/2, height/2 - 50);
    
    // Show appropriate prompt
    if (currentLoop >= 5) {
      fill(100);
      text("PRESS ENTER TO CONTINUE", width/2, height/2 + 50);
    } else {
      fill(100);
      text("PRESS SPACE", width/2, height/2 + 50);
    }
  }
}

function drawGlitchText(txt, x, y) {
  fill(255);
  text(txt, x, y);
  for (let i = 0; i < 3; i++) {
    if (random() > 0.7) {
      fill(random(150, 255), 0, random(150, 255));
      text(txt, x + random(-5, 5), y + random(-3, 3));
    }
  }
}

function keyPressed() {
  if (key === ' ' && currentLoop < 5) {
    if (!isShowing) {
      // Start showing current pair
      isShowing = true;
    } else {
      // Advance to next pair
      currentIndex = (currentIndex + 1) % reveals.length;
      
      // Count completed loops
      if (currentIndex === 0) {
        currentLoop++;
      }
      
      // If just completed 5th loop, hide images
      if (currentLoop >= 5) {
        isShowing = false;
      }
    }
    return false;
  }
  
  if (key === 'Enter' && currentLoop >= 5) {
    window.location.href = "five.html";
    return false;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}