import { createSlice,PayloadAction } from '@reduxjs/toolkit'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        loading:false as boolean,
        appName:'Weather App',
    },
    reducers: {
        setAppLoading: (state, action:PayloadAction<boolean>) => {
            state.loading = action.payload
        },      
    },
  })

export const {
    setAppLoading,
} = appSlice.actions