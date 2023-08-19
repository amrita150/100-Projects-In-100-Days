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
const allCheckbox = document.querySelectorAll("input [type=checkbox]");

let password = "";
let passLen = 10;
let checkCount = 1;
//set circle color to grey




