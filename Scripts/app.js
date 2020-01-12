// app.js is for DOM manipulation
// forecast.js will finish running prior to app.js; ahead in html

const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
// We want the image with a class of time
const time = document.querySelector('img.time');
// div with class of icon and the image inside of that div
const icon = document.querySelector('.icon img');

// We're updating the user view with the input/retrieved values
// Created local consts of the data from getCity and getWeather data
// Local consts just provide ease of use for the programming end
// Then we included a template to update the details class in HTML
// We looked at the console to see the specific values we needed from our data
const updateUI = (data) => {
    // Destructure properties
    // The constants must be the same name as the property of the object
    // Tells JS to get the cityDets property from the data object
    // Also to get the weather property from the data object
    const {cityDets, weather} = data;

    // Update Details Template
    details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="temp display-4 my-4">
        <span>${weather.Temperature.Imperial.Value}&deg F</span>
    </div>
    `;
    // update the night/day & icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
    
    // Ternary Operator
    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';

     time.setAttribute('src', timeSrc);

    // remove the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
    };


// We're externalizing the function and calling it below later
// Within the function, we'll be calling getCity and getWeather
const updateCity = async (city) => {
    // Here we get city details from getCity using the user input 'city'
    const cityDets = await getCity(city);
    // Here, we pass the city Key from getCity to getWeather 
    // We thus will get the weather for that city Key
    const weather = await getWeather(cityDets.Key);
    
    // We're returning data in the form of an object with the city and the weather
    return {cityDets, weather};
};

// Here, we're listening for a user submitting a typed city value on the app
cityForm.addEventListener('submit', e => {
    // Prevent default webpage refresh
    e.preventDefault();
    // Get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // Update the UI with the new city
    // Because async returns promises, we can tack on a .then method
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    // Set Local Storage
    localStorage.setItem('city', city);
});

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}