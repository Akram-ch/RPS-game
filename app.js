class Game{
    constructor(cpu, player, text){
        this.round = 0;
        this.cpuScore = 0;
        this.playerScore = 0;
        this.playerMove = null;
        this.cpuMove = null;
        this.cpuScoreElement = cpu;
        this.playerScoreElement = player;
        this.textElement = text;
        this.gameOver = false;
        
    }

    wait(){
        return new Promise(resolve => setTimeout(resolve, 2000));
    }
    reset(){
        this.gameOver = false;
        this.round = 0;
        this.cpuScore = 0;
        this.playerScore = 0;
        this.textElement.innerHTML = "<p>Select a move to start the game</p>";
        this.updateScore(0, 0);
    }

    play(){
        if (!this.gameOver){
            this.cpuChoose();
            this.textElement.innerHTML = "<p>You chose " + this.playerMove + " and the computer chose " + this.cpuMove+"</p>";
            this.assess();
            this.updateScore(this.cpuScore, this.playerScore);
            if (this.playerScore === 3){
                this.textElement.innerHTML ="<p>You win! your intelligence is remarkable.</p>";
                this.gameOver = true;
            }
            else if (this.cpuScore ===3){
                this.textElement.innerHTML ="<p>You lose... Bummer :/ </p>";
                this.gameOver = true;
            }
        }
    }

    playerChoose(move){
        switch(move){
            case 'rock':
                this.playerMove = 'rock';
                break;
            case 'paper':
                this.playerMove ='paper';
                break;
            case 'scissors':
                this.playerMove = 'scissors';
                break;
        }
        this.play();
    }

    cpuChoose(){
        const moves = new Array('rock', 'paper', 'scissors');
        const select = Math.floor(Math.random() * 3);
        this.cpuMove = moves[select];
    }

    assess(){
        if (this.playerMove === 'rock'){
            switch(this.cpuMove){
                case 'rock':
                    break;
                case 'paper':
                    this.cpuScore++;
                    break;
                case 'scissors':
                    this.playerScore++;
                    break;
            }
        }

        else if (this.playerMove === 'paper'){
            switch(this.cpuMove){
                case 'rock':
                    this.playerScore++;
                    break;
                case 'paper':
                    break;
                case 'scissors':
                    this.cpuScore++;
                    break;
            }
        }

        else if (this.playerMove === 'scissors'){
            switch(this.cpuMove){
                case 'rock':
                    this.cpuScore++;
                    break;
                case 'paper':
                    this.playerScore++;
                    break;
                case 'scissors':
                    break;
            }
        }
    }

    updateScore(cpu, player){
        this.cpuScoreElement.innerHTML = cpu;
        this.playerScoreElement.innerHTML = player;
    }
}

const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissors = document.getElementById('scissors');
const text = document.getElementById('text');
const cpu = document.getElementById("cpu");
const player = document.getElementById('player');
const reset = document.getElementById('reset');
game = new Game(cpu, player, text);

rock.addEventListener("click",()=>{
    game.playerChoose('rock');
});

paper.addEventListener("click",()=>{
    game.playerChoose('paper');
});

scissors.addEventListener("click",()=>{
    game.playerChoose('scissors');
})

reset.addEventListener('click', ()=>{
    game.reset();
})