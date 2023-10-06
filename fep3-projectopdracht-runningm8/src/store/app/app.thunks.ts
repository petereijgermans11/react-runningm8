import type {AsyncThunkOptions} from '../store.types';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppStorageActions} from "./app.reducer";
import i18n from "../../i18n";
const AppThunks = {
    setLanguage: createAsyncThunk<void,string,AsyncThunkOptions>(
        'app/setLanguage', async (_, {dispatch}) => {
            dispatch(AppStorageActions.setLanguage(_))
            await i18n.changeLanguage(_)
            dispatch(AppThunks.saveAppSettings())
        }
    ),
    setFirstUse: createAsyncThunk<void,void,AsyncThunkOptions>(
        'app/setFirstUse', async (_, {dispatch}) => {
            dispatch(AppStorageActions.setFirstUse())
            dispatch(AppThunks.saveAppSettings())
        }
    ),
    resetApp: createAsyncThunk<void,void,AsyncThunkOptions>(
        'app/resetApp', async (_, {dispatch}) => {
            dispatch(AppStorageActions.resetApp())
        }
    ),
    saveAppSettings: createAsyncThunk<void,void,AsyncThunkOptions>(
        'app/save', async (_, {extra, getState}) => {
            extra.app.saveApp({settings:  getState().app})

        }
    ),
    loadAppSettings: createAsyncThunk<void,void,AsyncThunkOptions>(
        'app/load', async (_, {dispatch, extra}) => {
            extra.app.getApp().then((app) => {
                if(app){
                    dispatch(AppStorageActions.loadFirstUse(app.firstUse))
                    dispatch(AppStorageActions.setLanguage(app.language))
                    i18n.changeLanguage(app.language)
                }else{
                    dispatch(AppStorageActions.setLanguage(window.navigator.language))
                    i18n.changeLanguage(window.navigator.language)
                }

            })

        }
    ),
};

export {AppThunks};
