const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelectorAll("#progressText");
const scoreText = document.querySelector("#score");
const proBarFull = document.querySelector("#proBarFull");


let currentQuestion = {};
let timeEl = document.querySelectorAll("timer");
let secondsLeft = 60;
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [{
        question: "On Every Continent, There Is A City Named What??",
        choice1: "miami",
        choice2: "belgum",
        choice3: "denver",
        choice4: "rome",
        answer: 4,
    }, {
        question: "how do planes fly?",
        choice1: "engines",
        choice2: "anti-gravity",
        choice3: "baloons",
        choice4: "hot air",
        answer: 1,
    },
    {
        question: "whats the coldest place on earth?",
        choice1: "iceland",
        choice2: "siberia",
        choice3: "poland",
        choice4: "antarctica",
        answer: 4,
    },
    {
        question: "where is the deepest hole in the world?",
        choice1: "pikes peak",
        choice2: "kola",
        choice3: "grand canyon",
        choice4: "Mariana Trench",
        answer: 2,
    },

];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...question];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.getItem("mostRecentScore", score);

        return window.location.assign('./end.html');
    }
    questionCounter++;
    progressText.innerText = `Questions ${questionCounter} of ${MAX_QUESTIONS}`
    proBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question
    choices.forEach((choice) => {
        const number = choice.dataset["number"]
        choice.innerText = currentQuestion['choice' + number]
    });

    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true
};

function setTime() {
    let timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            sendMessage()
        }
    }, 1000)
}

function sendMessage() {
    timeEl.textContent = "your done!";
    window.location.assign('./end.html');
}
setTime()

choices.forEach((choice) => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion()
        }, 1000)
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};

startGame = ("");