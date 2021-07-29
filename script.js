let brushHue, bird, score, img, life1, life2, life3;
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
    displayScore();  
  displayLives();
  bird.show();
  bird.update();

  

  
 
  if (lives < 0.5){
    gameOver();            
  }
  if (lifeThree() === true){
    image(life3, 60, 30, 20, 20);  
  } 
  if (lifeTwo() === true){
    image(life2, 40, 30, 20, 20);
  } 
  if (lifeOne() === true){
    image(life1, 20, 30, 20, 20);
  }
  
  if (score <= 5){
    Pipe.top = random(280, 290);
    Pipe.bottom = random(300, 340);
  } else if (score > 5){
    bird.w = 20;
    Pipe.top = random(270,280);
    Pipe.bottom = random(290,310);
  } else if (score > 15){
    bird.w = 25;
  }
    
  
  if (frameCount % 70 == 0){
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
  this.w = 16;
  
  this.gravity = 0.1;
  this.lift = -3;
  this.velocity = 0;
  
  
  this.show = function () {
    fill(this.hue, 100, 100);
    circle(this.x, this.y, this.w);
    
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
    pipes.length = 1;
  }
}

 
class Pipe {
  constructor(){
    this.top = random(240, 290);
    this.bottom = random(305, 420);
    this.x = width;
    this.w = 20;
    this.speed = 2;
    this.hue = 228;
    this.sat = 60;
    this.brightness = 100;
  }
  
  display(){
    fill(this.hue, this.sat, this.brightness);
    rect(this.x, 0, this.w, this.top);
    rect(this.x, this.bottom, this.w,this.bottom);
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
    if (bird.y < this.top || bird.y > this.bottom){
      if (bird.x > this.x && bird.x < this.x + this.w){
        return true;
      }
    } else {
      return false;          
    }
  
  }
  miss() {
    if (bird.y > this.top && bird.y <   this.bottom){
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

function lifeOne() {
  
  if(lives >= 1){
    return true;
  } else if (lives < 1){
    return false;
  }
}

function lifeTwo() {
 if (lives >= 2){
   return true;
 } else if (lives < 2){
   return false;
 }
}

function lifeThree() {
 if (lives >= 3){
   return true;
 } else if (lives < 3){
   return false;
 }
}

function displayLives(){
  fill(0);
  strokeWeight(1);
  text (`Lives: ${round(lives)}`, 20, 60);  
  
}


   
function gameOver() {
    strokeWeight(1);
  fill(0);
  text(`Game Over at ${round(score)}`, 160, height/2);
  noLoop();
}       

function restartGame() {
  score = 0;
  lives = 3; 
  bird.x = width/2;
  bird.y = height/2;
  loop();
}


