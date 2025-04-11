const btn = document.querySelector(".btn");

btn.addEventListener('click' , ()=>{
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        btn.textContent = "Disable Dark Mode 🌞";
    } else {
        btn.textContent = "Enable Dark Mode 🌙";
    }
})