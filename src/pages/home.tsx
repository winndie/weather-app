import React, { useEffect } from 'react'
import {
  Page,
  Navbar,
  NavTitleLarge,
  Block,
  Subnavbar,
  Searchbar,
  List,
  ListItem,
} from 'framework7-react';
import { RootState, useAppDispatch } from '../store'
import { useSelector } from 'react-redux'
import { getWeatherBySearchText } from '../api'

const HomePage = () => {
  const dispatch = useAppDispatch()
  const {loading,list} = useSelector((state:RootState) => state.weather)

  useEffect(()=>{
      dispatch(getWeatherBySearchText({searchText:'G2 4AA',isPostcode:true}))
  },[dispatch])
  
  return (
    loading?<>Loading...</>:
    <Page name="home">
    {/* Top Navbar */}
    <Navbar large sliding={false}>
        <Subnavbar title={import.meta.env.VITE_APP_NAME} inner={false}>
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
      <div>{x.weather.temperature}</div>
      </List>  
    ))
    }
    </Block>
  </Page>
)
}
export default HomePage;