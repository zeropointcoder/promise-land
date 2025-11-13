// Dice Roller Game

import { stdin, stdout } from 'process'
import readline from 'readline'

// Dice class
class Dice {
    constructor(sides=6) {
        this.sides = sides
    }

    roll() {
        return Math.floor(Math.random() * this.sides) + 1
    }
}

// Player class
class Player {
    constructor(name) {
        this.name = name
        this.score = 0
    }

    addScore(points) {
        this.score += points
    }
}

// Game class
class DiceGame {
    constructor() {
        this.players = []
        this.dice = new Dice(6)
        this.rounds = 3
        this.currentRound = 1
    }

    async start() {
        console.log(`Welcome to the Dice Roller game!`)
        await this.setupPlayers()

        console.log(`Starting game with ${this.players.length} player(s)...`)
        await this.playGame()

        this.showResults()
        this.rl.close()
    }

    createInterface() {
        this.rl = readline.createInterface({
            input: stdin,
            output: stdout
        })
    }

    askQuestion(query) {
        return new Promise(resolve => this.rl.question(query, answer => resolve(answer)))
    }

    async setupPlayers() {
        this.createInterface()
        let numPlayers = await this.askQuestion(`Enter number of players: `)
        numPlayers = parseInt(numPlayers)

        for(let i=0; i<numPlayers; i++) {
            const name = await this.askQuestion(`Enter name for Player ${i+1}: `)
            this.players.push(new Player(name || `Player ${i+1}`))
        }
    }

    async playGame() {
        while(this.currentRound <= this.rounds) {
            console.log(`\n<---Round ${this.currentRound}--->`)

            for(let player of this.players) {
                await this.askQuestion(`Press ENTER for ${player.name} to roll the dice...`)
                const roll = this.dice.roll()
                player.addScore(roll)
                console.log(`${player.name} rolled a ${roll}! (Total score: ${player.score})`)
            }

            this.currentRound++
        }
    }

    showResults() {
        console.log(`\nFinal results: `)
        this.players.sort((a,b) => b.score - a.score)

        this.players.forEach((player, index) => {
            console.log(`${index+1}. ${player.name} - ${player.score} points!`)
        })

        const winner = this.players[0]
        console.log(`\nWinner: ${winner.name} with ${winner.score} points!`)
    }
}

const game = new DiceGame()
game.start()