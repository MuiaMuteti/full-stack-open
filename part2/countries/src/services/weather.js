import axios from "axios"

const baseURL = 'https://api.weatherapi.com/v1'
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

const getCityWeather = (city) => {
    const request = axios.get(`${baseURL}/current.json?key=${API_KEY}&q=${city}`)
    return request.then(response => response.data)
}

export default getCityWeather