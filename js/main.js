// var questionObject = {
//     question : 'What is IT ?',
//     answers : {
//         answer1 : 'Info Tenchnology',
//         answer2 : 'Sport'
//     },
//     correct : 'Info Technology',
//     category : 'IT'
// };

// console.log(questionObject);

// localStorage.setItem('questions', JSON.stringify(questionObject));

// console.log(JSON.parse(localStorage.getItem('questions')));



document.querySelector('.log-in-card').addEventListener('click', function(e){
    if(e.target.classList.contains('log-in-button')){
        let username = document.getElementById('user-name');
        let lastname = document.getElementById('user-lastname');
        let difficulty = document.getElementById('select-list');
        let loginInformations = {
            username : username.value,
            lastname : lastname.value,
            difficulty : difficulty.value
        };
        localStorage.setItem('login-informations', JSON.stringify(loginInformations));
    }
    
});

let leaderboardHard = JSON.parse(localStorage.getItem('Leaderboard-Hard'));
leaderboardHard.sort(function (a, b) { return b.score - a.score });

let html = '';
let parent = document.querySelector('#table-main');

for (var i = 0; i < 5; i++) {

    if (leaderboardHard[i] !== undefined) {
        html += `
        <tr>
           <td>${i+1}</td>
           <td>${leaderboardHard[i].name}</td>
           <td>${leaderboardHard[i].lastname}</td>
           <td>${leaderboardHard[i].score}</td>
        </tr>
        `;
    }
    else {
        html += `
        <tr>
           <td>${i+1}</td>
           <td>X</td>
           <td>Y</td>
           <td>0</td>
        </tr>
        `;
    }
};

parent.innerHTML += html;
