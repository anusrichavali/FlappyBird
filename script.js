let brushHue, bird;
var pipes = [];
function setup() {
  // Canvas & color settings
  createCanvas(400,600);
  bird = new Bird();
  pipes.push(new Pipe());
}

function draw() {
  background(0);
  bird.show();
  bird.update();
  
  if (frameCount % 40 == 0){
    
  }
  
  for (let i = 0; i < pipes.length; i++){
    pipes[i].display();
    pipes[i].update();
  }
  
  
}

function Bird() {
  this.x = width/2;
  this.y = height/2;
  
  this.gravity = 0.1;
  this.lift = -3;
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
    } else if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }
  
  this.up = function() {
    this.velocity += this.lift;
    this.y += this.velocity;
  }
}

function keyPressed(){
  if (keyCode === UP_ARROW){
    bird.up();
  }
}
 
class Pipe {
  constructor(){
  this.top = random(height/2);
    this.bottom = random(height/2);
    this.x = width;
    this.w = 20;
    this.speed = 1;
  }
  
  display(){
    fill(255);
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  }
  
  update() {
    this.x -= this.speed;
  }
}