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

export interface ICurrentWeather {
    temperature:number,
    windspeed:number,
    winddirection:number,
    weatherCode:number,
}