export interface ILocation {latitude:number,longitude:number}

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
