const submitContainer = document.querySelector(".submit-container");
const thankYouCont = document.querySelector(".thankU-container");

submitContainer.classList.add("active");

const rateOne = document.querySelector(".rate-1");
const rateTwo = document.querySelector(".rate-2");
const rateThree = document.querySelector(".rate-3");
const rateFour = document.querySelector(".rate-4");
const rateFive = document.querySelector(".rate-5");
const msg = document.querySelector('[data-ratingInfo]');


const ratingButtons = [rateOne, rateTwo, rateThree, rateFour, rateFive];
console.log(ratingButtons.length);

ratingButtons.forEach((button , index) => {
    button.addEventListener('click' , function(){
        checkRating(index+1);
    });
});

function checkRating(selectedRating){
    console.log(selectedRating);
    for (let index = 1; index <=5; index++) {
        if(index==selectedRating){
            ratingButtons[index-1].classList.add("selectedRating");
        }else{
            ratingButtons[index-1].classList.remove("selectedRating");
        }
    }

    if(selectedRating >= 1){
        msg.innerHTML = `You Selected ${selectedRating} out of 5`;
    } else{
        msg.innerHTML = `You Selected 0 out of 5`;
    }
}

const submitBtn = document.querySelector(".btn-cont");
const ratingBtn = document.querySelector(".rate-btn");

submitBtn.addEventListener('click' , function(){
    
    thankYouCont.classList.add("active");
    submitContainer.classList.remove("active");
});