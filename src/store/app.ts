import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import { ILocation } from '../types'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        loading:false as boolean,
        appName:'Weather App',
        currentLocation: undefined as ILocation|undefined,
        currentCountry: undefined as string|undefined,
    },
    reducers: {
        setAppLoading: (state, action:PayloadAction<boolean>) => {
            state.loading = action.payload
        },      
        setCurrentLocation: (state, action:PayloadAction<ILocation>) => {
            state.currentLocation = action.payload
        },      
        setCurrentCountry: (state, action:PayloadAction<string>) => {
            state.currentCountry = action.payload
        },      
    },
  })

export const {
    setAppLoading,
    setCurrentLocation
} = appSlice.actions