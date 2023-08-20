import React, { useEffect } from 'react'
import './App.css'
import Framework7 from 'framework7/lite'
import Framework7React, { List, ListItem, Navbar, Page, Searchbar, Subnavbar } from 'framework7-react'
import { RootState, useAppDispatch } from './store'
import { useSelector } from 'react-redux'
import { getWeatherBySearchText } from './api'

const App:React.FC=()=> {

  Framework7.use(Framework7React)
  const dispatch = useAppDispatch()
  const {loading,list} = useSelector((state:RootState) => state.weather)

  useEffect(()=>{
      dispatch(getWeatherBySearchText({searchText:'G2 4AA',isPostcode:true}))
  },[dispatch])

  return (
    <Page>
      <Navbar title={process.env.REACT_APP_SEARCH_TITLE}>
        <Subnavbar inner={false}>
          <Searchbar searchContainer=".search-list" searchIn=".item-title" />
        </Subnavbar>
      </Navbar>
      <List strongIos outlineIos dividersIos className="searchbar-not-found">
        <ListItem title="Nothing found" />
      </List>
      <List strongIos outlineIos dividersIos className="search-list searchbar-found">
      <ListItem title="Volvo" />
      </List>
    </Page>  
    )
}

export default App;
