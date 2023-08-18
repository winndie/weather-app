import { createSlice,PayloadAction } from '@reduxjs/toolkit'

export interface ILocation {lat:number,lng:number}

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
  