import axios from 'axios'

const countriesBaseUrl = "https://restcountries.com/v3.1/all?fields=name,capital,area,languages,flag"
const weatherBaseUrl = "https://api.openweathermap.org/data/2.5/weather"
const weatherBaseIconUrl = "https://openweathermap.org/payload/api/media/file/"

const getCountries = () => {
    return axios.get(countriesBaseUrl).then(response => response.data)
}

const getWeatherForCapital = capital => {
    return axios.get(`${weatherBaseUrl}?q=${capital}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`)
        .then(response => {
            return {
                temperature: response.data.main.temp,
                windSpeed: response.data.wind.speed,
                iconUrl: `${weatherBaseIconUrl}${response.data.weather[0].icon}@2x.png`,
                weatherDescription: response.data.weather[0].description
            }
        })
}

export default { getCountries, getWeatherForCapital }