import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import { ILocation } from '../types'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        currentLocation: undefined as ILocation|undefined,
    },
    reducers: {
        setCurrentLocation: (state, action:PayloadAction<ILocation>) => {
            state.currentLocation = action.payload
        },      
    },
  })

export const {
    setCurrentLocation
} = appSlice.actions