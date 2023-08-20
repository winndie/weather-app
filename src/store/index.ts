import { configureStore } from '@reduxjs/toolkit'
import { appSlice } from './app'
import { useDispatch } from 'react-redux'
import { weatherSlice } from './weather'

const store = configureStore({reducer:{
    app: appSlice.reducer,
    weather: weatherSlice.reducer,
}})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()