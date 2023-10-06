import type {AsyncThunkOptions} from '../store.types';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {LocationStorageActions} from "./location.reducer";
import {UserPosition} from "./location.types";
import {SessionThunks} from "../session";


const LocationThunks = {
    startWatching: createAsyncThunk<void,void, AsyncThunkOptions>(
        'location/startWatching', async (_, {dispatch, getState, extra})=>{
            let userPosition: UserPosition
            let watcherID = extra.navigator.geolocation.watchPosition(
(position)=>{
                userPosition = {
                    altitude: position.coords.altitude || 0,
                    speed:  position.coords.speed ? position.coords.speed * 3.6 : 0 ,
                    timestamp: position.timestamp,
                    coords: [position.coords.latitude, position.coords.longitude]
                }
                dispatch(LocationStorageActions.setCurrentPosition({userPosition:userPosition}))
                // add the location to the session
                const session = getState().session.current
                if(session.recording){
                    if(!session.paused){
                        dispatch(SessionThunks.addLocationToSession(userPosition))
                    }
                }
              },
  (error)=>{console.log(error)},
      {
                 maximumAge: 2500,
                 enableHighAccuracy: true
              }
            )
            await dispatch(LocationStorageActions.setWatcher({watcherID: watcherID}))
        }
    ),
    stopWatching: createAsyncThunk<void,void,AsyncThunkOptions>(
        'location/stopWatching', async (_, {getState, extra}) =>{
            extra.navigator.geolocation.clearWatch(getState().location.watcherID as number)
        }
    ),
    getCurrentLocation: createAsyncThunk<void,void,AsyncThunkOptions>(
        'location/current', async (_, {dispatch, extra}) => {
            let userPosition: UserPosition
            extra.navigator.geolocation.getCurrentPosition((position) => {
                userPosition = {
                    altitude: position.coords.altitude || 0,
                    speed:  position.coords.speed ? position.coords.speed * 3.6 : 0 ,
                    timestamp: position.timestamp,
                    coords: [position.coords.latitude, position.coords.longitude]
                }
                dispatch(LocationStorageActions.setCurrentPosition({userPosition: userPosition}))
            },
    undefined,
        {
                    enableHighAccuracy: true
                }
            )
        }
    ),
};

export {LocationThunks};
