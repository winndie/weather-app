import { IWeatherResult, IWeatherResultDto } from "../types"

export const toWeatherResultDto=(entity:IWeatherResult,serchTtext:string,postCode:string|undefined):IWeatherResultDto=>{
    return {
        serchTtext:serchTtext,
        postCode:postCode??null,
        datetime:entity.datetime,
        lat:entity.location.lat,
        lng:entity.location.lng,
        temperature:entity.weather.temperature,
        windSpeed:entity.weather.windSpeed,
        windDirection:entity.weather.windDirection,
        weatherCode:entity.weather.weatherCode,
    }
}
