const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const timerText = document.querySelector('#timer');
const progressBarFull = document.querySelector('#progressBarFull');


let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let timer = 0
let questionCounter = 0
let availableQuestions = []


let questions = [
    {
        question: 'Who created JavaScript',
        choice1: 'Brian Duckworth',
        choice2: 'Elon Melancholy',
        choice3: 'Ford Ranger',
        choice4: 'Brendon Eich',
        answer: 4,
    },
    {
        question:"Which data type is not supported by Javascript",
        choice1: "Symbol",
        choice2: "Boolean",
        choice3: "Gluten",
        choice4: "Null",
        answer: 3,
    },
    {
        question: "Is JavaScript a case-sensitive lanuage?",
        choice1: "That is a trick question",
        choice2: "Absolutley not",
        choice3: "Potentially",
        choice4: "Yes",
        answer: 4
    },
    {
        question: 'What characters are used to create an array',
        choice1: '[xxx]',
        choice2: '(xxx)',
        choice3: '{xxx}',
        choice4: '+xxx+',
        answer: 1,
    },
    {
        question:"What delicious treat can be used in JavaScript",
        choice1: "Meat",
        choice2: "Cannoli",
        choice3: "Cookie",
        choice4: "Fish",
        answer: 3,
    },
    {
        question: "In what ways can JavaScript code be involved in an HTML file",
        choice1: "inline",
        choice2: "internal",
        choice3: "external",
        choice4: "all of the above",
        answer: 4,
    },
    {
        question: 'What is a common way to define a variable in JavaScript',
        choice1: 'Cots',
        choice2: 'Van',
        choice3: 'Var',
        choice4: 'Eat',
        answer: 3,
    },
    {
        question:"What is the term for storing information on your own computer using JavaScript",
        choice1: "Prison",
        choice2: "Constraphobic",
        choice3: "Local",
        choice4: "Inside",
        answer: 3,
    },
    {
        question: "What does NaN stand for?",
        choice1: "No ant nets",
        choice2: "Negative arrival Neusance",
        choice3: "Not a Number",
        choice4: "Next autonomous Net",
        answer: 3,
    },
    {
        question: "What would be the result of 2+5+'3'?",
        choice1: "30",
        choice2: "10",
        choice3: "73",
        choice4: "None of the above",
        answer: 3,
    }
]

const SCORE_POINTS = 10
const MAX_QUESTIONS = 10
const TIMER_POINTS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    timer = 60
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        if(classToApply === 'incorrect') {
            incrementTimer (TIMER_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 100)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}


incrementTimer = num=> {
timer -=num
timerText.innterText = timer
}



startGame()