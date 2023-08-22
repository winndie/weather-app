import React, { useEffect } from 'react'
import {
  Page,
  Navbar,
  Subnavbar,
  Searchbar,
  List,
  ListItem,
  Preloader,
} from 'framework7-react';
import { RootState, useAppDispatch } from '../store'
import { useSelector } from 'react-redux'
import { getWeatherBySearchText } from '../api'
import WeatherBox from '../components/weather';

const HomePage = () => {
  const dispatch = useAppDispatch()
  const {appName} = useSelector((state:RootState) => state.app)
  const {loading,list} = useSelector((state:RootState) => state.weather)

  useEffect(()=>{
      dispatch(getWeatherBySearchText({searchText:'G2 4AA',isPostcode:true}))
  },[dispatch])
  
  return (
    loading?<Preloader/>:
    <Page name="home">
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
    list.map((x,i)=>(
      <List key={i} dividersIos mediaList outlineIos strongIos>
        <WeatherBox weather={x.currentWeather} temperature={x.temperature} isCurrent={true} />
        {x.hourlyWeather.map(y=><WeatherBox weather={y} temperature={x.temperature} isCurrent={false} />)}
      </List>
    ))
    }
    </>
  </Page>
)
}
export default HomePage;