// forecast.js is for interacting with the APIs

// Adding Forecast Class

class Forecast{
    // We don't need any arguments because each request is taking in the same properties below
    constructor(){
        this.key = 'PGoEgAHY7GiYxRnJBGMt9iwB7wSaFp0c';
        this.weatherURI = 'https://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURI = 'https://dataservice.accuweather.com/locations/v1/cities/search';
    }
    // We can bundle ALL of our methods inside this Forecast Class
    // Including UpdateCity from app.js
    // To indicate async method in a Class, add async in front of the method
    async updateCity(city){
        // We added 'this.' because getCity and getWeather are now methods on this class
        const cityDets = await this.getCity(city);
        const weather = await this.getWeather(cityDets.Key);
        return {cityDets, weather};
    }
    async getCity(city){
        // We don't need to define 'base' b/c it's in the cityURI
        // const base = 'https://dataservice.accuweather.com/locations/v1/cities/search';
        // Update to this.key b/c the key is defined in the Class
        const query = `?apikey=${this.key}&q=${city}`;
        // Again, base is now in cityURI so we call this.cityURI instead of base
        const response = await fetch(this.cityURI + query); 
        const data = await response.json();
        return data[0];
    }
    async getWeather(id){
        // We don't need to define 'base' b/c it's in the weatherURI
        // const base = 'https://dataservice.accuweather.com/currentconditions/v1/';
        const query = `${id}?apikey=${this.key}`;
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
        return data[0];
    };
};

// API Key from AccuWeather - Usage <= 50 Times/Day ONLY
// const key = 'PGoEgAHY7GiYxRnJBGMt9iwB7wSaFp0c';

// // !! UPDATE: COMMENTED OUT B/C ADDED METHOD TO FORECAST CLASS ABOVE
// // Get Weather Information
// // We want to pass through the City id(key) into the getWeather function
// const getWeather = async (id) => {

//     const base = 'https://dataservice.accuweather.com/currentconditions/v1/';
//     // There's no ? before id because it's part of the URL and not a query parameter
//     // The query parameter is just the apikey for the Current Conditions API Endpoint
//     const query = `${id}?apikey=${key}`;
//     const response = await fetch(base + query);
//     const data = await response.json();
//     return data[0];

// };
// !! UPDATE: COMMENTED OUT B/C ADDED METHOD TO FORECAST CLASS ABOVE
// Get City Information
// const getCity = async (city) => {
//     // Base URL off the API Endpoint that we want to make the request to
//     const base = 'https://dataservice.accuweather.com/locations/v1/cities/search';
//     // We also need the Query Parameters at the end
//     // ? indicates that we are adding query parameters at the end of the URL
//     // Instead of just a string with the pasted API Key, we create a template
//     // This way we embed the const and not the actual hardkeyed value
//     // Same process as above for the 'city'
//     const query = `?apikey=${key}&q=${city}`;
//     const response = await fetch(base + query); 
//     const data = await response.json();
//     // We're including the [0] to get the closest match for the city we're looking for
//     return data[0];
// };
