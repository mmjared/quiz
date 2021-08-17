
const userName = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScores = document.querySelectorAll('#finalScore')
const mostRecentScore = localStorage.getItem("mostRecentScore")

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_SCORES = 5

finalScores.innerText = mostRecentScore


userName.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !userName.value
})

saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: userName.value
    }

    highScores.push(score)

    highScores.sort((a,b) =>{
        return b.score - a.score
    })

    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign ('./highscores.html')    


};
const scoreList= document.getElementById("scoreList")
