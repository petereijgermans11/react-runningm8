import {createSlice} from "@reduxjs/toolkit";
import {AudioSelectors} from "./audio.selector";
import {AudioThunks} from "./audio.thunks";

export interface LocationStorageState {
    audioOn: boolean
}

const initialState: LocationStorageState = {
    audioOn: true,
};

const AudioStorageSlice = createSlice({
    name: 'audioStorage',
    initialState,
    reducers: {
        setAudio(state){
            state.audioOn = !state.audioOn
        },
    },
});

const {reducer, actions} = AudioStorageSlice;

export {
    actions as AudioStorageActions,
    reducer as AudioStorageReducer,
    AudioSelectors,
    AudioThunks,

};
