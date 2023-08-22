import React, { useState } from "react";
import { Searchbar } from "framework7-react";
import { useAppDispatch } from "../store";
import { getWeatherBySearchText } from '../api'

const SearchBar = () => {
    const dispatch = useAppDispatch()
    const [query, setQuery] = useState("")

  const handleSearch = (e:Event) => {
    e.preventDefault()
    dispatch(getWeatherBySearchText({searchText: query}))
}

  return (
    <Searchbar
    placeholder="Get current and hourly weather by Postcode"
    onSubmit={handleSearch}
    onChange={e=>setQuery(e.target.value)}
    value={query}
  />
);
};

export default SearchBar