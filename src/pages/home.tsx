import React, { useEffect } from 'react'
import {
  Page,
  Navbar,
  Block,
  Subnavbar,
  Searchbar,
  List,
  ListItem,
  Preloader,
  Icon,
  Card,
  BlockTitle,
} from 'framework7-react';
import { RootState, useAppDispatch } from '../store'
import { useSelector } from 'react-redux'
import { getWeatherBySearchText } from '../api'
import { setStyleValue } from '../css';
import { weatherCode } from '../constants';
import WeatherBox from '../components/weather';

const HomePage = () => {
  const dispatch = useAppDispatch()
  const {appName} = useSelector((state:RootState) => state.app)
  const {loading,list} = useSelector((state:RootState) => state.weather)
  const defaultWeatherCode = parseInt(import.meta.env.VITE_DEFAULT_WEATHER_CODE)
  const windDirectionIcon = 'arrow_up'

  useEffect(()=>{
      dispatch(getWeatherBySearchText({searchText:'G2 4AA',isPostcode:true}))
  },[dispatch])
  
  return (
    loading?<Preloader/>:
    <Page name="home">
    {/* Top Navbar */}
    <Navbar large title={appName} sliding={false}>
        <Subnavbar inner={false}>
          <Searchbar searchContainer=".search-list" searchIn=".item-title" />
        </Subnavbar>
    </Navbar>
    <>
    {list.length === 0?
      <List  dividersIos simpleList className="searchbar-not-found">
      <ListItem title="Nothing found" />
    </List>
    :
    list.map((x,i)=>{
    return (
      <List key={i} dividersIos mediaList outlineIos strongIos>
        <WeatherBox weather={x.currentWeather} temperature={x.temperature} isCurrent={true}/>
      </List>  
    )})
    }
    </>
  </Page>
)
}
export default HomePage;