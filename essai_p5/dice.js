class Dice
{
    constructor()
    {this.value = 0}
    roll(){
        this.value = Math.floor(Math.random() * 6)+1
    }
    draw()
    {
        //Pour les tests graphique minimaliste .. jsute la valeur
        push()
        scale(4)
        text(this.value, 20, 30);
        pop()
    }
}