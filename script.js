let brushHue

function setup() {
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  brushHue = 0;
  strokeWeight(6);
  background(95);
  
}

function draw() {
 
  brushHue += 1;
  if (brushHue > 359){
    brushHue = 0;
  } 
  if (mouseIsPressed){
  //rect(mouseX, mouseY, 15, 15);  
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
  chooseColors();
}

function chooseColors() {
 stroke(brushHue, 50, 80);
  fill(brushHue, 50, 80);
}