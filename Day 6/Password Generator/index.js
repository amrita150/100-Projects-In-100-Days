const inputSlider = document.querySelector("[data-length-slider]");
const lengthDisplay = document.querySelector("[data-length-num]");
const uppercaseCheck = document.querySelector("#uppercase"); 
const lowercaseCheck = document.querySelector("#lowercase");
const symbolCheck = document.querySelector("#symbol");
const numberCheck = document.querySelector("#number");
const generatePass = document.querySelector(".btn");
const indicator = document.querySelector("[data-indicator]");

// Generate Random Letters and Number and Symbols
const symbols = '~`!@#$%^&*()_-+=:;"<,>.?/|\}{][';

let password = "";
let passLen = 10;

//set circle color to grey
handleSlider();
//set password length
function handleSlider(){
    inputSlider.value = passLen;
    lengthDisplay.innerText = passLen;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passLen-min)*100/(max-min)) + "% 100%";
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

console.log("randowm addition");

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

//copy Message
const copyBtn = document.querySelector(".copybtn");
const copyMsg = document.querySelector("[data-copyMsg]");
const passwordDisplay = document.querySelector("[data-password-display]");

async function copyToClipboard() {
    try {
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



inputSlider.addEventListener('input' , (e) => {
    passLen = e.target.value;
    handleSlider();
})

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

console.log("shuffle addition");
// Password Generate 

// By Default UpperCase Checked 
// uppercase.checked = true;

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
    if(passLen < checkCount){
        passLen = checkCount;
        handleSlider();
    }
}

allCheckbox.forEach((checkbox) => {
    checkbox.addEventListener('change' , handleCheckBoxChange())
})


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

    let arrFunc = [];

    //put the stuff mentioned by checkbox
    if(uppercaseCheck.checked) {
        arrFunc.push(getRandomUpperCase);
    }

   if(lowercaseCheck.checked){
    arrFunc.push(getRandomLowerCase);
   }

   if(numberCheck.checked){
   arrFunc.push(getRandomInteger);
   }

   if(symbolCheck.checked){
   arrFunc.push(generateSymbol);
   }

   //compulsory addition
   for(let i = 0 ; i<arrFunc.length ; i++){
    password += arrFunc[i]();
   }

   console.log("pass addition");
    //remaining addition
    for(let i=0 ; i<passLen-arrFunc.length ; i++){
        let randIndx = getRandomInteger(0,arrFunc.length);
        password += arrFunc[randIndx]();
    }

    console.log("remain addition");
    password = shufflePassword(Array.from(password));
    console.log("shuffle");

    //show in UI
    passwordDisplay.value = password;
    console.log("ui addition");
    //calculate strength
    caclStrength();
})

