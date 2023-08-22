export interface IRange {min:number, max:number}
export interface ILocation {latitude:number,longitude:number}

export interface IWeather {
    datetime: string,
    temperature:number,
    windSpeed:number,
    windDirection:number,
    weatherCode:number,
}

export interface IWeatherResult {
    searchText: string,
    postCode: string,
    location: ILocation,
    temperature: IRange,
    windSpeed: IRange,
    currentWeather: IWeather,
    hourlyWeather: IWeather[]
}

export interface IWeatherResultDto extends ILocation, IWeather {
    serchTtext: string,
    postCode: string|null,
    datetime: string,
}
