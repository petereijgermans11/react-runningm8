import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SchemaSelectors} from "./schema.selector";
import {SchemaThunks} from "./schema.thunks";
import {SchemaStorageState, TrainingSchema} from "./schema.types";

export interface EditSchema {
    key: number
    schema: TrainingSchema
}

const initialState: SchemaStorageState = {
    mySchemas: [],
    otherSchemas: []
};

const SchemaStorageSlice = createSlice({
    name: 'SchemaStorage',
    initialState,
    reducers: {
        addSchema(state, {payload}:PayloadAction<TrainingSchema>){
            state.mySchemas.push(payload)
        },
        removeSchema(state, {payload}:PayloadAction<number>){
            state.mySchemas = state.mySchemas.filter((schema, index) => index !== payload)
        },
        editSchema(state, {payload}:PayloadAction<EditSchema>){
            state.mySchemas[payload.key] = payload.schema
        },
        setMySchemas(state, {payload}:PayloadAction<Array<TrainingSchema>>){
            state.mySchemas = payload
        },
        setOtherSchemas(state, {payload}:PayloadAction<Array<TrainingSchema>>){
            state.otherSchemas = payload
        },
        resetSchemas(state){
            state = {
                mySchemas: [],
                otherSchemas: []
            }
        }
    },
});

const {reducer, actions} = SchemaStorageSlice;

export {
    actions as SchemaStorageActions,
    reducer as SchemaStorageReducer,
    SchemaSelectors,
    SchemaThunks,

};
