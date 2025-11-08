// Coin Toss Simulator
// Run with: node coinTossSimulator.js

import readline from 'readline'

class CoinTossSimulator {
    constructor() {
        this.heads = 0
        this.tails = 0
    }

    // Simulate one coin toss
    toss() {
        const result = Math.random() < 0.5 ? 'Heads' : 'Tails'

        if(result === 'Heads') this.heads++
        else this.tails++

        return result
    }

    // Run multiple tosses
    simulate(num) {
        console.log(`\nSimulating coin toss ${num > 1 ? 'es' : ''}...\n`)
        for(let i=0; i<num; i++) {
            console.log(`Toss ${i+1}: ${this.toss()}`)
        }
        this.showResults()
    }

    // Display final statistics
    showResults() {
        const total = this.heads + this.tails
        console.log(`\n<=== Results ===>`)
        console.log(`Heads: ${this.heads}`)
        console.log(`Tails: ${this.tails}`)
        console.log(`Total: ${total}`)
        console.log(`Heads %: ${(this.heads/total * 100).toFixed(2)}%`)
        console.log(`Tails %: ${(this.tails/total * 100).toFixed(2)}%`)
    }
}

// Console input setup
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// Prompt user for number of tosses
rl.question('Enter number of coin tosses to simulate: ', (answer) => {
    const num = parseInt(answer)

    if(isNaN(num) || num <= 0) {
        console.log('Please enter a valid positive number.')
    } else {
        const simulator = new CoinTossSimulator()
        simulator.simulate(num)
    }

    rl.close()
})