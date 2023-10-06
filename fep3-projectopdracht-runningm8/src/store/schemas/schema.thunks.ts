import type {AsyncThunkOptions} from '../store.types';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {EditSchema, SchemaStorageActions} from "./schema.reducer";
import {TrainingSchema} from "./schema.types";
import {UserThunks} from "../user";


const SchemaThunks = {
    addSchema: createAsyncThunk<void, TrainingSchema, AsyncThunkOptions>(
        'schema/add', async (_, {dispatch, getState, extra})=> {
            dispatch(SchemaStorageActions.addSchema(_))
            dispatch(SchemaThunks.saveSchemas())
        }
    ),
    editSchema: createAsyncThunk<void, EditSchema, AsyncThunkOptions>(
        'schema/edit', async (_, {dispatch, getState, extra})=> {
            dispatch(SchemaStorageActions.editSchema(_))
            dispatch(SchemaThunks.saveSchemas())
        }
    ),
    loadSchemas: createAsyncThunk<void,void,AsyncThunkOptions>(
        'schema/load', async (_, {dispatch, extra}) =>{
            extra.schemas.getSchemas().then((schemas) => {
                if(schemas === undefined){
                    extra.schemas.setSchemas()
                    dispatch(SchemaThunks.loadSchemas())
                }
                dispatch(SchemaStorageActions.setMySchemas(schemas))
            })
        }
    ),
    loadOthersSchemas: createAsyncThunk<void,void,AsyncThunkOptions>(
        'schema/load', async (_, {dispatch, extra}) =>{
            extra.schemas.getOthersSchemas().then((schemas) => {
                if(schemas === undefined){
                    extra.schemas.setSchemas()
                    dispatch(SchemaThunks.loadOthersSchemas())
                }
                dispatch(SchemaStorageActions.setOtherSchemas(schemas))
            })
        }
    ),
    setSchemas: createAsyncThunk<void,Array<TrainingSchema>,AsyncThunkOptions>(
        'schema/set', async (_, {dispatch, extra}) =>{
            dispatch(SchemaStorageActions.setMySchemas(_))
            dispatch(SchemaThunks.saveSchemas())
        }
    ),
    setOthersSchemas: createAsyncThunk<void,Array<TrainingSchema>,AsyncThunkOptions>(
        'schema/set', async (_, {dispatch, getState, extra}) =>{
            dispatch(SchemaStorageActions.setOtherSchemas(_))
            extra.schemas.saveOtherSchemas({schemas: getState().schema.otherSchemas})
            dispatch(SchemaThunks.saveSchemas())
        }
    ),
    deleteSchema: createAsyncThunk<void, number, AsyncThunkOptions>(
        'schema/delete', async (_, {dispatch}) => {
            dispatch(SchemaStorageActions.removeSchema(_))
            dispatch(SchemaThunks.saveSchemas())
        }
    ),
    saveSchemas: createAsyncThunk<void, void, AsyncThunkOptions>(
        'schema/add', async (_, {dispatch, getState, extra})=> {
            const user = getState().user
            extra.schemas.saveSchemas({schemas: getState().schema.mySchemas})
            if(user.id){
                dispatch(UserThunks.updateSchemasToFirebase())
            }
        }
    ),


};

export {SchemaThunks};
