let brushHue, bird;

function setup() {
  // Canvas & color settings
  createCanvas(400,600);
  bird = new Bird();
}

function draw() {
  background(0);
  bird.show();
  bird.update();
}

function Bird() {
  this.x = width/2;
  this.y = height/2;
  
  this.gravity = 1;
  this.velocity = 0;
  
  this.show = function () {
    fill(255);
    circle(this.x, this.y, 16);
  }
  
  this.update = function () {
    // makes the bird drop down
    this.velocity += this.gravity;
    this.y += this.velocity;
    
    //need to make the bird stop dropping at the bottom of the window
    if (this.y > height){
      this.y = height;
      this.velocity = 0;
    }
  }
}
 