import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { AppSelectors } from "./app.selector";
import { AppThunks } from "./app.thunks";

export interface AppStorageState {
    firstUse:boolean
    language: string
}

const initialState: AppStorageState = {
    firstUse: true,
    language: window.navigator.language || 'en'
};

const AppStorageSlice = createSlice({
    name: 'appStorage',
    initialState,
    reducers: {
        setFirstUse(state){
            state.firstUse = false
        },
        setLanguage(state, {payload}:PayloadAction<string>){
            state.language = payload
        },
        loadFirstUse(state, {payload}:PayloadAction<boolean>){
            state.firstUse = payload
        },
        resetApp(state){
            state.firstUse = true
            state.language = 'en-US'
        }
    },
});

const {reducer, actions} = AppStorageSlice;

export {
    actions as AppStorageActions,
    reducer as AppStorageReducer,
    AppSelectors,
    AppThunks,

};
