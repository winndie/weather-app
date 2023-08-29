import React from 'react'
import {
  Card,
  Icon,
} from 'framework7-react'
import { monthNames, weatherCode } from '../constants'
import { IRange, IWeather } from '../types'

const WeatherBox:React.FC<{weather:IWeather,temperature:IRange, isCurrent:boolean}> = (props) => {
  const defaultWeatherCode = parseInt(import.meta.env.VITE_DEFAULT_WEATHER_CODE)
  const windDirectionIcon = 'arrow_up'
  const weatherCodeDto =  weatherCode.has(props.weather.weatherCode)?
                          weatherCode.get(props.weather.weatherCode):
                          weatherCode.get(defaultWeatherCode)
  const max = (Math.abs(props.weather.temperature-props.temperature.min)/Math.abs(props.temperature.max-props.temperature.min))

  const temperatureDiv = () => {

    const date = new Date(props.weather.datetime)
    const currentDate = date.getDate()
        + ' ' + monthNames.get(date.getMonth())
        + ', ' + props.weather.datetime.substring(props.weather.datetime.length-5)

    const hour = props.weather.datetime.substring(props.weather.datetime.length-5)

    return (<div className='text-align-center'>
    <div>{props.isCurrent?currentDate:hour}</div>
    <div><span >{props.weather.temperature}</span><abbr className='temperature-unit'>&#8451;</abbr></div>
    </div>)
  }

  const weatherCodeDiv = props.isCurrent?
    <div className={'align-items-center text-align-center'}>
    <Icon f7={weatherCodeDto?.icon} ios={'f7:'+weatherCodeDto?.icon}></Icon>
    <div>{weatherCodeDto?.name}</div>
    </div>
    :
    <div className={'hourly-weather-code align-items-center text-align-center'}>
    <Icon f7={weatherCodeDto?.icon} ios={'f7:'+weatherCodeDto?.icon}></Icon>
    <div>{weatherCodeDto?.name}</div>
    </div>

  const windspeedDiv = <div className='align-items-center text-align-center'>
    <Icon f7={windDirectionIcon} ios={'f7:'+windDirectionIcon} style={{rotate:`${props.weather.windDirection}deg`}}/>
    <div><span >{props.weather.windSpeed}</span><abbr className='windspeed-unit'>km/h</abbr></div>
    </div>

  return (
    props.isCurrent?
        <Card className={'padding align-self-center'}>

        <div className='grid grid-cols-1 medium-grid-cols-2 grid-gap'>
            {temperatureDiv()}
            {weatherCodeDiv}
        </div>

        <div className='align-content-center'>
            {windspeedDiv}
        </div>

        </Card>
        :
        <div className={'margin-right padding hourly'} style={{backgroundImage:`linear-gradient(to bottom, rgba(255,0,0,0), rgba(255,0,0,${max}))`}}>
            {temperatureDiv()}
            {weatherCodeDiv}
            {windspeedDiv}
        </div>
  )
}

export default WeatherBox