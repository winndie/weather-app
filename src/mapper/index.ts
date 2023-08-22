import { IRange, IWeather } from "../types"

export const mapCurrentWeather=(data):IWeather=>{
    return {
        datetime : data.time,
        temperature : data.temperature,
        windSpeed : data.windspeed,
        windDirection : data.winddirection,
        weatherCode : data.weathercode
    }
}

export const mapTemperatureRange=(data):IRange=>{
    return {
        min: data.daily.temperature_2m_min[0],
        max: data.daily.temperature_2m_max[0]
    }
}

export const mapWindSpeedRange=(data):IRange=>{
    return {
        min: data.daily.windspeed_10m_max[0],
        max: data.daily.windspeed_10m_min[0]
    }
}