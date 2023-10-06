import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SessionSelectors} from "./session.selector";
import {SessionThunks} from "./session.thunks";
import {UserPosition} from "../location/location.types";
import {SessionExercise, SessionSchema, SessionStorageState, TrainingSession} from "./session.types";

const initialState: SessionStorageState = {
    current:{
        recording: false,
        paused: false,
        recordedPositions: [],
        startPosition: undefined,
        endPosition: undefined,
        schema: undefined,
        totalTime: undefined,
    },
    allSessions: []
};

const SessionStorageSlice = createSlice({
    name: 'SessionStorage',
    initialState,
    reducers: {
        // session logic
        startSession(state){
            state.current.recording = true
        },
        setPaused(state){
            state.current.paused = !state.current.paused
        },
        stopSession(state,{payload}:PayloadAction<UserPosition>){
            state.current.recording = false
            state.current.paused = false
            state.current.endPosition = payload
        },
        saveSession(state){
            state.allSessions = [...state.allSessions, state.current]
        },
        resetSession(state){
            state.current.recordedPositions = []
            state.current.startPosition= undefined
            state.current.endPosition= undefined
            state.current.recording = false
            state.current.paused = false
        },
        // location logic
        addLocation(state,{payload}:PayloadAction<UserPosition>){
            if(!state.current.startPosition){
                state.current.startPosition = payload
            }
            state.current.recordedPositions = [...state.current.recordedPositions, payload]
        },
        // time logic
        setTotalTime(state,{payload}:PayloadAction<number>){
            state.current.totalTime = payload
        },
        // method for loading the sessions from the storage
        setSessions(state, {payload}:PayloadAction<Array<TrainingSession>>){
            state.allSessions = payload
        },

        // schema logic
        setSchema(state, {payload}: PayloadAction<SessionSchema>){
            state.current.schema = payload
        },
        removeSchema(state){
            state.current.schema = undefined
        },
        removeExercise(state){
            if(state.current.schema)
            state.current.schema.selectedExercise = undefined
        },
        addExercieToDoneList(state){
            if(state.current.schema){
                state.current.schema.exercisesDone.push(state.current.schema.selectedExercise as SessionExercise)
            }
        },
        setExerciseStart(state, {payload}:PayloadAction<number>){
            if(state.current.schema && state.current.schema.selectedExercise){
                state.current.schema.selectedExercise.started = payload
            }
        },
        setExerciseEnd(state, {payload}:PayloadAction<number>){
            if(state.current.schema && state.current.schema.selectedExercise){
                state.current.schema.selectedExercise.done = payload
            }
        },
        setSelectedExercise(state, {payload}:PayloadAction<SessionExercise>) {
            if(state.current.schema){
                state.current.schema.selectedExercise = payload
            }
        },
        resetSessions(state){
            state = {
                current: {
                    recording: false,
                    paused: false,
                    recordedPositions: [],
                    startPosition: undefined,
                    endPosition: undefined,
                    schema: undefined,
                    totalTime: undefined,
                },
                allSessions: []
            }
        }

    },
});

const {reducer, actions} = SessionStorageSlice;

export {
    actions as SessionStorageActions,
    reducer as SessionStorageReducer,
    SessionSelectors,
    SessionThunks
};
