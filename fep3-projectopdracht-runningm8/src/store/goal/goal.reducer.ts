import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GoalSelectors} from "./goal.selector";
import {GoalThunks} from "./goal.thunks";


export interface GoalStorageState {
    goalType: string | undefined
    goalAmount: number | undefined
    goalDateSet: number | undefined
}

const initialState: GoalStorageState = {
    goalType: undefined,
    goalAmount: undefined,
    goalDateSet: undefined
};

const GoalStorageSlice = createSlice({
    name: 'UserStorage',
    initialState,
    reducers: {
        setGoalType(state, {payload}:PayloadAction<string>){
            state.goalType = payload
        },
        setGoalAmount(state, {payload}:PayloadAction<number>){
            state.goalAmount = payload
        },
        setGoalDate(state, {payload}:PayloadAction<number>){
            state.goalDateSet = payload
        },
        setGoal(state, {payload}:PayloadAction<GoalStorageState>){
            state = payload
        },
        resetGoal(state){
            state = {goalDateSet:undefined, goalAmount:undefined, goalType:undefined}
        }
    },
});

const {reducer, actions} = GoalStorageSlice;

export {
    actions as GoalStorageActions,
    reducer as GoalStorageReducer,
    GoalSelectors,
    GoalThunks,

};
