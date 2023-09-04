const inputSlider = document.querySelector("[data-length-slider]");
const lengthDisplay = document.querySelector("[data-length-num]");

//default pass length
let passwordLength = 10;

let password = "";

//set password length
handleSlider();

function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLength-min)*100/(max-min)) + "% 100%";
}


//set indicator
const indicator = document.querySelector("[data-indicator]");

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    //shadow
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;    
    //without using temp litteral
    // indicator.style.boxShadow = '0px 0px 12px 1px ' + color;
}

const uppercaseCheck = document.querySelector("#uppercase"); 
const lowercaseCheck = document.querySelector("#lowercase");
const symbolCheck = document.querySelector("#symbol");
const numberCheck = document.querySelector("#number");

//calc the strength of indicator
function caclStrength() {
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

    if(hasLower && hasUpper && (hasNum || hasSymbol) && passwordLength>=8){
        setIndicator("#0f0");
    } else if((hasLower || hasUpper) && (hasNum || hasSymbol) && passwordLength >= 6){
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
}

setIndicator("#ccc");

// Generate Random Letters and Number and Symbols
const symbols = '~`!@#$%^&*()_-+=:;"<,>.?/|\}{][';

//generate random vaulues
function getRandomInteger(min,max){
    return Math.floor(Math.random()*(max-min)) + min ;
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

inputSlider.addEventListener('input' , (e) => {
    passwordLength = e.target.value;
    handleSlider();
});

//copy message to clipboard
const copyBtn = document.querySelector(".copybtn");
const copyMsg = document.querySelector("[data-copyMsg]");
const passwordDisplay = document.querySelector("[data-password-display]");

async function copyToClipboard(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied";
    }
    catch(e) {
        copyMsg.innerText = "Failed";
    }

  //to make copy wala span visible
  copyMsg.classList.add("active");


//to make this active invisible after sometime
setTimeout(()=> {
    copyMsg.classList.remove('active'); 
} , 2000);
}

//copy content when click
copyBtn.addEventListener("click" , () => {
    if(passwordDisplay.value){
        copyToClipboard();
    }
});

// shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle.
// Shuffle the array randomly - Fisher Yates Method
function shuffle(array){
    for(let i = array.length - 1 ; i>0 ; i--){
        const j = Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    let str = "";
    array.forEach((el)=>(str += el));
    return str;
}

// Password Generate 

// By Default UpperCase Checked 
uppercase.checked = true;

const allCheckbox = document.querySelectorAll("input[type=checkbox]");

let checkCount = 0;
//checkbox - handle
function handleCheckBoxChange(){
    checkCount = 0;
    allCheckbox.forEach((checkbox) => {
        if(checkbox.checked){
           checkCount++; 
        }
    });

    //special condition
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckbox.forEach((checkbox) => {
    checkbox.addEventListener('change' , handleCheckBoxChange())
});

const generatePass = document.querySelector(".btn");

//generate password 
generatePass.addEventListener('click' , () => {
    //if none of the checkbox is selected
    if(checkCount<=0){
        return;
    }

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    //remove previous response/password
    password = "";

    let funcArr = [];

    //put the stuff mentioned by checkbox
    if(uppercaseCheck.checked) {
        funcArr.push(getRandomUpperCase);
    }

   if(lowercaseCheck.checked){
    funcArr.push(getRandomLowerCase);
   }

   if(numberCheck.checked){
   funcArr.push(getRandomNumber);
   }

   if(symbolCheck.checked){
   funcArr.push(generateSymbol);
   }

   //compulsory addition
   for(let i = 0 ; i<funcArr.length ; i++){
      password += funcArr[i]();
   }

    //remaining addition
    for(let i=0 ; i<passwordLength-funcArr.length ; i++){
        let randIndx = getRandomInteger(0,funcArr.length);
        password += funcArr[randIndx]();
    }
    // password = shuffle(Array.from(password));

    //show in UI
    passwordDisplay.value = password;
    //calculate strength
    caclStrength();
})
