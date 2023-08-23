import { IRange, IWeather, IWeatherResult } from "../types"

export const mapCurrentWeather=(data):IWeather=>{
    return {
        datetime : data.time,
        temperature : data.temperature,
        windSpeed : data.windspeed,
        windDirection : data.winddirection,
        weatherCode : data.weathercode
    }
}

export const mapHourlyWeather=(data):IWeather[]=>{
    const result = [] as IWeather[]

    for (let i = 0; i < data.hourly.time.length; i++) {
        result.push({
                datetime : data.hourly.time[i],
                temperature : data.hourly.temperature_2m[i],
                windSpeed : data.hourly.windspeed_10m[i],
                windDirection : data.hourly.winddirection_10m[i],
                weatherCode : data.hourly.weathercode[i]
            })
    }

    return result
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

export const insertTableQuery=(weather:IWeatherResult)
    :string=>`INSERT INTO ${import.meta.env.VITE_DEFAULT_TABLE_NAME} (weather) VALUES (${JSON.stringify(weather)})`