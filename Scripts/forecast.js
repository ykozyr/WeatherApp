// forecast.js is for interacting with the APIs


// API Key from AccuWeather - Usage <= 50 Times/Day ONLY
const key = 'PGoEgAHY7GiYxRnJBGMt9iwB7wSaFp0c';

// Get Weather Information
// We want to pass through the City id(key) into the getWeather function
const getWeather = async (id) => {

    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    // There's no ? before id because it's part of the URL and not a query parameter
    // The query parameter is just the apikey for the Current Conditions API Endpoint
    const query = `${id}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];

};
// Get City Information
const getCity = async (city) => {
    // Base URL off the API Endpoint that we want to make the request to
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search'
    // We also need the Query Parameters at the end
    // ? indicates that we are adding query parameters at the end of the URL
    // Instead of just a string with the pasted API Key, we create a template
    // This way we embed the const and not the actual hardkeyed value
    // Same process as above for the 'city'
    const query = `?apikey=${key}&q=${city}`;
    
    const response = await fetch(base + query); 
    const data = await response.json();
    // We're including the [0] to get the closest match for the city we're looking for
    return data[0];
};
