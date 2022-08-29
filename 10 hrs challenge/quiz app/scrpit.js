const quizData = [
    {
        question: "What HTML stands for?",
        answer: ["HyperText Markup Language", "HyperText Modular Language", "Human Type Machine Language", "How to Mark Links"],
        correctAnswer: 0
    },
    {
        question: "Which year this questions were made?",
        answer:[2022, 2021, 2020, 2023],
        correctAnswer: 0
    },
    {
        question: "Which one is the best animal?",
        answer:["Monkey", "Dog", "Cat", "Fish"],
        correctAnswer: 0
    },
    {
        question: "Who create the web?",
        answer:["Linus Torvalds", "Richard Matthew Stallman", "Tim Berners-Lee", "Bill Gates"],
        correctAnswer: 2
    }
];


let currentQuiz = 0;

function inputData(){
    const currentQuizData = quizData[currentQuiz];
    document.querySelector('.question-title').innerHTML = currentQuizData.question;
    //man don't look at this it's scuffed as fuck
    //loop through the answers array
    for(let v = 1; v <= currentQuizData.answer.length; v++){
        document.querySelector(`#question-${v}`).innerHTML = quizData[currentQuiz].answer[v-1];
    }
    clearRadioCheck();
}

inputData();

const submitBtn = document.querySelector('#sub');

let answers = [];

function isSelected(){
    const answersEl = document.querySelectorAll('.answer');

    let answer = undefined;

    answersEl.forEach(answerE => {
        if(answerE.checked){
            answers.push(answerE.id);
            answer = answerE.id;
        }
    });
    return answer
};

function clearRadioCheck() {
    const answersEl = document.querySelectorAll('.answer');
    answersEl.forEach((answerE) => {
        if(answerE.checked){
            answerE.checked = false
        };
    });
}


function countAnswers(array){
    let a = []
    let correct = 0;
    let wrong = 0;
    array.forEach(v => {
        switch(v){
            case "resp1":
                a.push(0);
                break;
            case "resp2":
                a.push(1);
                break;
            case "resp3":
                a.push(2);
                break;
            case "resp4":
                a.push(3)
                break;
        };
    });
    for(let v in a){
        if(a[v] === quizData[v].correctAnswer){
            correct ++;
        } else{
            wrong ++;
        }
    }
    return [a, correct, wrong];
};


submitBtn.addEventListener("click", () => {
    const answer = isSelected();
    if(answer){
        currentQuiz ++;
    }    
    if(currentQuiz < quizData.length){
        inputData();
    } else{
        const ans = countAnswers(answers);
        document.querySelector('.question').innerHTML = `<h3>Congratulations!!!</h3>
        <p> You got ${ans[1]} answers correct and ${ans[2]} wrong.</p>
        <button class="submit-button" onclick="location.reload()"> Restart </button>`;
    }
});