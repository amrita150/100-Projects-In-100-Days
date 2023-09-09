const shareBtn = document.querySelector(".btn");
const mediaIcons = document.querySelector(".social-media-icons");

shareBtn.addEventListener('click' , () => {
   if(!mediaIcons.classList.contains("active")){
    mediaIcons.classList.add("active");
   }else{
    mediaIcons.classList.remove("active");
   }
});
