import { useEffect, useState } from "react"
import getCityWeather from "../services/weather"

const Weather = ({ city }) => {
    const [weather, setWeather] = useState(null)
    useEffect(() => {
        getCityWeather(city).then(response => {
            console.log(response)
            setWeather(response.current)
        }).catch(error => {
            console.log(`[${error.message}]: Could not fetch weather data`)
        })
    }, [])
    
    return (
        weather === null? 
            (<p>Fetching weather data</p>) :
            (<div>
                <h2>Weather in {city}</h2>
                <p>Temperature {weather.temp_c} Celcius</p>
                <img src={weather.condition.icon} alt={weather.condition.text} />
                <p>Wind {(weather.wind_kph / 3.6).toFixed(2)} m/s</p>
            </div>)
    )
}

export default Weather