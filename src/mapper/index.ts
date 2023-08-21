import { IWeatherResult, IWeatherResultDto } from "../types"

export const toWeatherResultDto=(entity:IWeatherResult,serchTtext:string,postCode:string|undefined):IWeatherResultDto=>{
    return {
        serchTtext:serchTtext,
        postCode:postCode??null,
        datetime:entity.datetime,
        latitude:entity.location.latitude,
        longitude:entity.location.longitude,
        temperature:entity.weather.temperature,
        windSpeed:entity.weather.windSpeed,
        windDirection:entity.weather.windDirection,
        weatherCode:entity.weather.weatherCode,
    }
}
