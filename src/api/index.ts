import { createAsyncThunk } from '@reduxjs/toolkit'
import { setCurrentLocation,ILocation } from '../state/app'
import { RootState } from '../state'
import { Geolocation } from '@capacitor/geolocation'

export const fetchAllMissions = createAsyncThunk(
    'CurrentLocation/fetch',
    async (_, thunkAPI) => {

      const result = {
        currentLocation: undefined as ILocation|undefined,
      }
      const resp = await Geolocation.getCurrentPosition()
      if(resp.coords.latitude && resp.coords.longitude)
      {
        result.currentLocation = {lat:resp.coords.latitude,lng:resp.coords.longitude}
        thunkAPI.dispatch(setCurrentLocation(result.currentLocation))
      }

      try{
      }catch(e){

      }finally{
      }
    }
)
