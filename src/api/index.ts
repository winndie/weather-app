import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { ILocation, IRange, IWeather,IWeatherResult } from '../types'
import axios from 'axios'
import { addWeatherList, setWeatherLoading } from '../store/weather'
import {insertQuery, mapCurrentWeather, mapHourlyWeather, mapTemperatureRange, mapWindSpeedRange} from '../mapper'
import { invalidPostcodeRegex, selectQuery } from '../constants'
import {createTableQuery} from '../constants'
import { SQLiteDBConnection} from 'react-sqlite-hook'
import { Capacitor } from '@capacitor/core'
import { sqlite } from '../pages/home'

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

async function getDbConnection():Promise<SQLiteDBConnection|undefined>{

    let db = undefined as SQLiteDBConnection|undefined
    const platform = Capacitor.getPlatform()
    
    if(platform === 'android' || platform === 'ios')
    {
        if(!(await sqlite.isDatabase(import.meta.env.VITE_DEFAULT_DB_NAME)).result)
        {
            await sqlite.copyFromAssets()
        }

        db = (await sqlite.isConnection(import.meta.env.VITE_DEFAULT_DB_NAME)).result?
        await sqlite.retrieveConnection(import.meta.env.VITE_DEFAULT_DB_NAME)
        :
        await sqlite.createConnection(import.meta.env.VITE_DEFAULT_DB_NAME)    
    
        if(!(await db.isDBOpen()).result)
        {
            await db.open()
        }
    
        if(!(await db.isTable(import.meta.env.VITE_DEFAULT_TABLE_NAME)).result)
        {
            await db.execute(createTableQuery)
        }
    }

    return db
} 

export const readFromDB = createAsyncThunk<void,void,{state:RootState}>(
    'weather/retrieve',
    async (_, thunkAPI) => {
        try{
            setWeatherLoading(true) 
            const conn = await getDbConnection()
            if(conn)
            {
                const resp = await conn.query(selectQuery)
                resp.values?.map(x=>thunkAPI.dispatch(addWeatherList( JSON.parse(x.weather) )))
            }           
        }catch(e){
        }finally{
            await sqlite.closeAllConnections()
            setWeatherLoading(false)
        }
    }
)

export const getWeatherBySearchText = createAsyncThunk<void,{searchText:string},{state:RootState}>(
    'weather/postcode/get',
    async (request, thunkAPI) => {
        try{
            setWeatherLoading(true)            
            const isPostCode = !(new RegExp(invalidPostcodeRegex).test(request.searchText))

            if(isPostCode)
            {
                const weather = await getWeatherByLocation(await getLocationByPostcode(request.searchText))
                if(weather && weather.hourlyWeather.length>0)
                {
                    weather.searchText = request.searchText
                    weather.postCode = request.searchText
                    thunkAPI.dispatch(addWeatherList( weather ))

                    const conn = await getDbConnection()
                    if(conn)
                    {
                        await conn.executeSet(insertQuery(weather))
                    }           
                }    
            }

        }catch(e){
        }finally{
            await sqlite.closeAllConnections()
            setWeatherLoading(false)
        }
    }
)