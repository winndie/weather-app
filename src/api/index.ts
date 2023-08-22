import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { ILocation, IRange, IWeather,IWeatherResult, IWeatherResultDto } from '../types'
import { setCurrentLocation,setAppLoading } from '../store/app'
import { Geolocation } from '@capacitor/geolocation'
import axios from 'axios'
import { addWeatherList, setWeatherLoading } from '../store/weather'
import {insertTableQuery, mapCurrentWeather, mapHourlyWeather, mapTemperatureRange, mapWindSpeedRange} from '../mapper'
import { postcodeRegex } from '../constants'
import {
    SQLiteDBConnection,
    SQLiteConnection,
    CapacitorSQLite,
  } from "@capacitor-community/sqlite"
import {createTableQuery} from '../constants'

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

export const getWeatherBySearchText = createAsyncThunk<void,{searchText:string},{state:RootState}>(
    'weather/postcode/get',
    async (request, thunkAPI) => {
        try{
            setWeatherLoading(true)            
            const isPostCode = new RegExp(postcodeRegex).test(request.searchText)

            if(isPostCode)
                return

            const weather = await getWeatherByLocation(await getLocationByPostcode(request.searchText))
            if(weather && weather.hourlyWeather.length>0)
            {
                weather.searchText = request.searchText
                weather.postCode = request.searchText
                thunkAPI.dispatch(addWeatherList( weather ))
                const qyery = insertTableQuery(weather,thunkAPI.getState().weather.list.length)
                console.error(qyery)
            }
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

export async function getLocationBySearchText(searchText:string):Promise<ILocation>{
    const result = {} as ILocation
    const request = `${import.meta.env.VITE_GEOCODE_MAPS_URL}${searchText}`
    const resp = await axios.get(request)
    if(resp.status === 200)
    {
        result.latitude = resp.data.result.latitude
        result.longitude = resp.data.result.longitude
    }
    return result
}

export async function writeToDb(weather:IWeatherResult){
    try{
        const conn = new SQLiteConnection(CapacitorSQLite)
        ;(await conn.createConnection(import.meta.env.VITE_DEFAULT_DB_NAME,false,'no-encryption',1,false))
        .execute(createTableQuery)
        .then(resp=>{
        })

        if(conn != null)
        {
            conn.closeAllConnections()
        }
    }catch(e){

    }finally{
    }
}