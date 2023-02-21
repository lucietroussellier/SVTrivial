class Card
{
    constructor(){
        this.list_question = [] // 6 questions par cartes ..1 par catégorie
        this.niveau = 6 // par exemple pour 6eme => ça determinera la couleur du bord 
        this.color_list = [color('red'), color('yellow'), color('green'), color('blue'), color('orange'), color('brown'), color('black')]
    }
    draw()
    {
        //fontbold = loadFont('assets/Bold.ttf')
        //print("OLA", this.list_question)
        //print(this.list_question[0])
        //print(this.list_question[0][1])
        let s = this.list_question[0][1]
        //Pour les tests graphique minimaliste .. jsute la valeur
        push()
        // Les bords .. 
        let w =  max(windowWidth,windowHeight)/2
        let h = min(windowWidth,windowHeight)/2
        fill('orange')
        rect(0, 0, w, h, windowWidth/100);
        fill('white')
        rect(w/20, h/20, w*18/20, h*18/20, windowWidth/100);
        // les containers de questions 

        // un recap de l categorie de la question
        for (let i=1;i<7;i++)
        {
            fill(this.color_list[i-1])

            arc(w/4, i*h/7, w/12, h/10, 4*PI/5, 6*PI/5,PIE)
            textSize(20)
            
            fill(color('black'))
            //textFont(fontBold);
            text(this.list_question[i-1][1], w/4+w/10,i*h/7+h/80)
            if (i!=6){
                stroke(220);
                line(w/6, i*h/7+(1/2)*h/7, 5*w/6, i*h/7+(1/2)*h/7);
            }
            noStroke();
        }
        //scale(2)
        //fill('black')
        //text(s, 400, 100);
        pop()
    }
}

class Deck
{
    constructor(){
        this.list_card = []
        this.d = []
        this.createCards()  
        this.crt_index = 0  
        this.affiche_question = false
    }
    createCards(){
        var data = []
        CSV.fetch({
            url: "https://raw.githubusercontent.com/lucietroussellier/SVTrivial_data/master/2023_test.csv"
            }
        ).then(dataset =>  {
          // dataset object doc'd below
          //console.log(dataset);
          //this.flag_DL = true
          //data = dataset
          this.d = dataset
          this.prepare()
        });
        
    }
    prepare(){
        //console.log(this.d["records"]);
        let list_questions_by_categories = [[],[],[],[],[],[]]
        for (let row of this.d["records"]){
            list_questions_by_categories[row[0]].push(row)
        }
        let nbquestion = this.d["records"].length
        let nbcard = Math.floor(nbquestion/6)

        for (let c=0;c<nbcard;c++){
            let m_card = new Card()
            for (let cat=0;cat<6;cat++){
                m_card.list_question.push(list_questions_by_categories[cat][Math.floor(Math.random() * list_questions_by_categories[cat].length)])
            }
            this.list_card.push(m_card)
        }
        //print(this.list_card)
    }
    
    draw(){
        if  (this.affiche_question){
            //print("on veut afficher la carte")
            this.list_card[0].draw()
        }
    }

}

