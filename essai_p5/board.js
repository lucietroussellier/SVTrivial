
class Board{
    constructor() {
        this.list_case = []
        
        this.adj_case = []
        this.W = 800
        this.H = 400
        this.init()
        this.init_adj_case()
      }

    get_case_from(id_start_case, mvt_count, noreturn=0, res = []){
        if( mvt_count==0){
            res.push(id_start_case)
            return
        }
        for (const el of this.adj_case[id_start_case]){ 
            if (el != noreturn){
                this.get_case_from(el, mvt_count-1,id_start_case, res = res)
            }
        }
    }

    highlight_possible_case(id_start_case, mvt_count){
        var ids_possible_case=[]
        this.get_case_from(id_start_case, mvt_count,0,ids_possible_case)
        console.log(ids_possible_case)
        for (const el of ids_possible_case){
            this.list_case[el].animate_state = true
            console.log("OAL",this.list_case[el].animate_state)
        }
        
    }

    init_adj_case()
    {
        let adjcase =[]
        for (let i = 0 ; i<42;i++){
            adjcase.push([i!=0 ? i-1 : 41,i!=41 ? i+1 : 0])
            if ((i-3)%7==0) // Camembert
                {
                    adjcase[adjcase.length-1].push(66+Math.floor(i/7))
                }
        }
        for (let i = 42 ; i<72;i++){
            adjcase.push([i>=48 ? i-6 : 72, i<66 ? i+6 : 3+(i-66)*7])
        }
        adjcase.push([42,43,44,45,46,47])

        this.adj_case = adjcase
    }

    resize(mindim){

        let centre = [mindim/2, mindim/2]
        let rayon = [mindim/3]
        for (const el of this.list_case){
            if (el instanceof CaseNormale || el instanceof CaseCamembert ){
                
                let x = centre[0] + rayon*Math.cos(el.angle)
                let y = centre[1] + rayon*Math.sin(el.angle)
                el.position = [x,y]
            }
            else if (el instanceof CaseRect){
                let x = centre[0] + el.fr*rayon*Math.cos(el.angle)
                let y = centre[1] + el.fr*rayon*Math.sin(el.angle)
                el.position = [x,y]
            }

            else if (el instanceof CaseCentre){
                el.position=centre
            }
            
            el.resize(mindim)
          }
    }
    init(){
        let crt_rad = +PI/48
        let centre = [this.W/2, this.H/2+this.H/10]
        let rayon = [min(this.W/2,this.H/2)]
        
        // yellow = 1 , white = 0 , pink = 2, blue = 3 , green = 4, orange = 5, brown = 6
        let category_color = [1,0,2,3,2,0,4,5,0,1,6,1,0,2,3,0,5,4,5,0,1,6,0,3,2,3,0,5,4,0,6,1,6,0,3,2,0,4,5,4,0,6]
        //let category_color_line = [0,1,3,6,2,3,1,2,6,4,1,2,5,3,4,5,2,4,3,6,2,4,1,5,6,1,4,6,5,3,1,1,1,1,1,1,1,2,2,2,2,2,2]
        let category_color_line = [6,4,2,1,5,3,5,3,6,4,2,1,1,5,3,6,4,2,4,2,1,5,3,6,2,1,5,3,6,4]
        for (let i = 0; i < 42; i++) {
            
            if ((i-3)%7==0){
                crt_rad = crt_rad - PI/24 -PI/48
                //console.log("CRT_RAD = ",crt_rad/PI*180, "case camembert")
                let x = centre[0] + rayon*Math.cos(crt_rad)
                let y = centre[1] + rayon*Math.sin(crt_rad)
                this.list_case.push(new CaseCamembert(i,category_color[i],[x,y],crt_rad))
                crt_rad = crt_rad - PI/48
            }
            else{
                crt_rad = crt_rad - PI/24
                //console.log("CRT_RAD = ",crt_rad/PI*180, "case normal")
                let x = centre[0] + rayon*Math.cos(crt_rad)
                let y = centre[1] + rayon*Math.sin(crt_rad)
                this.list_case.push(new CaseNormale(i,category_color[i],[x,y],crt_rad))
            }
        }
        for (let j = 0; j<5 ;j++){
            
            for (let i = 0; i<6 ;i++)
            {
                let x = centre[0] + (0.5+0.66*1/5*(j+1))*rayon*Math.cos(-PI/6-i*PI/3) 
                let y = centre[1] + (0.5+0.66*1/5*(j+1))*rayon*Math.sin(-PI/6-i*PI/3)
                this.list_case.push(new CaseRect(i+42+j*6,category_color_line[i+j*6],[x,y],-PI/6-i*PI/3,(0.24+0.66*1/5*j)))
            }
        }


        this.list_case.push(new CaseCentre(72,1,centre))
        
    }
    draw(){
        for (const el of this.list_case){
            el.draw()
        }

    }
    
}

const assert = function(condition, message) {
    if (!condition)
        throw Error('Assert failed: ' + (message || ''));
};

const getCatColor= function(i){
    // yellow = 1 , white = 0 , pink = 2, blue = 3 , green = 4, orange = 5, brown = 6
    const color_array = [color('white'),color('yellow'),color('pink'),color('blue'),color('green'),color('orange'),color('brown')];
    return color_array[i]
}
class Case{
    constructor(id, category, position, angle){
        this.id = id
        this.category = category
        this.position = position
        this.angle = angle

        this.animate_state = false
        this.anim_factor = true // true,on augmente, false on diminue
        this.anim_cnt = 0
    }
    animate(){
        if (this.anim_cnt==30) { this.anim_factor = false }
        if (this.anim_cnt==0) { this.anim_factor = true }
        this.anim_factor ? this.anim_cnt+=5 : this.anim_cnt-=5
        
    }
    
}
class CaseCamembert extends Case{
    constructor(id, category, position, angle) {
        super(id, category, position, angle)
        // gerer les resizes
        this.fW = 12
        this.fH = 12
        this.w = min(windowWidth, windowHeight)/this.fW
        this.h = min(windowWidth, windowHeight)/this.fH
    }
    resize(mindim)
    {
        this.w = mindim/this.fW
        this.h = mindim/this.fH
    }

    draw(){
        //console.log("Case Draw : ", this.position, this.angle) 
        //let w = min(windowWidth/12, windowHeight/12)
        //let h =  min(windowWidth/12, windowHeight/12)
        let w = this.w
        let h = this.h
        push()
       
        fill(getCatColor(this.category))
        translate(this.position[0],this.position[1])
        rotate(this.angle+PI/2);
        if (this.animate_state){
            this.animate()
            scale(1+this.anim_cnt/100);
        }
        beginShape();
        vertex(w/2, -h*30/64);
        vertex(0, -h/2);
        vertex(-w/2,  -h*30/64);
        vertex(-w*3/8, h/2);
        vertex(0, h*33/64);
        vertex(w*3/8, h/2);
        endShape(CLOSE);
        fill(0)
        text(this.id,0,0);
        pop()
        
    }
}
class CaseNormale extends Case{
    constructor(id, category, position, angle) {
        super(id, category, position, angle)
        // gerer les resizes
        this.fW = 24
        this.fH = 12
        this.w = min(windowWidth, windowHeight)/this.fW
        this.h = min(windowWidth, windowHeight)/this.fH
    }
    resize(mindim)
    {
        this.w = mindim/this.fW
        this.h = mindim/this.fH
    }
    draw(){
        //console.log("Case Draw : ", this.position, this.angle) 
        //let w = 28
        //let h = 60
        //let w = min(windowWidth/24, windowHeight/24)
        //let h = min(windowWidth/12, windowHeight/12)
        let w = this.w
        let h = this.h
        push()
        
        
        fill(getCatColor(this.category))
        translate(this.position[0],this.position[1])
        rotate(this.angle+PI/2);
        if (this.animate_state){
            this.animate()
            scale(1+this.anim_cnt/100);
        }
        beginShape();
        vertex(w*10/18, -h*31/64);
        vertex(0, -h/2);
        vertex(-w*10/18,  -h*31/64);
        vertex(-w*3/8, h/2);
        vertex(0, h*63/128);
        vertex(w*3/8, h/2);
        endShape(CLOSE);
        fill(0)
        text(this.id,0,0);
        pop()
        
    }
}

class CaseRect extends Case{
    constructor(id, category, position, angle, fac_rayon) {
        super(id, category, position, angle)
         // gerer les resizes
         this.fr = fac_rayon
         this.fW = 16
         this.fH = 30
         this.w = min(windowWidth, windowHeight)/this.fW
         this.h = min(windowWidth, windowHeight)/this.fH
    }
    resize(mindim)
    {
        this.w = mindim/this.fW
        this.h = mindim/this.fH
    }
    draw(){
        //console.log("Case Draw : ", this.position, this.angle) 
        //let w = 45
        //let h = 25
        //let w = min(windowWidth/16, windowHeight/16)
        //let h = min(windowWidth/30, windowHeight/30)
        let w = this.w
        let h = this.h
        push()
        
        fill(getCatColor(this.category))
        translate(this.position[0],this.position[1])
        rotate(this.angle+PI/2);
        if (this.animate_state){
            this.animate()
            scale(1+this.anim_cnt/100);
        }
        beginShape();
        vertex(-w/2, -h/2);
        vertex(w/2, -h/2);
        vertex(w/2,  h/2);
        vertex(-w/2, h/2);
        endShape(CLOSE)
        fill(0)
        text(this.id,0,0);
        pop()
        
    }
}
class CaseCentre extends Case{
    constructor(id, category, position) {
        super(id,category, position)
        this.fr = 16
        this.r =  min(windowWidth, windowHeight)/this.fr
    }
    resize(mindim)
    {
        this.r = mindim/this.fr
        
    }
    draw(){
        //let r = 44
        //let r = min(windowWidth/16, windowHeight/16)
        let r = this.r
        push()
        scale(1);
        fill(200)
        translate(this.position[0],this.position[1])
        beginShape();
        vertex(r, 0);
        vertex(r*cos(PI/3), r*sin(PI/3));
        vertex(r*cos(2*PI/3), r*sin(2*PI/3));
        vertex(-r, 0);
        vertex(r*cos(4*PI/3), r*sin(4*PI/3));
        vertex(r*cos(5*PI/3), r*sin(5*PI/3));
        
        endShape(CLOSE)
        fill(0)
        text(this.id,0,0)
        pop()

    }
}