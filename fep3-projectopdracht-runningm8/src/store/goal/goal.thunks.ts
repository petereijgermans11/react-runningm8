import type {AsyncThunkOptions} from '../store.types';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {GoalStorageActions, GoalStorageState} from "./goal.reducer";
import {UserThunks} from "../user";
import {calcTotalDistance, filterWeeklySessions} from "../../common/utilsFunctions";


const GoalThunks = {
    setGoalType: createAsyncThunk<void,string, AsyncThunkOptions>(
        'goal/setGoalType', async (_, {dispatch})=>{
            await dispatch(GoalStorageActions.setGoalType(_))
        }
    ),
    setGoalAmount: createAsyncThunk<void,number, AsyncThunkOptions>(
        'goal/setGoalAmount', async (_, {dispatch})=>{
            await dispatch(GoalStorageActions.setGoalAmount(_))
        }
    ),
    setGoalDate: createAsyncThunk<void,number, AsyncThunkOptions>(
        'goal/setGoalDate', async (_, {dispatch})=>{
            await dispatch(GoalStorageActions.setGoalDate(_))
        }
    ),
    setGoal: createAsyncThunk<void,GoalStorageState, AsyncThunkOptions>(
        'goal/setGoal', async (_, {dispatch})=>{
            await dispatch(GoalStorageActions.setGoal(_))
        }
    ),
    loadGoal: createAsyncThunk<void,void,AsyncThunkOptions>(
        'goal/loadGoal', async (_, {dispatch, extra}) =>{
            extra.goal.getGoal().then(async (goal)=>{
                if(goal === undefined){
                    extra.goal.setGoal()
                    goal = extra.goal.getGoal().then(()=>{
                        dispatch(GoalThunks.loadGoal())
                    })
                }
                await dispatch(GoalThunks.setGoalDate(goal.goalDateSet))
                await dispatch(GoalThunks.setGoalType(goal.goalType))
                await dispatch(GoalThunks.setGoalAmount(goal.goalAmount))
            })
        }
    ),
    saveGoal: createAsyncThunk<void,void,AsyncThunkOptions>(
        'goal/saveGoal', async (_, {dispatch, getState, extra}) =>{
            extra.goal.saveGoal({goal: getState().goal})
            dispatch(UserThunks.updateGoalToFirebase())
        }
    ),
    checkGoal: createAsyncThunk<void,void,AsyncThunkOptions>(
        'goal/checkGoal', async (_, {dispatch, getState, extra}) =>{
            const goal = getState().goal
            let goalDuration = Date.now() - (goal.goalDateSet as number)
            if(goalDuration > 604800000){
                let totalDistance = calcTotalDistance(
                    {
                        sessions:
                            filterWeeklySessions(
                                {
                                    sessions:getState().session.allSessions,
                                    date: goal.goalDateSet as number
                                })
                    });
                let newGoal = goal.goalAmount as number;
                let newDate = Date.now()
                if(totalDistance > newGoal){
                    let difference = totalDistance / newGoal
                    newGoal = newGoal * difference
                }
                dispatch(GoalThunks.setGoalAmount(newGoal))
                dispatch(GoalThunks.setGoalDate(newDate))
                dispatch(GoalThunks.saveGoal())
                dispatch(UserThunks.updateGoalToFirebase())
            }
        }
    ),
};

export {GoalThunks};
