let y = 100;

// The statements in the setup() function
// execute once when the program begins
function setup() {
  // createCanvas must be the first statement
  background(200)
  createCanvas(2000, 1000);
  frameRate(10);

  g = new Game()

  //b.draw()
  //c1 = new Case(0,1,1,[200,100], PI/3)
  //c2 = new Case(0,Case_type.CAMEMBERT)
  
  
}

function draw() {
  clear()
  g.draw()

  
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  g.resize()

}


function mousePressed() {
  g.mousePressed() 
   //d.roll()
    //p1.move(p1.position_id+1)
  }