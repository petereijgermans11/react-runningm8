import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {StopwatchThunks} from "./stopwatch.thunk";
import {StopwatchSelectors} from "./stopwatch.selector";

export interface StopwatchState {
    start: number
    elapsed: number
    pause: number
    resume: number
    breakTime: number
    interval: NodeJS.Timer| undefined
}

const initialState: StopwatchState = {
    start:0,
    elapsed:0,
    pause:0,
    resume:0,
    breakTime: 0,
    interval: undefined
};

const StopwatchStorageSlice = createSlice({
    name: 'StopwatchStorage',
    initialState,
    reducers: {
        setTime(
            state,
            {
                payload,
            }: PayloadAction<{
                start?: number
                elapsed?: number
                pause?: number
                resume?: number
                breakTime?: number
            }>,
        ) {
            if(payload.start){state.start = payload.start}
            if(payload.elapsed){state.elapsed = payload.elapsed}
            if(payload.pause){state.pause = payload.pause}
            if(payload.resume){state.resume = payload.resume}
            if(payload.breakTime){state.breakTime = payload.breakTime}
        },
        persistInterval(
            state,
            {
                payload,
            }: PayloadAction<{
                interval: NodeJS.Timer
            }>,
        ) {
            state.interval = payload.interval;
        },
    },
});

const {reducer, actions} = StopwatchStorageSlice;
export {
    actions as StopwatchStorageActions,
    reducer as StopwatchStorageReducer,
    StopwatchSelectors,
    StopwatchThunks
};
