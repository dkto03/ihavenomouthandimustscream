let newContent;

function preload() {
  // Load assets for this sketch
  newContent = loadImage('assets/images/new-content.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  
  // Your sketch2 content
  background(0);
  fill(255);
  textSize(32);
  text("Welcome to the second part of the experience", width/2, height/2);
  
  // Example interactive element
  newContent.resize(300, 0);
  image(newContent, width/2, height/2 + 100);
}

function draw() {
  // Your animation/drawing code for sketch2
}

function mousePressed() {
  // Example interaction
  if (dist(mouseX, mouseY, width/2, height/2 + 100) < 150) {
    window.location.href = "sketch3.html"; // Link to next sketch
  }
}