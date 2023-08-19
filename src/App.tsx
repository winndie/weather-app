import React from 'react'
import './App.css'
import Framework7 from 'framework7/lite'
import Framework7React, { List, ListItem, Navbar, Page, Searchbar, Subnavbar } from 'framework7-react'

function App() {

  Framework7.use(Framework7React)
  
  return (
    <Page>
      <Navbar title="Searchbar">
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
