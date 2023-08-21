import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { ILocation, IWeather,IWeatherResult, IWeatherResultDto } from '../types'
import { setCurrentLocation,setAppLoading } from '../store/app'
import { Geolocation } from '@capacitor/geolocation'
import axios from 'axios'
import { addWeatherList, setWeatherLoading } from '../store/weather'

const getCurrentLocation = createAsyncThunk<void,void,{state:RootState}>(
    'location/current/get',
    async (_, thunkAPI) => {
        try{
            setAppLoading(true)
            const result = {location:{} as ILocation}
            const resp = await Geolocation.getCurrentPosition()
            if(resp.coords)
            {
                result.location.latitude = resp.coords.latitude
                result.location.longitude = resp.coords.longitude
                setCurrentLocation(result.location)
            }

        }catch(e){

        }finally{
            setAppLoading(false)
        }
    }
)

export const getWeatherBySearchText = createAsyncThunk<void,{searchText:string,isPostcode:boolean},{state:RootState}>(
    'weather/postcode/get',
    async (request, thunkAPI) => {
        try{
            setWeatherLoading(true)
            const result = {} as IWeatherResultDto 
            const weather = await getWeatherByLocation(await getLocationByPostcode(request.searchText))
            thunkAPI.dispatch(addWeatherList( weather ))
        }catch(e){

        }finally{
            setWeatherLoading(false)
        }
    }
)

export async function getWeatherByLocation(location:ILocation):Promise<IWeatherResult>{
    const result = {
        location : {} as ILocation,
        weather : {} as IWeather
    } as IWeatherResult
    const request = `${import.meta.env.VITE_OPEN_METEO_URL}?current_weather=true&latitude=${location.latitude}&longitude=${location.longitude}`
    const resp = await axios.get(request)
    if(resp.status === 200 && resp.data.current_weather)
    {
        result.location.latitude = location.latitude
        result.location.longitude = location.longitude
        result.datetime = resp.data.current_weather.time
        result.weather.temperature = resp.data.current_weather.temperature
        result.weather.windSpeed = resp.data.current_weather.windspeed
        result.weather.windDirection = resp.data.current_weather.winddirection
        result.weather.weatherCode = resp.data.current_weather.weathercode
    }
    return result
}

export async function getLocationByPostcode(postcode:string):Promise<ILocation>{
    const result = {} as ILocation
    const request = `${import.meta.env.VITE_POSTCODE_IO_URL}${postcode.replace(' ','')}`
    const resp = await axios.get(request)
    if(resp.status === 200)
    {
        result.latitude = resp.data.result.latitude
        result.longitude = resp.data.result.longitude
    }
    return result
}