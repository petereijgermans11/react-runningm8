import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserSelectors} from "./user.selector";
import {UserThunks} from "./user.thunks";


export interface UserStorageState {
    id: string | undefined
    email: string | undefined
    name: string | undefined
    photoUrl: string | undefined
    gender: string | undefined
    weight: number | undefined
    weightUnit: string | undefined
    height: number | undefined
    heightUnit: string | undefined
}

const initialState: UserStorageState = {
    id: undefined,
    email: undefined,
    name: undefined,
    photoUrl: undefined,
    weight: undefined,
    weightUnit: undefined,
    height: undefined,
    heightUnit: undefined,
    gender: undefined,
};

const UserStorageSlice = createSlice({
    name: 'UserStorage',
    initialState,
    reducers: {
        setId(state, {payload}:PayloadAction<string>){
          state.id = payload
        },
        setEmail(state, {payload}:PayloadAction<string>){
            state.email = payload
        },
        setName(state, {payload}:PayloadAction<string>){
            state.name = payload
        },
        setWeight(state, {payload}:PayloadAction<number>){
            state.weight = payload
        },
        setHeight(state, {payload}:PayloadAction<number>){
            state.height = payload
        },
        setWeightUnit(state, {payload}:PayloadAction<string>){
            state.weightUnit = payload
        },
        setHeightUnit(state, {payload}:PayloadAction<string>){
            state.heightUnit = payload
        },
        setGender(state, {payload}:PayloadAction<string>){
            state.gender = payload
        },
        setPhotoUrl(state, {payload}:PayloadAction<string>){
            state.photoUrl = payload
        },
        logout(state){
            state.id = undefined
            state.name = undefined
            state.email = undefined
            state.photoUrl = undefined
        },
        resetUser(state) {
            state.name = undefined
            state.email = undefined
            state.height = undefined
            state.weight = undefined
            state.gender = undefined
            state.weightUnit = undefined
            state.heightUnit = undefined
            state.photoUrl = undefined
        }
    },
});

const {reducer, actions} = UserStorageSlice;

export {
    actions as UserStorageActions,
    reducer as UserStorageReducer,
    UserSelectors,
    UserThunks,
};
