//Getting informations from localstorage
let leaderboardEasy = JSON.parse(localStorage.getItem('Leaderboard-Easy'));
let leaderboardHard = JSON.parse(localStorage.getItem('Leaderboard-Hard'));
let leaderboardMedium = JSON.parse(localStorage.getItem('Leaderboard-Medium'));


// console.log(leaderboards);

//Sorting from biggest score to lowest
leaderboardEasy.sort(function (a, b) { return b.score - a.score });
console.log(leaderboardEasy);

leaderboardHard.sort(function (a, b) { return b.score - a.score });
console.log(leaderboardHard);

leaderboardMedium.sort(function (a, b) { return b.score - a.score });
console.log(leaderboardMedium);

let htmlEasy = '';
let parentEasy = document.querySelector('#leaderboard-easy');

let htmlHard = '';
let parentHard = document.querySelector('#leaderboard-hard');

let htmlMedium = '';
let parentMedium = document.querySelector('#leaderboard-medium');

//Populating items to table
for (var i = 0; i < 5; i++) {
    //Easy Mode
    if (leaderboardEasy[i] !== undefined) {
        htmlEasy += `
        <tr>
           <td>${i+1}</td>
           <td>${leaderboardEasy[i].name}</td>
           <td>${leaderboardEasy[i].lastname}</td>
           <td>${leaderboardEasy[i].score}</td>
        </tr>
        `;
    }
    else {
        htmlEasy += `
        <tr>
           <td>${i+1}</td>
           <td>X</td>
           <td>Y</td>
           <td>0</td>
        </tr>
        `;
    }
    //Hard Mode
    if (leaderboardHard[i] !== undefined) {
        htmlHard += `
        <tr>
           <td>${i+1}</td>
           <td>${leaderboardHard[i].name}</td>
           <td>${leaderboardHard[i].lastname}</td>
           <td>${leaderboardHard[i].score}</td>
        </tr>
        `;
    }
    else {
        htmlHard += `
        <tr>
           <td>${i+1}</td>
           <td>X</td>
           <td>Y</td>
           <td>0</td>
        </tr>
        `;
    }
    //Medium Mode
    if (leaderboardMedium[i] !== undefined) {
        htmlMedium += `
        <tr>
           <td>${i+1}</td>
           <td>${leaderboardMedium[i].name}</td>
           <td>${leaderboardMedium[i].lastname}</td>
           <td>${leaderboardMedium[i].score}</td>
        </tr>
        `;
    }
    else {
        htmlMedium += `
        <tr>
           <td>${i+1}</td>
           <td>X</td>
           <td>Y</td>
           <td>0</td>
        </tr>
        `;
    }


};

parentEasy.innerHTML += htmlEasy;
parentHard.innerHTML += htmlHard;
parentMedium.innerHTML += htmlMedium;
