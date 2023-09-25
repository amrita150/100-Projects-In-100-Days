const textField = document.querySelector('.text-field');
const heading = document.querySelector('.heading');
const inputCon = document.querySelector('.input-group');

// sign in 
const signIn = document.getElementById('sign-in');

function clickSignIn(){
    textField.classList.add('active');
    inputCon.classList.add('active');
    heading.innerHTML = 'Sign In';
    signUp.classList.add('disable');
    signIn.classList.remove('disable');
}

signIn.addEventListener('click' , clickSignIn);

// sign up 
const signUp = document.getElementById('sign-up');

function clickSignUp(){
    textField.classList.remove('active');
    inputCon.classList.remove('active');
    heading.innerHTML = 'Sign Up';
    signIn.classList.add('disable');
    signUp.classList.remove('disable');
}

signUp.addEventListener('click' , clickSignUp);


// form validation pending

// local storage pending
