// List of questions for the quiz
const questions = [
    {
        question: 'What is the capital city of the UK?',
        options: ['London', 'Edinburgh', 'Cardiff', 'Belfast'],
        correctAnswer: 1 // Answer is "London" (1st option)
    },
    {
        question: 'Which of these is the longest river in the UK?',
        options: ['River Thames', 'River Clyde', 'River Mersey', 'River Severn'],
        correctAnswer: 4 // Answer is "River Severn" (4th option)
    },
    {
        question: 'What is the national flower of Wales?',
        options: ['Rose', 'Thistle', 'Daffodil', 'Shamrock'],
        correctAnswer: 3 // Answer is "Daffodil" (3rd option)
    },
    {
        question: 'In which year did the UK vote to leave the European Union?',
        options: ['2015', '2016', '2017', '2018'],
        correctAnswer: 2 // Answer is "2016" (2nd option)
    },
    {
        question: 'Who is known as the - Father of the NHS',
        options: ['Aneurin Bevan', 'Winston Churchill', 'Margaret Thatcher', 'Tony Blair'],
        correctAnswer: 1 // Answer is "Aneurin Bevan" (1st option)
    }
]

// QuizGame class to handle quiz logic
class QuizGame {
    constructor(questions) {
        this.questions = questions // Array of questions
        this.score = 0 // User's score
        this.qIndex = 0 // Index of the current question
    }

    // Display current questions and options
    displayQuestion() {
        const question = this.questions[this.qIndex]
        console.log(`Question ${this.qIndex+1}. ${question.question}`)
        question.options.forEach((option, index) => {
            console.log(`${index+1}. ${option}`)
        });
    }

    // Check if the user's answer is correct
    checkAnswer(answer) {
        const question = this.questions[this.qIndex]
        const corrAns = question.options[question.correctAnswer-1]

        if(question.correctAnswer === answer) {
            console.log('Correct!')
            this.score++
        } else {
            console.log(`Incorrect! The correct answer was ${question.correctAnswer}. ${corrAns}`)
        }
        this.qIndex++
    }

    // Show final score
    showScore() {
        console.log(`You finished the quiz with ${this.score} out of ${this.questions.length}`)
    }

    // Check if there are more questions left
    hasMoreQuestions() {
        return this.qIndex < this.questions.length
    }
}

// Create a new quiz game instance
const quiz = new QuizGame(questions)

// Node.js readline setup to get user input
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// Play the game
function playQuiz() {
    function askQuestion() {
        if(quiz.hasMoreQuestions()) {
            quiz.displayQuestion()
            rl.question("Please enter your answer (1 to 4): ", (userAnswer) => {
                quiz.checkAnswer(parseInt(userAnswer))
                askQuestion()
            })            
        } else {
            quiz.showScore()
            rl.close()
        }
    }
    
    askQuestion()
}

// Start the quiz game
playQuiz()