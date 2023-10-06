import type {AsyncThunkOptions} from '../store.types';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {UserStorageActions} from "./user.reducer";
import {GoalStorageActions, GoalThunks} from "../goal";
import {SessionStorageActions, SessionThunks} from "../session";
import {SchemaStorageActions, SchemaThunks} from "../schemas";
import {addDoc, collection, getDocs, getFirestore, query, updateDoc, where} from "firebase/firestore";
import {TrainingSession} from "../session/session.types";
import {TrainingSchema} from "../schemas/schema.types";
import {AppThunks} from "../app";
import {logout} from "../../firebase";
import { getAuth } from 'firebase/auth';


const UserThunks = {
    setId: createAsyncThunk<void,string, AsyncThunkOptions>(
        'user/setId', async (_, {dispatch})=>{
            await dispatch(UserStorageActions.setId(_))
        }
    ),
    setEmail: createAsyncThunk<void,string, AsyncThunkOptions>(
        'user/setEmail', async (_, {dispatch})=>{

            await dispatch(UserStorageActions.setEmail(_))
        }
    ),
    setName: createAsyncThunk<void,string, AsyncThunkOptions>(
        'user/setName', async (_, {dispatch})=>{

            await dispatch(UserStorageActions.setName(_))
        }
    ),
    setPhotoUrl: createAsyncThunk<void,string, AsyncThunkOptions>(
        'user/setPhotoUrl', async (_, {dispatch})=>{
            await dispatch(UserStorageActions.setPhotoUrl(_))
        }
    ),
    setGender: createAsyncThunk<void,string, AsyncThunkOptions>(
        'user/setGender', async (_, {dispatch})=>{

            await dispatch(UserStorageActions.setGender(_))
        }
    ),
    setWeight: createAsyncThunk<void,number, AsyncThunkOptions>(
        'user/setWeight', async (_, {dispatch})=>{

            await dispatch(UserStorageActions.setWeight(_))
        }
    ),
    setHeight: createAsyncThunk<void,number, AsyncThunkOptions>(
        'user/setHeight', async (_, {dispatch})=>{

            await dispatch(UserStorageActions.setHeight(_))
        }
    ),
    setWeightUnit: createAsyncThunk<void,string, AsyncThunkOptions>(
        'user/setWeightUnit', async (_, {dispatch})=>{
            await dispatch(UserStorageActions.setWeightUnit(_))
        }
    ),
    setHeightUnit: createAsyncThunk<void,string, AsyncThunkOptions>(
        'user/setHeightUnit', async (_, {dispatch})=>{
            await dispatch(UserStorageActions.setHeightUnit(_))
        }
    ),
    setUser: createAsyncThunk<void,void, AsyncThunkOptions>(
        'user/setUser', async (_, {dispatch, getState, extra})=>{
            let user = getState().user
            extra.user.setUser({user})
        }
    ),
    saveUser: createAsyncThunk<void,void, AsyncThunkOptions>(
        'user/saveUser', async (_, {dispatch, getState, extra})=>{
            let user = getState().user
            extra.user.saveUser({user})
            if(user.id){
                dispatch(UserThunks.updateUserToFirebase())
            }
        }
    ),
    loginUser: createAsyncThunk<void,{id: string, name: string, email: string, photo?: string }, AsyncThunkOptions>(
        'user/login', async (_, { dispatch, extra})=>{
            dispatch(UserThunks.setId(_.id))
            dispatch(UserThunks.setEmail(_.email))
            dispatch(UserThunks.setName(_.name))
            dispatch(UserThunks.setPhotoUrl(_.photo || 'x'))
            dispatch(UserThunks.saveUser())
            dispatch(UserThunks.loadOtherSchemasToFirebase())
        }
    ),
    syncToFirebase: createAsyncThunk<void,{id: string, name: string, email: string, photo?: string, provider: string }, AsyncThunkOptions>(
        'user/syncToFirebase', async (_, { dispatch, getState, extra})=>{
            const currentUser = getState().user
            const goal = getState().goal
            const schemas = getState().schema
            const sessions = getState().session.allSessions

            const db = getFirestore()
            const q = query(collection(db, "users"), where("uid", "==", _.id));
            const doc = await getDocs(q)
            if(doc.empty){
                await addDoc(collection(db, "users"), {
                    uid: _.id,
                    name: _.name,
                    authProvider: _.provider || 'local',
                    email: _.email,
                    photoUrl: _.photo,
                    personalInfo: {
                        height: currentUser.height,
                        weight: currentUser.weight,
                        heightUnit: currentUser.heightUnit,
                        weightUnit: currentUser.weightUnit,
                        gender: currentUser.gender
                    },
                    mySchemas: schemas.mySchemas || [],
                    mySessions: sessions || [],
                    goal: goal
                })
            }else{
                dispatch(UserThunks.loadFromFirebase(_.id))
            }
        }
    ),
    updateSchemasToFirebase: createAsyncThunk<void,void, AsyncThunkOptions>(
        'user/updateSchemasToFirebase', async (_, { dispatch, getState, extra})=>{
            const currentUser = getState().user
            const schemas = getState().schema

            if(currentUser.id){
                const db = getFirestore()
                const q = query(collection(db, "users"), where("uid", "==", currentUser.id));
                const doc = await getDocs(q)

                if(!doc.empty){
                    await updateDoc(doc.docs[0].ref, {
                        mySchemas: schemas.mySchemas
                    })
                }
            }
        }
    ),
    loadOtherSchemasToFirebase: createAsyncThunk<void,void, AsyncThunkOptions>(
        'user/loadOtherSchemasToFirebase', async (_, { dispatch, getState, extra})=>{
            const currentUser = getState().user

            if(currentUser.id){
                const db = getFirestore()
                const q = query(collection(db, "users"), where("uid", "!=", currentUser.id));
                const docs = await getDocs(q)
                let others: Array<TrainingSchema> = []

                if(!docs.empty){
                    for(let doc of docs.docs){
                        for(let schema of doc.data().mySchemas as Array<TrainingSchema>){

                            if(schema.public){
                                others.push(schema)
                            }
                        }
                    }
                }
                dispatch(SchemaThunks.setOthersSchemas(others))
            }
        }
    ),
    updateSessionsToFirebase: createAsyncThunk<void,void, AsyncThunkOptions>(
        'user/updateSessionsToFirebase', async (_, { dispatch, getState, extra})=>{
            const currentUser = getState().user
            const sessions = getState().session.allSessions

            if(currentUser.id){
                const db = getFirestore()
                const q = query(collection(db, "users"), where("uid", "==", currentUser.id));
                const doc = await getDocs(q)

                if(!doc.empty){
                    await updateDoc(doc.docs[0].ref, {
                        mySessions: sessions
                    })
                }
            }

        }
    ),
    updateGoalToFirebase: createAsyncThunk<void,void, AsyncThunkOptions>(
        'user/updateGoalsToFirebase', async (_, { dispatch, getState, extra})=>{
            const currentUser = getState().user
            const goal = getState().goal

            if(currentUser.id){
                const db = getFirestore()
                const q = query(collection(db, "users"), where("uid", "==", currentUser.id));
                const doc = await getDocs(q)

                if(!doc.empty){
                    await updateDoc(doc.docs[0].ref, {
                        goal: goal
                    })
                }
            }
        }
    ),
    updateUserToFirebase: createAsyncThunk<void,void , AsyncThunkOptions>(
        'user/updateUserToFirebase', async (_, { dispatch, getState, extra})=>{
            const currentUser = getState().user


            if(currentUser.id){
                const db = getFirestore()
                const q = query(collection(db, "users"), where("uid", "==", currentUser.id));
                const doc = await getDocs(q)

                if(!doc.empty){
                    await updateDoc(doc.docs[0].ref, {
                        personalInfo: {
                            height: currentUser.height,
                            weight: currentUser.weight,
                            gender: currentUser.gender,
                            heightUnit: currentUser.heightUnit,
                            weightUnit: currentUser.weightUnit,
                        }
                    })
                }
            }

        }
    ),
    loadFromFirebase: createAsyncThunk<void,string , AsyncThunkOptions>(
        'user/loadFromFirebase', async (_, { dispatch, getState, extra})=>{
            const db = getFirestore()
            const q = query(collection(db, "users"), where("uid", "==", _));
            const doc = await getDocs(q)

            if(!doc.empty){
                dispatch(UserThunks.setId(doc.docs[0].data().uid))
                dispatch(UserThunks.setName(doc.docs[0].data().name))
                dispatch(UserThunks.setHeight(doc.docs[0].data().personalInfo.height))
                dispatch(UserThunks.setHeightUnit(doc.docs[0].data().personalInfo.heightUnit))
                dispatch(UserThunks.setWeight(doc.docs[0].data().personalInfo.weight))
                dispatch(UserThunks.setWeightUnit(doc.docs[0].data().personalInfo.weightUnit))
                dispatch(UserThunks.setGender(doc.docs[0].data().personalInfo.gender))
                dispatch(UserThunks.setEmail(doc.docs[0].data().email))
                dispatch(UserThunks.setPhotoUrl(doc.docs[0].data().photoUrl || 'x'))
                dispatch(UserThunks.saveUser())

                dispatch(GoalThunks.setGoalAmount(doc.docs[0].data().goal.goalAmount))
                dispatch(GoalThunks.setGoalType(doc.docs[0].data().goal.goalType))
                dispatch(GoalThunks.setGoalDate(doc.docs[0].data().goal.goalDateSet))
                dispatch(GoalThunks.saveGoal())

                dispatch(SessionThunks.setSessions(doc.docs[0].data().mySessions as Array<TrainingSession>))
                dispatch(SchemaThunks.setSchemas(doc.docs[0].data().mySchemas as Array<TrainingSchema>))
                dispatch(UserThunks.loadOtherSchemasToFirebase())
            }
        }
    ),
    logout: createAsyncThunk<void,void, AsyncThunkOptions>(
        'user/logout', async (_, { dispatch, extra})=>{
            // remove token
            localStorage.removeItem('token')
            // remove user from redux
            dispatch(UserStorageActions.logout())
            dispatch(UserThunks.saveUser())
            extra.schemas.saveOtherSchemas({schemas: []})
            const auth = getAuth()
            await logout(auth)
        }
    ),
    wipeData: createAsyncThunk<void,void, AsyncThunkOptions>(
        'user/wipeData', async (_, { dispatch, extra})=>{
            // remove token
            localStorage.removeItem('token')
            // clear local database
            window.indexedDB.deleteDatabase('User')
            window.indexedDB.deleteDatabase('App')
            window.indexedDB.deleteDatabase('Schemas')
            window.indexedDB.deleteDatabase('Session')
            window.indexedDB.deleteDatabase('Goal')
            window.indexedDB.deleteDatabase('firebaseLocalStorageDb')
            dispatch(AppThunks.resetApp())
            dispatch(UserStorageActions.resetUser())
            dispatch(SessionStorageActions.resetSessions())
            dispatch(SchemaStorageActions.resetSchemas())
            dispatch(GoalStorageActions.resetGoal())
        }
    ),
    loadUser: createAsyncThunk<{
        id: string | undefined
        email: string | undefined
        name: string | undefined
        photoUrl: string | undefined
        gender: string | undefined
        weight: number | undefined
        weightUnit: string | undefined
        height: number | undefined
        heightUnit: string | undefined
    },void, AsyncThunkOptions>(
        'user/loadUser', async (_, {dispatch, extra})=>{
            return extra.user.getUser().then((user) => {
                if (user) {
                    dispatch(UserThunks.setId(user.id))
                    dispatch(UserThunks.setGender(user.gender))
                    dispatch(UserThunks.setHeightUnit(user.heightUnit))
                    dispatch(UserThunks.setHeight(user.height))
                    dispatch(UserThunks.setWeightUnit(user.weightUnit))
                    dispatch(UserThunks.setWeight(user.weight))
                    dispatch(UserThunks.setEmail(user.email))
                    dispatch(UserThunks.setName(user.name))
                    dispatch(UserThunks.setPhotoUrl(user.photoUrl))
                }
                return user;
            });
        }
    ),
};

export {UserThunks};
