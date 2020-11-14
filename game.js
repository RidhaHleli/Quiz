const question = document.querySelector('#question');
const Choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptAnswers = true
let score = 0
let questionCounter = 0
let availableQuestion = []

let questions = [{
        question: "What is 2 + 2?",
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        answer: 2,
    },
    {
        question: "The tallest building in the world is located in wich city?",
        choice1: "Dubai",
        choice2: "New York",
        choice3: "Shangai",
        choice4: "None of the above",
        answer: 1,
    },
    {
        question: "What percent of America adults believe that chocolate milk comes from brown cows?",
        choice1: "20%",
        choice2: "18%",
        choice3: "7%",
        choice4: "33%",
        answer: 2,
    },
    {
        question: "Approximately what percent of U.S. power outages are caused by squirrels",
        choice1: "10-20%",
        choice2: "5-10%",
        choice3: "15-20%",
        choice4: "20-30%",
        answer: 1,
    },
]

const SCORE_POINTS = 1
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestion = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestion.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTION}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionIndex = Math.floor(Math.random() * availableQuestion.length)
    currentQuestion = availableQuestion[questionIndex]
    question.innerText = currentQuestion.question

    Choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestion.splice(questionIndex, 1)

    acceptAnswers = true
}

Choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptAnswers) return

        acceptAnswers = false
        const selectChoice = e.target
        const selectAnswer = selectChoice.dataset['number']

        let classToApply = selectAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)

        }

        selectChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectChoice.parentElement.classList.remove(classToApply)

            getNewQuestion()
        }, 1000)
    })
})


incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()