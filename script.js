let brushHue, bird;
var pipes = [];
var lives;

function preload(){
  img = loadImage("https://cdn.glitch.com/2b8c969e-41ae-4b1e-994d-657490c55f16%2Fsky2.jpeg?v=1627504010156");
  life1 = loadImage("https://cdn.glitch.com/2b8c969e-41ae-4b1e-994d-657490c55f16%2Ff0da2add-ad1f-4f40-a83a-8d71fcb6b401.image.png?v=1627506099309");
life2 = loadImage("https://cdn.glitch.com/2b8c969e-41ae-4b1e-994d-657490c55f16%2Ff0da2add-ad1f-4f40-a83a-8d71fcb6b401.image.png?v=1627506099309");
life3 = loadImage("https://cdn.glitch.com/2b8c969e-41ae-4b1e-994d-657490c55f16%2Ff0da2add-ad1f-4f40-a83a-8d71fcb6b401.image.png?v=1627506099309");

}
  function setup() {
  // Canvas & color settings
  createCanvas(400,600);
  colorMode(HSB, 255, 255);
  bird = new Bird();
  pipes.push(new Pipe());
  score = 0;
  lives = 3;
  
}

function draw() {
  background(img);
  bird.show();
  bird.update();
  displayScore();    
  displayLives();
  
  if (lives <= 0){
    gameOver();            
  }
  
  if (frameCount % 100 == 0){
    pipes.push(new Pipe());
  }
  
  for (let i = pipes.length - 1; i >= 0; i--){
    pipes[i].display();
    pipes[i].update();
    
      if (pipes[i].hit(bird)){
        pipes[i].hue = 0;  
        lives -= 0.1;
      } else if (pipes[i].miss(bird)){
        score += 0.1;
        
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
    
    fill(this.hue, 0, 0);  
    circle(this.x + 3, this.y, 2);

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
  if (keyCode === ENTER){
    restartGame();
  }
}



 
class Pipe {
  constructor(){
  this.top = random(height/2);
    this.bottom = random(height/2);
    this.x = width;
    this.w = 20;
    this.speed = 2;
    this.hue = 228;
    this.sat = 60;
    this.brightness = 100;
  }
  
  display(){
    fill(this.hue, this.sat, this.brightness );
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
    } else {
      return false;          
    }
  
  }
  miss() {
    if (bird.y > this.top && bird.y < height - this.bottom){
      if (bird.x > this.x && bird.x < this.x + this.w){
        return true;
      }
    }
    return false;
  }
}

function displayScore() {
  fill(0);
  strokeWeight(1);
  text (`Score: ${round(score)}`, 20, 20);    
}

function displayLives() {
  image(life1, 20, 30, 20, 20);
  image(life2, 40, 30, 20, 20);
  image(life3, 60, 30, 20, 20);
  
  
    fill(0);
  strokeWeight(1);
  text (`Lives: ${round(lives)}`, 20, 60);  
}
   
function gameOver() {
    strokeWeight(1);
  textAlign(CENTER);
  stroke(0);
  fill(0);
  text(`Game Over`, width/2, height/2);
  noLoop();
}       

function restartGame() {
  score = 0;
  lives = 3;
  
}