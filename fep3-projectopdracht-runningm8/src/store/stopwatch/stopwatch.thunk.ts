import type {AsyncThunkOptions} from '../store.types';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {StopwatchStorageActions} from "./stopwatch.reducer";
import {SessionStorageActions, SessionThunks} from "../session";


const StopwatchThunks = {
    startTimer: createAsyncThunk<void,void, AsyncThunkOptions>(
        'stopwatch/startTimer', async (_, {dispatch, getState})=>{

            dispatch(StopwatchStorageActions.setTime(
                {
                    start: new Date().getTime(),
                    elapsed:new Date().getTime(),
                    // this value is 0.1 because the store does not accept 0 in a dispatch/updated store value
                    breakTime: 0.1,
                    pause:new Date().getTime(),
                    resume:new Date().getTime(),
                }))
            const interval = setInterval(()=>{
                let time =  new Date().getTime()
                if(getState().session.current.schema ){
                    let schema = getState().session.current.schema
                    if(schema && schema.selectedExercise){
                        if(schema.selectedExercise.started === undefined){
                            dispatch(SessionStorageActions.setExerciseStart(time))
                        }
                        else if( !schema.selectedExercise.done && time - schema.selectedExercise.started >= (schema.selectedExercise.exercise.duration * 60000)){
                            dispatch(SessionStorageActions.setExerciseEnd(time))
                            dispatch(SessionStorageActions.addExercieToDoneList())
                            dispatch(SessionThunks.nextExercise())
                        }else if(schema.selectedExercise.started && schema.selectedExercise.done){
                            dispatch(SessionStorageActions.removeExercise())
                        }
                    }
                }
                dispatch(StopwatchStorageActions.setTime(
                    {
                        elapsed: time,
                    }))
            }, 10)
            await dispatch(StopwatchStorageActions.persistInterval({interval: interval}))
        }
    ),
    pauseTimer: createAsyncThunk<void, void, AsyncThunkOptions>(
        'stopwatch/pauseTimer', async (_, {dispatch})=>{
            await dispatch(StopwatchThunks.stopTimer())
            await dispatch(StopwatchStorageActions.setTime(
                {
                    pause: new Date().getTime(),
                }))

        }
    ),
    resumeTimer: createAsyncThunk<void, void,AsyncThunkOptions>(
        'stopwatch/resumeTimer', async(_,{dispatch, getState})=>{
            const resume = new Date().getTime()
            const pause = getState().stopwatch.pause
            const breakTime = getState().stopwatch.breakTime;
            let newBreaktime = resume-pause
            await dispatch(StopwatchStorageActions.setTime(
                {
                    breakTime:(breakTime + newBreaktime),
                    resume: resume,
                }))
            const interval = setInterval(()=>{
                dispatch(StopwatchStorageActions.setTime(
                    {
                        elapsed: new Date().getTime(),
                    }))
            }, 10)
            await dispatch(StopwatchStorageActions.persistInterval({interval: interval}))
        }
    ),
    stopTimer: createAsyncThunk<void,void,AsyncThunkOptions>(
        'stopwatch/stopTimer', async (_,{dispatch, getState}) =>{
            let interval;
            if(getState().stopwatch.interval !== undefined){
                interval = getState().stopwatch.interval
            }
            // @ts-ignore
            clearInterval(interval)

            // calculate total time
            const stopwatch = getState().stopwatch
            const startTime = stopwatch.start
            const stopTime = stopwatch.elapsed
            const breakTime = stopwatch.breakTime
            let totalTime = (stopTime - startTime) - breakTime

            //dispatch time to session storage
            dispatch(SessionStorageActions.setTotalTime(totalTime))
        }
    ),

};

export {StopwatchThunks};
