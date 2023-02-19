class Game{
    constructor(){
        this.nbJoueur = 1 // probable que ça deviennent un arg
        this.state = State.DICE 
        this.dice = new Dice()
        this.board = new Board()
        this.board.resize(min(windowWidth,windowHeight))
        this.crt_player = 0
        
        
        this.list_joueur = []
        for (let i = 0; i<this.nbJoueur ; i++){
            let plr = new Player(i)
            plr.position_id = 72
            plr.position = this.board.list_case[plr.position_id].position
            this.list_joueur.push(plr)
            
        }
       
        this.possible_case = []
        

        
        // b.highlight_possible_case(4,3)
    }
    resize(){
        this.board.resize(min(windowWidth,windowHeight))
        for (const plr of this.list_joueur){
            plr.resize(min(windowWidth,windowHeight))
            plr.position = this.board.list_case[plr.position_id].position
        } 
        
    }
    draw(){
        
        this.board.draw()
        for (const plr of this.list_joueur){
            plr.draw()
        } 
        this.dice.draw()
    }
    mousePressed(){
        switch (this.state) {
            case State.DICE:
                this.dice.roll()
                this.possible_case = this.board.highlight_possible_case(this.list_joueur[this.crt_player].position_id, this.dice.value)
                //print(this.possible_case)
                this.state = State.MOVE
                break;
            case State.MOVE:
                // de quelle case parmi les possibles on a cliqué le plus près ? 
                let index_min_dist = -1
                let crt_min_dist = 9999999999
                for(let i=0;i<this.possible_case.length;i++){
                    let mdist =  (this.board.list_case[this.possible_case[i]].position[0]-mouseX)*(this.board.list_case[this.possible_case[i]].position[0]-mouseX) + (this.board.list_case[this.possible_case[i]].position[1]-mouseY)*(this.board.list_case[this.possible_case[i]].position[1]-mouseY)
                    //print(this.board.list_case[i].position, mouseX,mouseY,mdist)
                    if (mdist < crt_min_dist) {index_min_dist = i; crt_min_dist = mdist} 
                }
                print(crt_min_dist)
                if (crt_min_dist < 2000){
                    //console.log("la case la plus près : ", this.board.list_case[this.possible_case[index_min_dist]])
                    this.board.stop_higlight()
                    this.list_joueur[this.crt_player].move(this.board.list_case[this.possible_case[index_min_dist]])
                    this.state = State.DICE // pour les tests on revient en 1/ 
                }
                break;

            case State.QUESTION:
                break;
            case State.REPONSE:
                break;
            default:
                console.log("Connait pas ce state")
        }
    }
    /*
l'idée, c'est une suite de state : 
1/ le joueur doit lancer les dès
2/ déplacement du pion du joueur 
3/ question 
4/ reponse
5/ validation
vrai/faux => retour en 1 avec le bon num de joueur 
*/
}

const State = {
    DICE: 0,
    MOVE: 1,
    QUESTION: 2,
    REPONSE: 3

}