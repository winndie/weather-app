export interface ILocation {lat:number,lng:number}

export enum WeatherCode{
    clear = 0,
    partlyCloudy=1,
    mostlyCloudy=2,
    overcast=3,
    snow=6,
    ice=7,
    rain=9,    
    thunderstorm=20,
    tornado=30
}

export interface IWeather {
    temperature:number,
    windSpeed:number,
    windDirection:number,
    weatherCode:number,
}

export interface IWeatherResult {
    searchText: string,
    postCode: string,
    location: ILocation,
    datetime: string,
    weather: IWeather
}

export interface IWeatherResultDto extends ILocation, IWeather {
    serchTtext: string,
    postCode: string|null,
    datetime: string,
}
