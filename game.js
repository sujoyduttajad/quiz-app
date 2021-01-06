const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []


// let questions = fetch("questions.json").then(response => response.json()).then(json => console.log(json));
// //console.log(questions);

let questions = [
    {
        question: 'Who was responsible for the creation of the Night King?',
        choice1: 'The Lord of Light',
        choice2: 'The Children of the Forest',
        choice3: 'The Drowned God',
        choice4: 'The First Men',
        answer: 2,
    },
    {
        question:
            "In the TV show, what was Hodor called before he got his tragic door-holding nickname?",
        choice1: "Wylis",
        choice2: "Horys",
        choice3: "Myrys",
        choice4: "Gladys",
        answer: 1,
    },
    {
        question: "What is the Iron Bank’s representative, played by Mark Gatiss, called?",
        choice1: "Quorin Halfhand",
        choice2: "Xaro Xhoan Daxon",
        choice3: "Howard from the Halifax",
        choice4: "Tycho Nestoris",
        answer: 4,
    },
    {
        question: "Dany’s dragons are (or were) called Drogon, Viserion and ____?",
        choice1: "Dougal",
        choice2: "Vhagar",
        choice3: "Rhaegal",
        choice4: "Balerion",
        answer: 3,
    },
    {
        question: "Who said: 'I don’t plan on knitting by the fire while men fight for me'?",
        choice1: "Lyanna Mormont",
        choice2: "Sansa Stark",
        choice3: "Ser Brienne of Tarth",
        choice4: "Olenna Tyrell",
        answer: 1,
    },
    {
        question: "Which of these characters is dead?",
        choice1: "Jaqen H’Gar",
        choice2: "Nymeria the direwolf",
        choice3: "Hot Pie",
        choice4: "Eddison Tollett",
        answer: 4,
    },
    {
        question: "What is the name of the giant dragon-slaying crossbow that failed to protect King’s Landing?",
        choice1: "Millipede",
        choice2: "The 'You’re Making Me Very Cross(bow)'",
        choice3: "Scorpion",
        choice4: "Mantis",
        answer: 3,
    },
    {
        question: "Where is the House of Black and White, the training temple of the Faceless Men?",
        choice1: "Qarth",
        choice2: "Braavos",
        choice3: "Meereen",
        choice4: "No one knows",
        answer: 2,
    },
    {
        question: "What was the Red Keep’s chief mouser (RIP) called?",
        choice1: "Ser Pounce",
        choice2: "Maester Paw",
        choice3: "Lady Claws, first of her name, breaker of mice, protector of the realm",
        choice4: "The Bastard",
        answer: 1,
    },
    {
        question: "What is the name of Arya’s sword?",
        choice1: "Ice",
        choice2: "Pointy",
        choice3: "Fang",
        choice4: "Needle",
        answer: 4,
    },
    {
        question: "In which King’s Landing slum did Gendry grow up?",
        choice1: "Flea Bottom",
        choice2: "Rat Bottom",
        choice3: "Rhaenys's Hill",
        choice4: "Dragonpit",
        answer: 1,
    },
    {
        question: "Who was Ned Stark’s predecessor as Robert Baratheon’s Hand?",
        choice1: "Jaime Lannister",
        choice2: "Jon Arryn",
        choice3: "Tywin Lannister",
        choice4: "Ser Jorah Mormont",
        answer: 2,
    },
    {
        question: "Whose last words were: 'Give me something for the pain, and let me die'?",
        choice1: "Stannis Baratheon",
        choice2: "Hodor",
        choice3: "Robert Baratheon",
        choice4: "Walder Frey",
        answer: 3,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 13

startGame = () => {
    questionCounter = 0
    score = 0
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

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()