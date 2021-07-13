// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    background, createCanvas, ellipse, noFill, stroke, strokeWeight, rect
 */

// Content behind double slashes is a comment. Use it for plain English notes,
// or for code that you want to temporarily disable.

let dvdImage;

function setup(){
  createCanvas(800, 600);
  // Load the image once.
  dvdImage = loadImage("https://cdn.glitch.com/eaea72a4-ac6d-4777-b76e-f37d75959aa5%2Fdvd.jpeg?1515761833387");

  // Set up starting values.
  x = 50;
  y = 50;
  xVelocity = 1;
  yVelocity = 1;
}

function draw(){
  background(220);

  // Check to make sure the image isn't at or over the edge of the screen for horizontal movement.
  if (x > 600) {
    // If it's too far right, make velocity negative
    xVelocity = -1;
  } else if (x < 0) {
    // if it's too far left, make the velocity positive
    xVelocity = 1;
  }

  // Same check, but for vertical movement. Reverse it in either case.
  if (y > 450) {
    yVelocity = -1;
  } else if (y < 0) {
    yVelocity = 1;
  }

  // Move the shape by changing the values of x and y
  x += xVelocity;
  y += yVelocity;

  // Draw the logo at the new position.
  image(dvdImage, x, y, 200, 150);
}