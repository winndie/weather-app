import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { ILocation, IRange, IWeather,IWeatherDto,IWeatherResult } from '../types'
import { setCurrentLocation,setAppLoading } from '../store/app'
import { Geolocation } from '@capacitor/geolocation'
import axios from 'axios'
import { addWeatherList, setWeatherLoading } from '../store/weather'
import {insertTableQuery, mapCurrentWeather, mapDtoToCurrentWeatherResult, mapDtoToHourlyWeather, mapHourlyWeather, mapTemperatureRange, mapWindSpeedRange} from '../mapper'
import { postcodeRegex, selectQuery } from '../constants'
import {createTableQuery} from '../constants'
import { SQLiteDBConnection} from 'react-sqlite-hook'
import { Capacitor } from '@capacitor/core'
import { sqlite } from '../pages/home'

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
                await writeToDb(weather,thunkAPI.getState().weather.list.length)
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

export async function writeToDb(weather:IWeatherResult,searchId:number):Promise<boolean>{
    let result = false as boolean
    try{
        const platform = Capacitor.getPlatform()

        if(platform === 'android' || platform === 'ios')
        {
            const db: SQLiteDBConnection = (await sqlite.isConnection(import.meta.env.VITE_DEFAULT_DB_NAME)).result?
            await sqlite.retrieveConnection(import.meta.env.VITE_DEFAULT_DB_NAME)
            :
            await sqlite.createConnection(import.meta.env.VITE_DEFAULT_DB_NAME)    
        
            if(!(await db.isDBOpen()).result)
            {
                await db.open()
            }
        
            if(!(await db.isTable(import.meta.env.VITE_DEFAULT_TABLE_NAME)).result)
            {
                const resp = await db.execute(createTableQuery)
            }

            if((await db.isExists()).result)
            {
                await db.execute(insertTableQuery(weather))
            }    
    }
    }catch(e){
    }finally{
        return result
    }
}

export const retrieveWeatherFromDb = createAsyncThunk<void,void,{state:RootState}>(
    'weather/retrieve',
    async (_, thunkAPI) => {
        try{
            setWeatherLoading(true)            
            const platform = Capacitor.getPlatform()

            if(platform === 'android' || platform === 'ios')
            {
                const db: SQLiteDBConnection = (await sqlite.isConnection(import.meta.env.VITE_DEFAULT_DB_NAME)).result?
                await sqlite.retrieveConnection(import.meta.env.VITE_DEFAULT_DB_NAME)
                :
                await sqlite.createConnection(import.meta.env.VITE_DEFAULT_DB_NAME)
                
                sqlite.copyFromAssets(true)
            
                if(!(await db.isDBOpen()).result)
                {
                    await db.open()
                }
            
                if((await db.isTable(import.meta.env.VITE_DEFAULT_TABLE_NAME)).result)
                {
                    const resp = await db.query(selectQuery)
                    resp.values?.map(x=>thunkAPI.dispatch(addWeatherList( x )))
                }
        }
        }catch(e){
        }finally{
            setWeatherLoading(false)
        }
    }
)
