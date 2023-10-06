import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LocationSelectors} from "./location.selector";
import {LocationThunks} from "./location.thunks";
import {UserPosition} from "./location.types";

export interface LocationStorageState {
    watcherID: number | undefined
    currentPosition: UserPosition | undefined
    lastPosition: UserPosition | undefined
}

const initialState: LocationStorageState = {
    watcherID: undefined,
    currentPosition: undefined,
    lastPosition: undefined,
};

const LocationStorageSlice = createSlice({
    name: 'LocationStorage',
    initialState,
    reducers: {
        setWatcher(state,{
            payload
        }:PayloadAction<{watcherID: number}>){
            state.watcherID = payload.watcherID
        },
        setCurrentPosition(state, {
            payload
       }:PayloadAction<{userPosition: UserPosition}>){
            state.lastPosition = state.currentPosition
            state.currentPosition = payload.userPosition
        },
    },
});

const {reducer, actions} = LocationStorageSlice;

export {
    actions as LocationStorageActions,
    reducer as LocationStorageReducer,
    LocationSelectors,
    LocationThunks,

};
