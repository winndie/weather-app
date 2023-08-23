import { IRange, IWeather, IWeatherDto, IWeatherResult } from "../types"

export const mapDtoToHourlyWeather=(dto:IWeatherDto):IWeather=>{
    return {
        datetime : dto.datetime,
        temperature : dto.temperature,
        windSpeed : dto.windspeed,
        windDirection : dto.winddirection,
        weatherCode : dto.weathercode
    }
}

export const mapDtoToCurrentWeatherResult=(dto:IWeatherDto):IWeatherResult=>{
    const result = {
        searchText:dto.serch_text,
        postCode:dto.postcode,
        location:{latitude:dto.latitude,longitude:dto.longitude},
        temperature:{min:dto.temperature_min,max:dto.temperature_max},
        windSpeed:{min:dto.windspeed_min,max:dto.windspeed_max},
        currentWeather:{
            datetime: dto.datetime,
            temperature: dto.temperature,
            windSpeed : dto.windspeed,
            windDirection : dto.winddirection,
            weatherCode : dto.weathercode
        },
        hourlyWeather:[]
    }
    return result as IWeatherResult
}

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

export const insertTableQuery=(weather:IWeatherResult,searchId:number):string=>{

    let valuesQuery = `(${searchId},1,
        '${weather.searchText}',
        '${weather.postCode}',
        ${weather.location.latitude},
        ${weather.location.longitude},
        ${weather.temperature.min},
        ${weather.temperature.max},
        ${weather.windSpeed.min},
        ${weather.windSpeed.max},
        '${weather.currentWeather.datetime}',
        ${weather.currentWeather.temperature},
        ${weather.currentWeather.windSpeed},
        ${weather.currentWeather.windDirection},
        ${weather.currentWeather.weatherCode}
    ),`
    valuesQuery = valuesQuery + weather.hourlyWeather.map(x=>`(${searchId},0,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        '${x.datetime}',
        ${x.temperature},
        ${x.windSpeed},
        ${x.windDirection},
        ${x.weatherCode}
    )`).join(`,`)    

    valuesQuery = valuesQuery.substring(0,valuesQuery.length)

    return `INSERT INTO ${import.meta.env.VITE_DEFAULT_TABLE_NAME} 
    (is_current,serch_id,serch_text,postcode,latitude,longitude,datetime,temperature,windspeed,winddirection,weathercode)
    VALUES ${valuesQuery}`
}