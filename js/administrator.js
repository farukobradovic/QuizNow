//CATEGORY MEANS POINTS, DIDN'T CHANGED YET

let question = document.getElementById('input-question');
let category = document.getElementById('input-category');
// let storedQuestions = [];
let questionObject = {
    question: '',
    answers: [],
    correct: '',
    category: '',
    ID: ''
};
let questions1 = [
    questionObject = {
        question: 'What is this color #000',
        answers: ['Black', 'Yellow', 'White'],
        correct: 'Black',
        category: '3',
        ID: '15sdd'
    },
    questionObject = {
        question: 'What is capital of Croatia ?',
        answers: ['Sarajevo', 'Belgrade', 'Zagreb', 'Split'],
        correct: 'Zagreb',
        category: '4',
        ID: 'fd153'
    },
    questionObject = {
        question: 'What nationality is Lionel Messi',
        answers: ['German', 'Spanish', 'Argentinian'],
        correct: 'Argentinian',
        category: '2',
        ID: 'd4s7a'
    },
    questionObject = {
        question: 'For what club is Ronaldo playing ?',
        answers: ['Real Madrid', 'Barcelona', 'Manchester City', 'Juventus'],
        correct: 'Juventus',
        category: '2',
        ID: 'd4s0g'
    },
    questionObject = {
        question: 'What is formula for water ?',
        answers: ['H3PO4', 'H2O', 'NaH3PO4', 'GH2I1'],
        correct: 'H2O',
        category: '5',
        ID: 'tt11f'
    },
    questionObject = {
        question: 'C++ is programming language ?',
        answers: ['Yes', 'No'],
        correct: 'Yes',
        category: '2',
        ID: 'zhs0g'
    },
    questionObject = {
        question: 'What is capital city of India ?',
        answers: ['Ahmetabad', 'Delhi', 'Jaipur', 'Mumbai'],
        correct: 'Delhi',
        category: '4',
        ID: 'mk553'
    },
    questionObject = {
        question: 'What franchise is NBA champion in season 2018/2019 ?',
        answers: ['Boston Celtics', 'Toronto Raptors', 'Golden State Warriors', 'Chicago Bulls'],
        correct: 'Toronto Raptors',
        category: '2',
        ID: 'zz58d'
    },
    questionObject = {
        question: 'Sarajevo is capital of Bosnia and Herzegovina ?',
        answers: ['Yes', 'No'],
        correct: 'Yes',
        category: '2',
        ID: 'zju8k'
    }
];
// console.log(questions1);
if (localStorage.getItem('questions') === null) {
    localStorage.setItem('questions', JSON.stringify(questions1));
}

questionObject.question = '';
questionObject.answers = [];
questionObject.correct = '';
questionObject.category = '';
questionObject.ID = '';
console.log(questionObject);

let questionCounter = false;
let categoryCounter = false;
let correctCounter = false;
let counter = 0;

let currentIteration = 0;

function generateID() {
    return Math.random().toString(36).substr(2, 5);
}

function checkSumbmitButton() {
    if (questionCounter && categoryCounter && correctCounter && counter > 1) {
        document.querySelector('#button-add-submit').style.display = 'block';
    }
    else {
        document.querySelector('#button-add-submit').style.display = 'none';
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

document.querySelector('#button-add-submit').style.display = 'none';
document.querySelector('#add-question').addEventListener('click', function () {
    // console.log(question.value);
    var reg = new RegExp('^[0-9]+$');
    if (question.value !== '' && category.value !== '' && reg.test(category.value)) {
        question.value = capitalizeFirstLetter(question.value);
        category.value = capitalizeFirstLetter(category.value);

        let html = `
    <div class="options">
    <p class="question-infos-question">${question.value}</p>
    <div class="options-sub"><span class="edit-question"><i class="fas fa-edit"></i></span> <span
            class="delete-question"><i class="fas fa-trash-alt"></i></span></div>
    </div>
    `;
        let parent = document.querySelector('.question-infos');
        parent.innerHTML = html;

        let html2 = `
    <div class="category">
    <p class="category-infos-question">${category.value}</p>
    <div class="options-sub"><span class="edit-category"><i class="fas fa-edit"></i></span> <span
            class="delete-category"><i class="fas fa-trash-alt"></i></span></div>
    `;
        let parent2 = document.querySelector('.category-answer-correct');
        parent2.innerHTML = html2;
        questionObject.question = question.value;
        questionObject.category = category.value;
        question.value = '';
        category.value = '';
        questionCounter = true;
        categoryCounter = true;
        checkSumbmitButton();
    }
});


document.querySelector('#add-answer').addEventListener('click', function () {
    let answer = document.querySelector('#input-answer');
    if (answer.value !== '') {
        counter++;
        if (counter < 6) {
            let html = `
            <div class="answer">
            <p class="answer-infos-question">${answer.value} </p>
            <div class="options-sub"><span class="edit-answer"><i class="fas fa-edit"></i></span> <span
                    class="delete-answer"><i class="fas fa-trash-alt"></i></span></div>
            `;

            let parent = document.querySelector('.answers');
            parent.innerHTML += html;
            questionObject.answers.push(answer.value);
            answer.value = '';
            checkSumbmitButton();
        }

    }
});

document.querySelector('#add-correct').addEventListener('click', function () {
    let correct = document.getElementById('input-correct');

    if (!correctCounter) {
        if (correct.value !== '') {
            let html = `
            <div class="answer-correct">
            <p class="answer-correct-infos-question">${correct.value} </p>
            <div class="options-sub"><span class="edit-correct"><i class="fas fa-edit"></i></span> <span
                    class="delete-correct"><i class="fas fa-trash-alt"></i></span></div>
            </div>
            `;

            let parent = document.querySelector('.category-answer-correct');
            parent.innerHTML += html;
            questionObject.correct = correct.value;
            correct.value = '';
            correctCounter = true;
            checkSumbmitButton();

        }
    }

});


document.querySelector('#button-add-submit').addEventListener('click', function (e) {
    if (questionObject.ID === '') {
        questionObject.ID = generateID();
    }
    else {
        let questions = JSON.parse(localStorage.getItem('questions'));
        for (var i = 0; i < questions.length; i++) {
            if (questions[i].ID == questionObject.ID) {
                questions.splice(i, 1);
            }
        }
        localStorage.setItem('questions', JSON.stringify(questions));

        let questionUpdated = document.querySelector('.question-infos-question').innerHTML;
        let categoryUpdated = document.querySelector('.category-infos-question').innerHTML;
        let correctUpdated = document.querySelector('.answer-correct-infos-question').innerHTML;
        // let answersUpdated = document.querySelectorAll('.answer-infos-question');
        // console.log(answersUpdated);
        questionObject.question = questionUpdated;
        questionObject.category = categoryUpdated;
        questionObject.correct = correctUpdated;
        console.log(questionObject);


    }



    if (localStorage.getItem('questions') === null) {
        let questions = [];
        questions.push(questionObject);
        localStorage.setItem('questions', JSON.stringify(questions));
    }
    else {
        let questions = JSON.parse(localStorage.getItem('questions'));
        questions.push(questionObject);
        localStorage.setItem('questions', JSON.stringify(questions));
    }

    let correctDIV = document.querySelector('.category-answer-correct');
    let answersDIV = document.querySelector('.answers');
    let questionsDIV = document.querySelector('.question-infos');
    let categoryDIV = document.querySelector('.category-answer-correct');

    correctDIV.innerHTML = '';
    answersDIV.innerHTML = '';
    questionsDIV.innerHTML = '';
    categoryDIV.innerHTML = '';

    questionCounter = false;
    categoryCounter = false;
    correctCounter = false;
    counter = 0;

    document.querySelector('#button-add-submit').style.display = 'none';

    questionObject.question = '';
    questionObject.answers = [];
    questionObject.correct = '';
    questionObject.category = '';
    questionObject.ID = '';

    deleteQuestions();
    populateQuestions();

});

let text;
let currentElement;
document.querySelector('#box-2').addEventListener('click', function (e) {
    if (e.target.parentElement.classList.contains('edit-question') || e.target.parentElement.classList.contains('edit-category')
        || e.target.parentElement.classList.contains('edit-answer') || e.target.parentElement.classList.contains('edit-correct')) {
        text = e.target.parentElement.parentElement.previousElementSibling.innerHTML;
        currentElement = e.target.parentElement.parentElement.previousElementSibling;
        // console.log(e.target.parentElement.parentElement.previousElementSibling.innerHTML);

        let html = `
        <p class="paragraph-update" contenteditable="true">${text}</p>
                     <button class="button-add" id="button-update">Update</button>
        `;
        let parent = document.querySelector('.update');
        parent.innerHTML = html;

        document.querySelector('.update').style.display = 'block';
    }

});

document.querySelector('#box-2').addEventListener('click', function (e) {
    // console.log(e.target);
    let allAnswers = document.querySelectorAll('.answer');
    if (e.target.parentElement.classList.contains('delete-answer')) {
        currentElement = e.target.parentElement.parentElement.parentElement;
        counter = allAnswers.length - 1;

        questionCounter = true;
        correctCounter = true;
        categoryCounter = true;
        
        currentElement.remove();
        checkSumbmitButton();
    }

});


document.querySelector('.update').addEventListener('click', function (e) {
    if (e.target.classList.contains('button-add')) {
        //    console.log(e.target.previousElementSibling.innerHTML);
        let updatedText = e.target.previousElementSibling.innerHTML;
        currentElement.innerHTML = updatedText;

        document.querySelector('.update').style.display = 'none';
    }
});


document.addEventListener('DOMContentLoaded', populateQuestions());


function populateQuestions() {
    let questions = JSON.parse(localStorage.getItem('questions'));
    console.log(questions);
    let parent = document.querySelector('.storage-questions');
    let html;
    if (questions !== null) {
       
        // questions.forEach(function (item, index) {
        //     html = `
        //         <div class="question" id="${item.ID}">
        //         <p class="question-question">${item.question}</p>
        //         <div class="options-sub"><span class="edit-question"><i class="fas fa-edit"></i></span> <span
        //                 class="delete-question"><i class="fas fa-trash-alt"></i></span>
        //         </div>
        //         </div>
        //         `;

        //          parent.innerHTML += html;
        // });
       
       if(currentIteration === 0){
        parent.innerHTML = '';
        let heading = `<h3 class="heading-questions">Questions</h3>`;
        parent.innerHTML += heading;
        for(let i = 0; i < questions.length; i++){
            if(i % 4 === 0 && i !== 0){
                currentIteration = i;
                parent.innerHTML += `<button class="button-next next-question" id="next-question">Next</button>`;
                break;
            }
            html = `
            <div class="question" id="${questions[i].ID}">
            <p class="question-question">${questions[i].question}</p>
            <div class="options-sub"><span class="edit-question"><i class="fas fa-edit"></i></span> <span
                    class="delete-question"><i class="fas fa-trash-alt"></i></span>
            </div>
            </div>
            `;

             parent.innerHTML += html;
        };
       }
       else{
           parent.innerHTML = '';
           let heading = `<h3 class="heading-questions">Questions</h3>`;
           parent.innerHTML += heading;

           html = `
           <div class="question" id="${questions[currentIteration-1].ID}">
           <p class="question-question">${questions[currentIteration-1].question}</p>
           <div class="options-sub"><span class="edit-question"><i class="fas fa-edit"></i></span> <span
                   class="delete-question"><i class="fas fa-trash-alt"></i></span>
           </div>
           </div>
           `;
           parent.innerHTML += html;

        for(let i = currentIteration; i < questions.length; i++){
            if(i % 4 === 0 ){
                currentIteration = i;
                parent.innerHTML += `<button class="button-next next-question" id="next-question">Next</button>`;
                break;
            }
            html = `
            <div class="question" id="${questions[i].ID}">
            <p class="question-question">${questions[i].question}</p>
            <div class="options-sub"><span class="edit-question"><i class="fas fa-edit"></i></span> <span
                    class="delete-question"><i class="fas fa-trash-alt"></i></span>
            </div>
            </div>
            `;

             parent.innerHTML += html;
        };
        parent.innerHTML += `<button class="button-next back-question" id="back-question">Back</button>`;
       }
    }

}

function deleteQuestions() {
    let parent = document.querySelector('.storage-questions');

    parent.innerHTML = '';
}

document.querySelector('#box-3').addEventListener('click', function (e) {
    if (e.target.parentElement.classList.contains('edit-question')) {
        let id = e.target.parentElement.parentElement.parentElement.id;
        let questions = JSON.parse(localStorage.getItem('questions'));
        questions.forEach(function (item) {
            if (item.ID === id) {
                questionObject = item;
                return;
            }
        });
        console.log(questionObject);
        document.querySelector('.question-infos').innerHTML = `
     <div class="options">
     <p class="question-infos-question">${questionObject.question}</p>
     <div class="options-sub"><span class="edit-question"><i class="fas fa-edit"></i></span></div>
     </div>
     `;

        let answerHtml = '';
        questionObject.answers.forEach(function (item) {
            answerHtml += `
        <div class="answer">
        <p class="answer-infos-question">${item}</p>
        <div class="options-sub"><span class="edit-answer"><i class="fas fa-edit"></i></span> <span
                class="delete-answer"><i class="fas fa-trash-alt"></i></span></div>
        </div>
        `;

        });
        document.querySelector('.answers').innerHTML = answerHtml;

        document.querySelector('.category-answer-correct').innerHTML = `
      <div class="category">
      <p class="category-infos-question">${questionObject.category}</p>
      <div class="options-sub"><span class="edit-category"><i class="fas fa-edit"></i></span> </div>
      </div>
        <div class="answer-correct">
      <p class="answer-correct-infos-question">${questionObject.correct} </p>
      <div class="options-sub"><span class="edit-correct"><i class="fas fa-edit"></i></span> </div>
      </div>
      `;
        document.querySelector('#button-add-submit').style.display = 'block';

    }
    else if (e.target.parentElement.classList.contains('delete-question')) {
        let id = e.target.parentElement.parentElement.parentElement.id;
        let questions = JSON.parse(localStorage.getItem('questions'));

        for (var i = 0; i < questions.length; i++) {
            if (questions[i].ID == id) {
                questions.splice(i, 1);
            }
        }
        localStorage.setItem('questions', JSON.stringify(questions));

        e.target.parentElement.parentElement.parentElement.remove();



    }
});


document.querySelector('#box-3').addEventListener('click', function(e){
    if(e.target.classList.contains('next-question')){
       console.log(currentIteration);
       currentIteration++;
       populateQuestions();
    }
    else if(e.target.classList.contains('back-question')){
        console.log(currentIteration);
        currentIteration = 0;
        populateQuestions();
     }
});