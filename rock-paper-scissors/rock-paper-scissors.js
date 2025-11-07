import readline from 'readline'

class RockPaperScissors {
    constructor() {
        this.choices = ['rock', 'paper', 'scissors']
    }

    getComputerChoice() {
        const randomIndex = Math.floor(Math.random() * this.choices.length)
        return this.choices[randomIndex]
    }

    determineWinner(player, computer) {
        if(player === computer) return `It's a tie!`
        const wins = { rock: 'scissors', paper: 'rock', scissors: 'paper'}
        return wins[player] === computer ? 'You win!' : 'Computer wins!'
    }

    playRound(playerChoice) {
        if(!this.choices.includes(playerChoice)) {
            return `Invalid choice! Please enter rock, paper or scissors.`
        }
        const computerChoice = this.getComputerChoice()
        const result = this.determineWinner(playerChoice, computerChoice)

        return `You chose ${playerChoice}, computer chose ${computerChoice}; ${result}`
    }
}

// Interactive console setup
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const game = new RockPaperScissors()

function askUser() {
    rl.question('Enter your choice (rock, paper or scissors): ', (answer) => {
        console.log(game.playRound(answer))
        console.log() // Empty line for readability

        rl.question('Play again? (y/n): ', (resp) => {
            if(resp === 'y') 
                askUser()
            else {
                console.log('Thanks for playing!')
                rl.close()
            }
        })
    })
}

console.log('Welcome to Rock-Paper-Scissors!')
askUser()