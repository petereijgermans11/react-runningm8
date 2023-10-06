import type {AsyncThunkOptions} from '../store.types';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {LocationThunks} from "../location";
import {StopwatchThunks} from "../stopwatch";
import {SessionStorageActions} from "./session.reducer";
import {UserPosition} from "../location/location.types";
import NoSleep from "nosleep.js";
import {AudioThunks} from "../audio";
import {Exercise, TrainingSchema} from "../schemas/schema.types";
import {SessionSchema, TrainingSession} from "./session.types";
import {UserThunks} from "../user";

let noSleep = new NoSleep()


const SessionThunks = {
    // session logic
    startSession: createAsyncThunk<void,void,AsyncThunkOptions>(
        'session/startSession', async (_, {dispatch, getState, extra}) => {
            dispatch(SessionStorageActions.resetSession())
            dispatch(SessionStorageActions.startSession())
            dispatch(AudioThunks.playSound('session:start'))
            if(getState().session.current.schema !== undefined){
                let schema = getState().session.current.schema as SessionSchema

                dispatch(AudioThunks.playNextExercise([
                    schema.schema.exercises[0].duration.toString(),
                    schema.schema.exercises[0].duration > 1 ? "exercises:minutes" :"exercises:minute",
                    "exercises:walking"]))
                    dispatch(SessionStorageActions.setSelectedExercise(
                    {
                        exercise: schema.schema.exercises[0] as Exercise
                    }
                    )
                )
            }

            dispatch(LocationThunks.startWatching())
            dispatch(StopwatchThunks.startTimer())

            if(!noSleep.isEnabled){
                await noSleep.enable()
            }
        }
    ),
    pauseSession: createAsyncThunk<void,void,AsyncThunkOptions>(
        'session/pauseSession', async (_, {dispatch})=> {
            dispatch(SessionStorageActions.setPaused())
            dispatch(StopwatchThunks.pauseTimer())
            dispatch(AudioThunks.playSound('session:pause'))
            if(noSleep.isEnabled){
                await noSleep.disable()
            }

        }
    ),
    resumeSession: createAsyncThunk<void,void,AsyncThunkOptions>(
        'session/resumeSession', async (_, {dispatch})=> {
            dispatch(SessionStorageActions.setPaused())
            dispatch(StopwatchThunks.resumeTimer())
            dispatch(AudioThunks.playSound('session:resume'))
            if(!noSleep.isEnabled){
                await noSleep.enable()
            }
        }
    ),
    stopSession: createAsyncThunk<void,void,AsyncThunkOptions>(
        'session/stopSession', async (_, {dispatch, getState}) =>{
            // @ts-ignore because current position can not be undefined at this point of progressing in the app.
            dispatch(SessionStorageActions.stopSession(getState().location.currentPosition))
            await dispatch(StopwatchThunks.stopTimer())
            dispatch(LocationThunks.stopWatching())
            dispatch(SessionStorageActions.saveSession())
            dispatch(AudioThunks.playSound('session:stop'))
            if(noSleep.isEnabled){
                await noSleep.disable()
            }
            dispatch(SessionThunks.saveSessions())
            dispatch(UserThunks.updateSessionsToFirebase())
        }
    ),
    addLocationToSession: createAsyncThunk<void,UserPosition,AsyncThunkOptions>(
        'session/addLocationToSession', async (_, {dispatch}) => {
            dispatch(SessionStorageActions.addLocation(_))
        }
    ),
    // loading/saving logic
    loadSessions: createAsyncThunk<void,void,AsyncThunkOptions>(
        'session/loadSessions', async (_, {dispatch, extra}) =>{
            extra.sessions.getSessions().then((sessions)=>{
                if(sessions === undefined){
                    extra.sessions.setSessions()
                    sessions = extra.sessions.getSessions().then(()=>{
                        dispatch(SessionThunks.loadSessions())
                    })
                }
                // @ts-ignore
                dispatch(SessionStorageActions.setSessions(sessions))
            })
        }
    ),
    saveSessions: createAsyncThunk<void,void,AsyncThunkOptions>(
        'session/saveSessions', async (_, {dispatch, getState, extra}) =>{
            extra.sessions.saveSessions({sessions: getState().session.allSessions})

        }
    ),
    setSessions: createAsyncThunk<void,Array<TrainingSession>,AsyncThunkOptions>(
        'session/setSessions', async (_, {dispatch, getState, extra}) =>{
            dispatch(SessionStorageActions.setSessions(_))
            dispatch(SessionThunks.saveSessions())
        }
    ),
    // session schema logic
    setSchema: createAsyncThunk<void,TrainingSchema,AsyncThunkOptions>(
        'session/setSchema', async (_, {dispatch, getState, extra}) =>{
            dispatch(SessionStorageActions.setSchema({schema: _, exercisesDone:[]}))

        }
    ),
    removeSchema: createAsyncThunk<void,void,AsyncThunkOptions>(
        'session/removeSchema', async (_, {dispatch, getState, extra}) =>{
            dispatch(SessionStorageActions.removeSchema())

        }
    ),
    nextExercise: createAsyncThunk<void,void,AsyncThunkOptions>(
        'session/nextExercise', async (_, {dispatch, getState, extra}) =>{
            let schema = getState().session.current.schema
            dispatch(AudioThunks.playExercise())
                if(schema && schema.selectedExercise ){
                    let exercises = schema.schema.exercises
                    let selected = schema.selectedExercise.exercise
                    let index = exercises.indexOf(selected)
                    if(index < exercises.length -1){
                        let exercies = exercises[index +1]
                        dispatch(SessionStorageActions.setSelectedExercise({exercise: exercies}))
                        dispatch(AudioThunks.playNextExercise([
                            schema.schema.exercises[index +1].duration.toString(),
                            schema.schema.exercises[index +1].duration > 1 ? "exercises:minutes" :"exercises:minute",
                            `exercises:${schema.schema.exercises[index +1].text}`]))
                    }else{
                        let exercies = exercises[0]
                        dispatch(AudioThunks.playNextExercise([
                            schema.schema.exercises[0].duration.toString(),
                            schema.schema.exercises[0].duration > 1 ? "exercises:minutes" :"exercises:minute",
                            `exercises:${schema.schema.exercises[0].text}`]))
                        dispatch(SessionStorageActions.setSelectedExercise({exercise: exercies}))
                    }
                }
        }
    ),
    prevExercise: createAsyncThunk<void,void,AsyncThunkOptions>(
        'session/prevExercise', async (_, {dispatch, getState, extra}) =>{
            let schema = getState().session.current.schema
            dispatch(AudioThunks.playExercise())
            if(schema && schema.selectedExercise ){
                let exercises = schema.schema.exercises
                let selected = schema.selectedExercise.exercise
                let index = exercises.indexOf(selected)
                if(index > 0){
                    dispatch(AudioThunks.playNextExercise([
                        schema.schema.exercises[index -1].duration.toString(),
                        schema.schema.exercises[index -1].duration > 1 ? "exercises:minutes" :"exercises:minute",
                        `exercises:${schema.schema.exercises[index -1].text}`]))
                    dispatch(SessionStorageActions.setSelectedExercise({exercise: exercises[index -1]}))
                }else{
                    dispatch(AudioThunks.playNextExercise([
                        schema.schema.exercises[exercises.length -1].duration.toString(),
                        schema.schema.exercises[exercises.length -1].duration > 1 ? "exercises:minutes" :"exercises:minute",
                        `exercises:${schema.schema.exercises[exercises.length -1].text}`]))
                    dispatch(SessionStorageActions.setSelectedExercise({exercise: exercises[exercises.length -1]}))
                }
            }

        }
    ),
};

export {SessionThunks};
