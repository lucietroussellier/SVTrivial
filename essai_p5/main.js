let y = 100;

// The statements in the setup() function
// execute once when the program begins
function setup() {
  // createCanvas must be the first statement
  background(200)
  createCanvas(2000, 1000);
  frameRate(1);
  p1 = new Player(1)
  b= new Board()
  b.resize(min(windowWidth,windowHeight))
  //b.draw()
  //c1 = new Case(0,1,1,[200,100], PI/3)
  //c2 = new Case(0,Case_type.CAMEMBERT)
}
// The statements in draw() are executed until the
// program is stopped. Each statement is executed in
// sequence and after the last line is read, the first
// line is executed again.
function draw() {
  b.draw()
  
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  b.resize(min(windowWidth,windowHeight))
}


function mousePressed() {
    p1.move(p1.position_id+1)
  }