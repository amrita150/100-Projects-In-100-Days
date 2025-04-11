const btn = document.getElementById("btn");
const box = document.getElementsByClassName("box");

const arr = ["1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];

btn.addEventListener('click', ()=>{
    let color = "#";
for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    color += arr[randomIndex];
}
    box[0].style.backgroundColor = color;
})