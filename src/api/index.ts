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
                result.location.lat = resp.coords.latitude
                result.location.lng = resp.coords.longitude
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
            const weather = await getCurrentWeatherByLocation(await getLocationByPostcode(request.searchText))
            thunkAPI.dispatch(addWeatherList( weather ))
        }catch(e){

        }finally{
            setWeatherLoading(false)
        }
    }
)

export async function getCurrentWeatherByLocation(location:ILocation):Promise<IWeatherResult>{
    const result = {
        location : {} as ILocation,
        weather : {} as IWeather
    } as IWeatherResult
    const request = `${process.env.REACT_APP_OPEN_METEO_URL}?current_weather=true&latitude=${location.lat}&longitude=${location.lng}`
    const resp = await axios.get(request)
    if(resp.status === 200 && resp.data.current_weather)
    {
        result.location.lat = location.lat
        result.location.lng = location.lng
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
    const request = `${process.env.REACT_APP_POSTCODE_IO_URL}${postcode.replace(' ','')}`
    const resp = await axios.get(request)
    if(resp.status === 200)
    {
        result.lat = resp.data.result.latitude
        result.lng = resp.data.result.longitude
    }
    return result
}