class Player{
    constructor(id_player) {
        this.id = id_player;
        
        this.camenbert_list = [];
        this.position_id = 0 
        this.position = [0,0]
        this.fr = 20
        this.r = 40
        // red = 0 ,yellow = 1 , pink = 2, blue = 3 , green = 4, orange = 5, brown = 6
        this.camembert_color = [ color('yellow'), color('pink'), color('blue'), color('green'), color('orange'), color('brown')]
        this.color_list = [color('red'), color('yellow'), color('green'), color('blue'), color('orange'), color('brown'), color('black')]
        
      }
      resize(mindim)
      {
          this.r = mindim/this.fr
          // position est mis à jour dans game 
      }

    draw(){
      push()
      translate(this.position[0],this.position[1])
      strokeWeight(2);
      stroke(this.color_list[this.id]);
      fill(color(red(this.color_list[this.id]),green(this.color_list[this.id]),blue(this.color_list[this.id]),100));
      for (let i =0;i<6;i++){
        if (i < this.camenbert_list.length){
          //print("dans plr",this.camenbert_list)
          //print(i,"dans la camembert liste", this.camenbert_list[i], "ce qui fait : ",this.camembert_color[this.camenbert_list[i]] )
          let cam_color = this.camembert_color[this.camenbert_list[i]-1]
          fill(color(red(cam_color),green(cam_color),blue(cam_color),255))
          //fill(this.color_list[this.camenbert_list[i]])
          arc(0, 0, this.r,this.r, PI/3*i , PI/3*(i+1),PIE);
          fill(color(red(this.color_list[this.id]),green(this.color_list[this.id]),blue(this.color_list[this.id]),100));
      
        }
        else{
          arc(0, 0, this.r,this.r, PI/3*i , PI/3*(i+1),PIE);
        }
      }
      pop()
      
    }

    move(m_case) {
        this.position_id = m_case.id
        this.position = m_case.position
        
      }
}
