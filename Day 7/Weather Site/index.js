// API Key
const API_KEY = "e15435aa794529fb9fda9fbd0287cade";

// Tab Switching 
const userTab = document.querySelector('[data-userWeather]');
const searchTab = document.querySelector('[data-searchWeather]');
const userContainer = document.querySelector(".container");
const grantAccessContainer = document.querySelector(".grant-container");

const searchForm = document.querySelector("[data-searchForm");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".weather-container");
const notFound = document.querySelector('.error-container');
const errorBtn = document.querySelector('[data-errorButton]');
const errorText = document.querySelector('[data-errorText]');
const errorImage = document.querySelector('[data-errorImg]');

//initaially variable need ??

let currentTab = userTab;
currentTab.classList.add("current-tab");


//ek kaam or pending hai??

function switchTab(clickedTab) {
    if(clickedTab!=currentTab){
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        clickedTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")){
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        
        else{
            //main weather is present
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            //co-ordinated apna aap visible
            getfromSessionStorage();
        }
    }
}

userTab.addEventListener('click' , () => {
    switchTab(userTab);

});


searchTab.addEventListener("click" , () => {
    switchTab(searchTab);

});

function getfromSessionStorage(){
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        grantAccessContainer.classList.add("active");

    }
    else{
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates){
    const{lat , lon} = coordinates;
    //make grant container invisibvle
    grantAccessContainer.classList.remove("active");
    //make loader visible
    loadingScreen.classList.add("active");
    
    //Api call
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        const data = await response.json();
        if (!data.sys) {
            throw data;
        }
        
    loadingScreen.classList.remove("active");
    userInfoContainer.classList.add("active");
    renderWeatherInfo(data);
    }

    catch(e){
        loadingScreen.classList.remove('active');
        notFound.classList.add('active');
        errorImage.style.display = 'none';
        errorText.innerText = `Error: ${err?.message}`;
        errorBtn.style.display = 'block';
        errorBtn.addEventListener("click", fetchUserWeatherInfo);
    }
}

// Render Weather On UI

const cityName = document.querySelector('[data-cityName]');
const countryFlag = document.querySelector('[data-countryFlag]');
const weatherDesc = document.querySelector('[data-weatherDesc]');
const weatherIcon = document.querySelector('[data-weatherIcon]');
const temprature = document.querySelector('[data-temp]');
const windspeed = document.querySelector('[data-windSpeed]');
const humidity = document.querySelector('[data-humidity]');
const clouds = document.querySelector('[data-clouds]');

function renderWeatherInfo(weatherInfo){
    cityName.innerText = weatherInfo?.name; 
    countryFlag.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    weatherDesc.innerText = weatherInfo?.weather?.[0]?.description;

    weatherIcon.src =`http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temprature.innerText = `${weatherInfo?.main?.temp.toFixed(2)} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed.toFixed(2)} m/s`;

    humidity.innerText = `${weatherInfo?.main?.humidity.toFixed(2)} %`;
    clouds.innerText = `${weatherInfo?.clouds?.all.toFixed(2)} %`;
}

// grant access
const grantAccessButton = document.querySelector('[data-grant-access]');

function getLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }

    else {
        // grantAccessButton.style.display = 'none';
        alert("Geolocation is not supported");
    }
}

function showPosition(position) {
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
    }; 
    
    sessionStorage.setItem("user-coordinate" , JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);

}

grantAccessButton.addEventListener('click', getLocation);

// Search for weather
const searchInput = document.querySelector('[data-searchInput]');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if(searchInput.value === ""){
        return;
    }
        fetchSearcWeatherInfo(searchInput.value);
        searchInput.value = "";
} );

async function fetchSearcWeatherInfo(city){
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

        const data = await response.json();
        if (!data.sys) {
            throw data;
        }

        loadingScreen.classList.remove('active');
        userInfoContainer.classList.add('active');
        console.log("hi");
        renderWeatherInfo(data);
    }
        catch (err){
        loadingScreen.classList.remove('active');
        userInfoContainer.classList.remove('active');
        notFound.classList.add('active');
        errorText.innerText = `${err?.message}`;
        errorBtn.style.display = "none";
        }
    
}

