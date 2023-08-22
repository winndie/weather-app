import React from 'react'
import {
  Page,
  Navbar,
  Subnavbar,
  List,
  ListItem,
  Preloader,
} from 'framework7-react';
import { RootState } from '../store'
import { useSelector } from 'react-redux'
import WeatherBox from '../components/weather';
import SearchBar from '../components/searchBar';

const HomePage = () => {
  const {appName} = useSelector((state:RootState) => state.app)
  const {loading,list} = useSelector((state:RootState) => state.weather)

  return (
    loading?<Preloader/>:
    <Page name="home">
    <Navbar large title={appName} sliding={false}>
        <Subnavbar inner={false}>
          <SearchBar />
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
        <div className='padding-left'>{'Search result for : '+x.searchText}</div>
        <WeatherBox weather={x.currentWeather} temperature={x.temperature} isCurrent={true} />
        <div className='display-flex hourly-list padding'>
        {x.hourlyWeather.map((y,r)=><WeatherBox key={r} weather={y} temperature={x.temperature} isCurrent={false} />)}
        </div>
      </List>
    ))
    }
    </>
  </Page>
)
}
export default HomePage;