// API key to be added here
const apiKey = "";

// Base URL for the API
const apiURL = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input"); 
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city) {
    // `fetch` sends an HTTP GET request to the provided URL and returns a Promise using const variables in template string
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);

    if (response.status == 404){
        document.querySelector(".error").style.display ="block"
        document.querySelector(".weather").style.display =""
    } 

    else{
        
    let data = await response.json(); //Stores the JSON data in the data variable as a JavaScript object, allowing you to access specific parts of the API
    console.log(data);

    //Updates the selected element with json data we fetched from API
    document.querySelector(".city").innerHTML=data.name;
    document.querySelector(".temp").innerHTML=Math.round(data.main.temp) + "°C";; 
    document.querySelector(".humidity").innerHTML=data.main.humidity + " %";
    document.querySelector(".wind").innerHTML=data.wind.speed + " km/h";


    if (data.weather[0].main == "Clouds"){
    weatherIcon.src ="images/clouds.png";
    }

    else if (data.weather[0].main == "Clear"){
        weatherIcon.src ="images/clear.png";
        }

    else if (data.weather[0].main == "Rain"){
        weatherIcon.src ="images/rain.png";
        }       

     else if (data.weather[0].main == "Drizzle"){
        weatherIcon.src ="images/drizzle.png";
        } 
        
    else if (data.weather[0].main == "Mist"){
         weatherIcon.src ="images/mist.png";
        } 
    else {
    weatherIcon.src = "images/clear.png";
        }

    document.querySelector(".weather").style.display =("block")
    document.querySelector(".error").style.display =("none")
    }
}     
    
searchBtn.addEventListener("click", ()=>{ //Calls weather function when button is clicked and takes searchbox input as city parameter
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {  // Check if Enter key is pressed
        checkWeather(searchBox.value);
    }
});


