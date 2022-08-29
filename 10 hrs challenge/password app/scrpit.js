const passwordEl = document.getElementById('pw');
const pwLength = document.getElementById('pw-length');
const copyEl = document.getElementById("copy");
const upperEl = document.getElementById("upper");
const lowerEl = document.getElementById("lower");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const generateEl = document.getElementById("generate");

const upperLetter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerLetter = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_-+=';


function getUpperCase(){
    return upperLetter[Math.floor(Math.random() * upperLetter.length)];
};

function getLowerCase(){
    return lowerLetter[Math.floor(Math.random() * lowerLetter.length)];
};

function getNumbers(){
    return numbers[Math.floor(Math.random() * numbers.length)];
};

function getSymbols(){
    return symbols[Math.floor(Math.random() * symbols.length)];
};


function generatePw(){
    const length = pwLength.value;

    let password = '';
    for(let i=0;i<=length;i++){
        const x = generateX();
        password += x;
    };
    passwordEl.innerText = password;
};

function generateX(){
    let xs = [];
    if(upperEl.checked){
        xs.push(getUpperCase());
    }
    if(lowerEl.checked){
        xs.push(getLowerCase());
    }
    if(numberEl.checked){
        xs.push(getNumbers());
    }
    if(symbolEl.checked){
        xs.push(getSymbols());
    }
    else{
        xs.push('')
    }
    return xs[Math.floor(Math.random() * xs.length)];
};


generateEl.addEventListener('click', generatePw);

copyEl.addEventListener("click", () => {
    const copy = passwordEl.innerText;
    navigator.clipboard.writeText(copy);   
});
