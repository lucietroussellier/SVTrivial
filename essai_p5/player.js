class Player{
    constructor(id_player) {
        this.id = id_player;
        
        this.camenbert_list = [];
        this.position_id = 0 
        this.fr = 20
        this.r = 40
      }
      resize(mindim)
      {
          this.r = mindim/this.fr
          
      }
    draw(){
      push()
      translate(200,200)
      
      strokeWeight(2);
      stroke(color('red'));
      fill('rgba(255, 30, 20,0.5)');
      for (let i =1;i<=6;i++){
        arc(0, 0, this.r,this.r, PI/3*i , PI/3*(i+1),PIE);
      }
      pop()
      
    }

    move(id_case) {
        this.position_id = id_case
        
      }
}
