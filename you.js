let texts = [
    "Your softness.",
    "Your viscera",
    "Your fluids.",
    "And your flexibility."
  ];
  
  let images = [];
  let currentIndex = 0;
  let lastChange = 0;
  let glitchAlpha = 255;
  let customFont;
  
  // Preload assets
  function preload() {
    customFont = loadFont('assets/RubikBrokenFax-Regular.ttf');
    
    // Load 4 images (name them image1.jpg, image2.jpg, etc.)
    for (let i = 1; i <= 4; i++) {
      images.push(loadImage(`assets/image${i}.jpg`));
    }
  }
  
  function setup() {
    createCanvas(windowWidth, windowHeight).parent('you-container');
    textFont(customFont);
    textAlign(CENTER, CENTER);
    textSize(40);
    frameRate(60);
    lastChange = millis();
  }
  
  function draw() {
    // Glitch transition effect
    if (millis() - lastChange < 1000) {
      glitchAlpha = map(millis() - lastChange, 0, 1000, 0, 255);
      background(0);
      drawGlitchEffect();
    } 
    else if (millis() - lastChange > 5000) {
      nextSlide();
    }
    else {
      // Stable display
      glitchAlpha = 255;
      displayCurrent();
    }
  }
  
  function displayCurrent() {
    background(0);
    
    // Display image (centered, scaled to fit)
    let img = images[currentIndex];
    let scale = min(width/img.width, height/img.height) * 0.8;
    let imgWidth = img.width * scale;
    let imgHeight = img.height * scale;
    
    imageMode(CENTER);
    tint(255, glitchAlpha);
    image(img, width/2, height/2 - 50, imgWidth, imgHeight);
    
    // Display text
    fill(255, 0, 0, glitchAlpha);
    text(texts[currentIndex], width/2, height - 100);
  }
  
  function drawGlitchEffect() {
    // Glitchy version during transitions
    for (let i = 0; i < 10; i++) {
      push();
      translate(random(-20, 20), random(-10, 10));
      fill(random(255), random(255), random(255), random(50, 100));
      text(texts[currentIndex], width/2 + random(-5, 5), height - 100 + random(-2, 2));
      
      // Glitchy image
      let img = images[currentIndex];
      let scale = min(width/img.width, height/img.height) * 0.8;
      image(
        img,
        width/2 + random(-30, 30),
        height/2 - 50 + random(-15, 15),
        img.width * scale * random(0.9, 1.1),
        img.height * scale * random(0.9, 1.1)
      );
      pop();
    }
  }
  
  function nextSlide() {
    currentIndex = (currentIndex + 1) % texts.length;
    lastChange = millis();
  }
  
  function keyPressed() {
    if (keyCode === ESCAPE) {
      // Prevent default ESC behavior
      window.location.href = "five.html";
      return false;
    }
  }
  
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }