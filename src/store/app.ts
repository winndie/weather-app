import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import { ILocation } from '../types'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        loading:false as boolean,
        currentLocation: undefined as ILocation|undefined,
    },
    reducers: {
        setAppLoading: (state, action:PayloadAction<boolean>) => {
            state.loading = action.payload
        },      
        setCurrentLocation: (state, action:PayloadAction<ILocation>) => {
            state.currentLocation = action.payload
        },      
    },
  })

export const {
    setAppLoading,
    setCurrentLocation
} = appSlice.actions