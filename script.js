let brushHue, bird;
var pipes = [];
function setup() {
  // Canvas & color settings
  createCanvas(400,600);
  colorMode(HSB, 255, 255);
  bird = new Bird();
  pipes.push(new Pipe());
}

function draw() {
  background(0);
  bird.show();
  bird.update();
  
  if (frameCount % 100 == 0){
    pipes.push(new Pipe());
  }
  
  for (let i = pipes.length - 1; i >= 0; i--){
    pipes[i].display();
    pipes[i].update();
    
      if (pipes[i].hit(bird)){
        bird.hue = 0;   
      }
    
      if (pipes[i].offscreen()){
      pipes.splice(i, 1);
       }
    
  }
  
  
}

function Bird() {
  this.x = width/2;
  this.y = height/2;
  this.hue = 55;
  
  this.gravity = 0.1;
  this.lift = -3;
  this.velocity = 0;
  
  
  this.show = function () {
    fill(this.hue, 100, 100);
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
  if (keyCode === 32){
    bird.up();
  }
}



 
class Pipe {
  constructor(){
  this.top = random(height/2);
    this.bottom = random(height/2);
    this.x = width;
    this.w = 20;
    this.speed = 2;
  }
  
  display(){
    fill(255);
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  }
  
  update() {
    this.x -= this.speed;
  }
  
  offscreen() {
    if (this.x < -this.w){
      return true;
    } else {
      return false; 
    }
  }
  
  hit() {
    if (bird.y < this.top || bird.y > height - this.bottom){
      if (bird.x > this.x && bird.x < this.x + this.w){
        return true;
      }
    }
    return false;   
  }
}