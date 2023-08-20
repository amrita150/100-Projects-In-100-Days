const inputSlider = document.querySelector("[data-length-slider]");
const lengthDisplay = document.querySelector("[data-length-num]");
const passwordDisplay = document.querySelector("[data-password-display]");
const uppercaseCheck = document.querySelector("#uppercase"); 
const lowercaseCheck = document.querySelector("#lowercase");
const symbolCheck = document.querySelector("#symbol");
const numberCheck = document.querySelector("#number");
const generatePass = document.querySelector(".btn");
const copyBtn = document.querySelector(".copybtn");
const copyMsg = document.querySelector("[data-copyMsg]");
const indicator = document.querySelector("[data-indicator]");
const allCheckbox = document.querySelectorAll("input[type=checkbox]");


const symbols = '~`!@#$%^&*()_-+=:;"<,>.?/|\}{][';
let password = "";
let passLen = 10;
let checkCount = 1;
//set circle color to grey
handleSlider();
//set password length
function handleSlider(){
    inputSlider.value = passLen;
    lengthDisplay.innerText = passLen;
}

function setIndicator(color){
    indicator.style.backgroundColor = color;
    //shadow
}

function getRandomInteger(min , max){
    Math.floor(Math.random()*(max-min)) + min ;
}

function getRandomNumber(){
    return getRandomInteger(0,9);
}

function getRandomUpperCase(){
    return String.fromCharCode(getRandomInteger(65,91));
}


function getRandomLowerCase(){
    return String.fromCharCode(getRandomInteger(97,123));
}

function generateSymbol(){
    const randomNum = getRandomInteger(0,symbols.length);
    return symbols.charAt(randomNum);
}

function caclStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasSymbol = false;
    let hasNum = false;
    if(uppercaseCheck.checked){
        hasUpper = true;
    }
    if(lowercaseCheck.checked){
        hasLower = true;
    }
    if(symbolCheck.checked){
        hasSymbol = true;
    }
    if(numberCheck.checked){
        hasNum = true;
    }

    if(hasLower && hasUpper && (hasNum || hasSymbol) && passLen>=8){
        setIndicator("#0f0");
    } else if((hasLower || hasUpper) && (hasNum || hasSymbol) && passLen >= 6){
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
    
}