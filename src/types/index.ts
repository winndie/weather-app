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

export interface IWeatherDto {
	id : number,
    is_current : number, 
	serch_id : number,
   	serch_text : string|undefined,
	postcode : string|undefined,
	latitude : number|undefined,
	longitude : number|undefined,
	temperature_min : number|undefined,
	temperature_max : number|undefined,
	windspeed_min : number,
	windspeed_max : number,
	datetime : string,
	temperature : number,
	windspeed : number,
	winddirection : number,
	weathercode : number
}
