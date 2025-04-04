// script.js
const button = document.getElementById("colorButton");

function getRandomHexColor() {
    let hex = "#";
    let chars = "0123456789ABCDEF";
    for (let i = 0; i < 6; i++) {
        hex += chars[Math.floor(Math.random() * 16)];
    }
    return hex;
}

button.addEventListener("click", function () {
    let randomColor = getRandomHexColor();
    button.style.backgroundColor = randomColor;
});
