import React, { useMemo } from 'react'
import {
  Card,
  Icon,
} from 'framework7-react'
import { setStyleValue } from '../css'
import { monthNames, weatherCode } from '../constants'
import { IRange, IWeather } from '../types'

const WeatherBox:React.FC<{weather:IWeather,temperature:IRange, isCurrent:boolean}> = (props) => {
  const defaultWeatherCode = parseInt(import.meta.env.VITE_DEFAULT_WEATHER_CODE)
  const windDirectionIcon = 'arrow_up'
  const weatherCodeDto =  weatherCode.has(props.weather.weatherCode)?
                          weatherCode.get(props.weather.weatherCode):
                          weatherCode.get(defaultWeatherCode)

  const temperatureDiv = () => {

    const date = new Date(props.weather.datetime)
    const currentDate = date.getDate()
        + ' ' + monthNames.get(date.getMonth())
        + ', ' + props.weather.datetime.substring(props.weather.datetime.length-5)

    const hour = props.weather.datetime.substring(props.weather.datetime.length-5)

    if(!props.isCurrent){
        const max = props.weather.temperature/((props.temperature.max-props.temperature.min)/10)
        setStyleValue('temperature-max',max,'')    
    }

    return (<div className='text-center'>
    <div>{props.isCurrent?currentDate:hour}</div>
    <div><span >{props.weather.temperature}</span><abbr className='temperature-unit'>&#8451;</abbr></div>
    </div>)
  }

  const weatherCodeDiv = () => <div className='text-center'>
    <Icon f7={weatherCodeDto?.icon} ios={'f7:'+weatherCodeDto?.icon}></Icon>
    <div>{weatherCodeDto?.name}</div>
    </div>

  const windspeedDiv = () => {
    setStyleValue('angle',props.weather.windDirection,'deg')

    return (
        <div className='text-center'>
        <Icon f7={windDirectionIcon} ios={'f7:'+windDirectionIcon} className='wind-direction'/>
        <div><span >{props.weather.windSpeed}</span><abbr className='windspeed-unit'>km/h</abbr></div>
        </div>    
    )
  }
    
  return (
    props.isCurrent?
    <Card className={'padding margin align-self-center'}>

    <div className='grid grid-cols-1 medium-grid-cols-2 grid-gap'>
        {temperatureDiv()}
        {weatherCodeDiv()}
    </div>

    <div className='items-center text-center'>
        {windspeedDiv()}
    </div>

    </Card>
    :
    <Card className={'temperature-gradient padding align-self-center'}>
        {temperatureDiv()}
        {weatherCodeDiv()}
        {windspeedDiv()}
    </Card>
)}

export default WeatherBox