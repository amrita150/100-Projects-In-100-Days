const toggleSwitch = document.querySelector('input[type="checkbox"]');

// switch theme dynamically
function switchTheme(event){
    if(event.target.checked){
        document.documentElement.setAttribute('data-theme' , 'dark');
        localStorage.setItem('theme' , 'dark');
        darkMode();
    } else{
        document.documentElement.setAttribute('data-theme' , 'light');
        localStorage.setItem('theme' , 'light');
        lightMode();
    }
}

// event listner
toggleSwitch.addEventListener('change' , switchTheme);

const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textBox = document.getElementById('text-box');
const toggleText = document.querySelector('.toggle-text');
const icon = document.querySelector('.fas');

// function darkMode(){
//     nav.style.backgroundColor = 'rgb(0 0 0 / 50%)';
//     textBox.style.backgroundColor = 'rgb(255 255 255 / 50%)';
//     toggleText.innerHTML = 'Dark Mode'; 
//     icon.classList.remove('fa-sun');
//     icon.classList.add('fa-moon');
//     image1.src = '/img/undraw_proud_coder_dark.svg';
//     image2.src = '/img/undraw_programming_dark.svg';
//     image3.src = '/img/undraw_conceptual_idea_dark.svg'
    
// }

// function lightMode(){
//     nav.style.backgroundColor = 'rgb(255 255 255 / 50%)';
//     textBox.style.backgroundColor = 'rgb(0 0 0 / 50%)';
//     toggleText.innerHTML = 'Light Mode'; 
//     icon.classList.remove('fa-moon');
//     icon.classList.add('fa-sun');
//     image1.src = '/img/undraw_proud_coder_light.svg';
//     image2.src = '/img/undraw_programming_light.svg';
//     image3.src = '/img/undraw_conceptual_idea_light.svg'
// }


//we can also use template literal to convert this into dry code (less repetition)

// dark or light images
function imageMode(color){
    image1.src = `/img/undraw_proud_coder_${color}.svg`;
    image2.src = `/img/undraw_programming_${color}.svg`;
    image3.src = `/img/undraw_conceptual_idea_${color}.svg`;
}

function darkMode(){
    nav.style.backgroundColor = 'rgb(0 0 0 / 50%)';
    textBox.style.backgroundColor = 'rgb(255 255 255 / 50%)';
    toggleText.innerHTML = 'Dark Mode'; 
    icon.classList.replace('fa-sun' , 'fa-moon');
    imageMode('dark');    
}

function lightMode(){
    nav.style.backgroundColor = 'rgb(255 255 255 / 50%)';
    textBox.style.backgroundColor = 'rgb(0 0 0 / 50%)';
    toggleText.innerHTML = 'Light Mode'; 
    icon.classList.replace('fa-moon' , 'fa-sun');
    imageMode('light');   
}


//we dont want it to default it to light mode

// check local storage for theme

const currentTheme = localStorage.getItem('theme');
if(currentTheme){
    document.documentElement.setAttribute('data-theme' , currentTheme);

    if(currentTheme ==='dark'){
        toggleSwitch.checked = true;
        darkMode();
    }
}