class Game{
    constructor(){
        
        this.state = State.DICE 
        this.dice = new Dice()
        this.board = new Board()
        this.board.resize(min(windowWidth,windowHeight))
        
        this.nbJoueur = 3 // probable que ça deviennent un arg
        this.crt_player = 0
        this.list_joueur = []
        for (let i = 0; i<this.nbJoueur ; i++){
            let plr = new Player(i)
            plr.position_id = 72
            plr.position = this.board.list_case[plr.position_id].position
            this.list_joueur.push(plr)
            
        }
       
        this.possible_case = []
        
        this.deck = new Deck()
        this.deck_ready = false 
        //this.state = State.QUESTION
        const game_this = this
        this.bonne_reponse_button = createButton('bonne réponse');
        this.bonne_reponse_button.position(800, 80);
        this.bonne_reponse_button.mousePressed(this.bonne_reponse.bind(this));
        this.bonne_reponse_button.hide();
        // b.highlight_possible_case(4,3)
        
        this.mauvaise_reponse_button = createButton('mauvaise réponse');
        this.mauvaise_reponse_button.position(800, 100);
        this.mauvaise_reponse_button.mousePressed(this.mauvaise_reponse.bind(this));
        this.mauvaise_reponse_button.hide();
    }
    bonne_reponse(){
        // ici .. on doit check si on gagne un camembert !
        if(this.board.list_case[this.list_joueur[this.crt_player].position_id] instanceof CaseCamembert){

           
            let case_category = this.board.list_case[this.list_joueur[this.crt_player].position_id].category
            //print("On gagne un camemebert", case_category)
            if (!this.list_joueur[this.crt_player].camenbert_list.includes(case_category)){
                //print(case_category)
                this.list_joueur[this.crt_player].camenbert_list.push(case_category)
                //print("dans game",this.list_joueur[this.crt_player].camenbert_list)
            }
        }
        if(this.board.list_case[this.list_joueur[this.crt_player].position_id] instanceof CaseCentre){
            if( this.list_joueur[this.crt_player].camenbert_list.length==6){
                print(this.list_joueur[this.crt_player].id, "WIN THE GAME !")
                this.state = State.END
            }
        }
        this.state = State.DICE

    }
    mauvaise_reponse(){
        this.crt_player = (this.crt_player+1)%this.nbJoueur
        this.state = State.DICE
    }

    resize(){
        this.board.resize(min(windowWidth,windowHeight))
        for (const plr of this.list_joueur){
            plr.resize(min(windowWidth,windowHeight))
            plr.position = this.board.list_case[plr.position_id].position
        } 
        
    }
    draw(){
        /*
        console.log(this.deck.d);
        if (!this.deck_ready){
            this.deck_ready = true
            this.deck.prepare()
        }*/
        this.board.draw()
        for (const plr of this.list_joueur){
            plr.draw()
        } 
        this.dice.draw()
        

        //print("State", this.state)
        switch (this.state) {
            case State.END:
                // TODO esthetique    
            break
            case State.QUESTION:
                //print(this.deck.list_card[this.deck.crt_index])
                this.deck.list_card[this.deck.crt_index].draw()

                //this.deck.list_card[this.deck.crt_index].affiche_question = true
                //this.deck.list_card[this.deck.crt_index].affiche_reponse = false

                if (this.deck.list_card[this.deck.crt_index].animate_done==true){
                    this.deck.list_card[this.deck.crt_index].animate_done=false
                    //this.deck.list_card[this.deck.crt_index].affiche_question = false
                    //this.deck.list_card[this.deck.crt_index].affiche_reponse = true
                    this.state= State.REPONSE
                    this.bonne_reponse_button.show()
                    this.mauvaise_reponse_button.show()
                }
            break
            case State.REPONSE:
                this.deck.list_card[this.deck.crt_index].draw()
                //this.deck.list_card[this.deck.crt_index].draw()
                //this.deck.list_card[this.deck.crt_index].affiche_question = false
                //this.deck.list_card[this.deck.crt_index].affiche_reponse = true
                if (this.deck.list_card[this.deck.crt_index].animate_done==true){
                    this.deck.list_card[this.deck.crt_index].animate_done=false
                    //this.deck.list_card[this.deck.crt_index].affiche_question = true
                    //this.deck.list_card[this.deck.crt_index].affiche_reponse = false
                    this.state= State.QUESTION
                    this.bonne_reponse_button.hide()
                    this.mauvaise_reponse_button.hide()
                }
                break
            default:
                this.bonne_reponse_button.hide()
                this.mauvaise_reponse_button.hide()
                break
        }

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
                //print(crt_min_dist)
                if (crt_min_dist < 2000){
                    //console.log("la case la plus près : ", this.board.list_case[this.possible_case[index_min_dist]])
                    this.board.stop_higlight()
                    this.list_joueur[this.crt_player].move(this.board.list_case[this.possible_case[index_min_dist]])
                    
                    if (this.board.list_case[this.possible_case[index_min_dist]].category==0){
                        //on rejoue direct 
                        this.state = State.DICE  
                    
                    } 
                    else{
                        /*if (this.board.list_case[this.possible_case[index_min_dist]] instanceof CaseCentre) {
                            print("on est au centre ")
                            if (this.list_joueur[this.crt_player].camenbert_list.length==6){
                                print("tentative de win avec 4 bonnes reponses sur 6")
                                //this.state = State.WINTRY  
                            } else
                            {
                                print("on choisit la couleur")
                            }
                         }*/
                        this.deck.list_card[this.deck.crt_index].affiche_question= true
                        this.deck.list_card[this.deck.crt_index].animate = true
                        this.deck.list_card[this.deck.crt_index].animate_done = false
                        this.state = State.QUESTION 
                        
                    }
                    
                }
                break;

            case State.QUESTION:
                // on a cliqué alors qu'on est en state QUESTION .. on veut donc afficher les reponses 
                //print("click en state QUESTION")
                //this.deck.list_card[this.deck.crt_index].affiche_reponse = true
                //this.deck.list_card[this.deck.crt_index].affiche_question = false
                    
                break;
            case State.REPONSE:
                //this.deck.list_card[this.deck.crt_index].affiche_question = true
                //print("click en state REPONSE")
                //this.crt_player = (this.crt_player+1)%this.nbJoueur
                //this.state = State.DICE
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
    REPONSE: 3,
    END: 4
    //WINTRY : 4

}