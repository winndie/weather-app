import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { ILocation, IRange, IWeather,IWeatherResult, IWeatherResultDto } from '../types'
import { setCurrentLocation,setAppLoading } from '../store/app'
import { Geolocation } from '@capacitor/geolocation'
import axios from 'axios'
import { addWeatherList, setWeatherLoading } from '../store/weather'
import {mapCurrentWeather, mapHourlyWeather, mapTemperatureRange, mapWindSpeedRange} from '../mapper'

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
        location: {} as ILocation,
        temperature: {} as IRange,
        windSpeed: {} as IRange,
        currentWeather: {} as IWeather,
        hourlyWeather: [] as IWeather[]
        } as IWeatherResult
    const request = `${import.meta.env.VITE_OPEN_METEO_URL}latitude=${location.latitude}&longitude=${location.longitude}`
    const resp = await axios.get(request)
    if(resp.status === 200)
    {
        result.location.latitude = location.latitude
        result.location.longitude = location.longitude
        result.currentWeather = mapCurrentWeather(resp.data.current_weather)
        result.hourlyWeather = mapHourlyWeather(resp.data)
        result.temperature = mapTemperatureRange(resp.data)
        result.windSpeed = mapWindSpeedRange(resp.data)
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
