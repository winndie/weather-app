import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import { IWeatherResult } from '../types'

export const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        loading:false as boolean,
        list: [] as IWeatherResult[],
    },
    reducers: {
        setWeatherLoading: (state, action:PayloadAction<boolean>) => {
            state.loading = action.payload
        },      
        addWeatherList: (state, action:PayloadAction<IWeatherResult>) => {
            state.list = [...state.list,action.payload]
        },      
    },
  })

export const {
    setWeatherLoading,
    addWeatherList
} = weatherSlice.actions