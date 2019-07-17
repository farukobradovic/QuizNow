let login = JSON.parse(localStorage.getItem('login-informations'));
console.log(login);
let loginInformations = JSON.parse(localStorage.getItem('login-informations'));
let loginSpan = document.querySelector('.login-span');


loginSpan.innerHTML = `${loginInformations.username} ${loginInformations.lastname} [${loginInformations.difficulty}]`;

let questions = JSON.parse(localStorage.getItem('questions'));
let currentQuestion = 0;
let currentScore = 0;


console.log(questions);
let questionsCorrect = [];
let questionsCorrectAttempts = [];

questions.forEach(function (item) {
    questionsCorrect.push(item.correct);
    questionsCorrectAttempts.push(false);
});
console.log(questionsCorrect);
console.log(questionsCorrectAttempts);

let timer;
function displayTimer() {
    var seconds;
    if (loginInformations.difficulty === 'Hard') {
        seconds = 5;
    }
    else if (loginInformations.difficulty === 'Medium') {
        seconds = 8;
    }
    else if (loginInformations.difficulty === 'Easy') {
        seconds = 10;
    }

    timer = setInterval(function () {
        if (seconds !== -1) {
            document.querySelector('.score').innerHTML = seconds--;
        }
        else {
            console.error('Game Over !');
            clearInterval(timer);

            let html = `
            <p class="paragraph-question"><span class="game-over">Game Over</span>, you're too slow.</p>
            <p class="paragraph-result">    To see leaderboard click <a href="leaderboard.html" class="leaderboard-link">here</a>.</p>
            <button class="button-next u-margin-top-big again">Play again</button>
            `;

            let parent = document.getElementById('container-quiz');
            parent.style.border = 'none';
            parent.style.borderTop = `1px solid #f7f7f7`;
            parent.innerHTML = html;
        }
    }, 1000);
}

//Local storage for leaderboards Easy Medium and Hard difficulty
let leaderboardEasyMode = [
    leaderboard = {
        name: 'LeBron',
        lastname: 'James',
        score: 7
    },
    leaderboard = {
        name: 'Giannis',
        lastname: ' Antetokounmpo',
        score: 6
    },
    leaderboard = {
        name: 'Nikola',
        lastname: 'Jokić',
        score: 10
    },
    leaderboard = {
        name: 'Jason',
        lastname: 'Tatum',
        score: 1
    }

];
let leaderboardHardMode = [
    leaderboard = {
        name: 'Kawhi',
        lastname: 'Leonard',
        score: 12
    },
    leaderboard = {
        name: 'Chris',
        lastname: 'Paul',
        score: 11
    },
    leaderboard = {
        name: 'Al',
        lastname: 'Horford',
        score: 3
    },
    leaderboard = {
        name: 'Kemba',
        lastname: 'Walker',
        score: 30
    }

];
let leaderboardMediumMode = [
    leaderboard = {
        name: 'Paul',
        lastname: 'George',
        score: 8
    },
    leaderboard = {
        name: 'Jusuf',
        lastname: 'Nurkic',
        score: 9
    },
    leaderboard = {
        name: 'Nikola',
        lastname: 'Jokić',
        score: 3
    },
    leaderboard = {
        name: 'Jason',
        lastname: 'Tatum',
        score: 4
    }

];
if (localStorage.getItem('Leaderboard-Easy') === null) {
    localStorage.setItem('Leaderboard-Easy', JSON.stringify(leaderboardEasyMode));
}
if (localStorage.getItem('Leaderboard-Hard') === null) {
    localStorage.setItem('Leaderboard-Hard', JSON.stringify(leaderboardHardMode));
}
if (localStorage.getItem('Leaderboard-Medium') === null) {
    localStorage.setItem('Leaderboard-Medium', JSON.stringify(leaderboardMediumMode));
}

function storageLeaderboards() {

    let loginObject = {
        name: login.username,
        lastname: login.lastname,
        score: currentScore,
        difficulty: login.difficulty
    };

    if (localStorage.getItem(`Leaderboard-${login.difficulty}`) === null) {
        let leaderboards1 = [];
        leaderboards1.push(loginObject);
        localStorage.setItem(`Leaderboard-${login.difficulty}`, JSON.stringify(leaderboards1));
    }
    else {
        let leaderboards1 = JSON.parse(localStorage.getItem(`Leaderboard-${login.difficulty}`));
        leaderboards1.push(loginObject);
        console.log(loginObject);
        localStorage.setItem(`Leaderboard-${login.difficulty}`, JSON.stringify(leaderboards1));
    }
};

function getPositionInLeaderboard() {
    let leaderboardCurrent = JSON.parse(localStorage.getItem(`Leaderboard-${login.difficulty}`));
    leaderboardCurrent.sort(function (a, b) { return b.score - a.score });
    let indeks = -1;
    leaderboardCurrent.forEach(function(cur,index){
        if(cur.name === login.username && cur.lastname === login.lastname && cur.score === currentScore){
            indeks = index + 1;
            return;
        }

    });
    if(indeks !== -1){
        console.log(`You are ${indeks}th best !`);     
    }
    return indeks;
}

document.addEventListener('DOMContentLoaded', displayQuestion);

function displayQuestion() {
    clearInterval(timer);
    displayTimer();
    let answersHtml = '';
    let buttonsHtml = '';
    if (currentQuestion === 0) {
        buttonsHtml = '<button class="button-next next">Next</button>';
    }
    else if (currentQuestion === questions.length - 1) {
        buttonsHtml = `<button class="button-next previous">Previous</button>
                       <button class="button-next finish" id="finish">Finish</button> `;
    }
    else {
        buttonsHtml = `
        <button class="button-next previous">Previous</button>
        <button class="button-next next">Next</button>
        `;
    }
    questions[currentQuestion].answers.forEach(function (item, index) {
        answersHtml += `<li class="list-question-item">${index + 1}.) ${item}</li>`;

    });
    let htmlTemp = `
    <ul class="list-question">
        ${answersHtml}
    </ul>
    `;

    let html = `
    <p class="paragraph-question">${questions[currentQuestion].question}</p>
    ${htmlTemp}  
    <div class="wrapper">
        <div class="buttons">
            ${buttonsHtml}
        </div>
        <p class="paragraph-score">Time left: <span class="score"></span></p>
    </div>
    `;
    console.log(questions[currentQuestion]);
    document.querySelector('#container-quiz').innerHTML = html;
}
function cleanQuestion() {
    document.querySelector('#container-quiz').innerHTML = '';
}
let correctAnswer = false;
document.querySelector('#container-quiz').addEventListener('click', function (e) {
    let clicked = '';

    if (e.target.classList.contains('list-question-item')) {
        // correctAnswer = false;
        clicked = e.target.innerHTML.substring(4);

        let questionsContainer = document.querySelector('.list-question');
        let q = questionsContainer.getElementsByClassName('list-question-item');
        for (var i = 0; i < q.length; i++) {

            if (q[i].className === 'list-question-item clicked') {
                q[i].className = 'list-question-item';
            }
        }
        e.target.classList.add('clicked');
        if (questionsCorrect[currentQuestion] === clicked && questionsCorrectAttempts[currentQuestion] == false) {
            currentScore += parseInt(questions[currentQuestion].category, 10);


            questionsCorrectAttempts[currentQuestion] = true;
        }
        if (questionsCorrect[currentQuestion] !== clicked && questionsCorrectAttempts[currentQuestion] == true) {
            currentScore -= parseInt(questions[currentQuestion].category, 10);
            questionsCorrectAttempts[currentQuestion] = false;
        }
    }
    if (e.target.classList.contains('next')) {
        if (currentQuestion !== questions.length - 1) {
            console.log(`Current score: ${currentScore}`);
            cleanQuestion();
            currentQuestion++;
            displayQuestion();

        }
    }
    if (e.target.classList.contains('previous')) {
        if (currentQuestion !== 0) {
            cleanQuestion();
            currentQuestion--;
            displayQuestion();
        }
    }
    if (e.target.classList.contains('finish')) {
        clearInterval(timer);
        cleanQuestion();
        currentQuestion = 0;
        if (questionsCorrect[currentQuestion] === clicked && questionsCorrectAttempts[currentQuestion] == false) {
            currentScore += parseInt(questions[currentQuestion].category, 10);
        }
        
        storageLeaderboards();
        let index = getPositionInLeaderboard();

        let html = `
        <p class="paragraph-question">Congratulations <i class="fas fa-sign-language"></i>, you finished quiz. Your result is ${currentScore}.</p>
        <p class="paragraph-result">Your score is ${index}th best. To see leaderboard click <a href="leaderboard.html" class="leaderboard-link">here</a>.</p>
        <button class="button-next u-margin-top-big again">Play again</button>
        `;

        let parent = document.getElementById('container-quiz');
        parent.style.border = 'none';
        parent.style.borderTop = `1px solid #f7f7f7`;
        parent.innerHTML = html;

        
        currentScore = 0;
       
    }
    if (e.target.classList.contains('again')) {
        currentQuestion = 0;
        currentScore = 0;
        let parent = document.getElementById('container-quiz');
        parent.innerHTML = '';
        parent.style.border = '1px solid #f7f7f7';
        questionsCorrect = [];
        questionsCorrectAttempts = [];

        questions.forEach(function (item) {
            questionsCorrect.push(item.correct);
            questionsCorrectAttempts.push(false);
        });

        displayQuestion();
    }
});


