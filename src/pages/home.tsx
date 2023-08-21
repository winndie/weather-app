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
} from 'framework7-react';
import { RootState, useAppDispatch } from '../store'
import { useSelector } from 'react-redux'
import { getWeatherBySearchText } from '../api'
import { setStyleValue } from '../css';

const HomePage = () => {
  const dispatch = useAppDispatch()
  const {appName} = useSelector((state:RootState) => state.app)
  const {loading,list} = useSelector((state:RootState) => state.weather)
  const icon = 'arrow_up'

  useEffect(()=>{
      dispatch(getWeatherBySearchText({searchText:'G2 4AA',isPostcode:true}))
      setStyleValue('deg',-90)
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
    <Block>
    {list.length === 0?
      <List strongIos outlineIos dividersIos className="searchbar-not-found">
      <ListItem title="Nothing found" />
    </List>
    :
    list.map(x=>(
      <List strongIos outlineIos dividersIos className="search-list searchbar-found">
      <div>{x.weather.temperature}</div><Icon f7={icon} ios={'f7:'+icon} className='east'></Icon>
      </List>  
    ))
    }
    </Block>
  </Page>
)
}
export default HomePage;