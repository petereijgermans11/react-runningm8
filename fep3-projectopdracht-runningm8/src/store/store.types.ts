import {initializeStore} from "./InitializeStore";
import type {TypedUseSelectorHook} from 'react-redux';
import {useDispatch, useSelector} from 'react-redux';
import {UserService} from "../services/service.user.js";
import {SessionService} from "../services/service.session";
import {GoalService} from "../services/service.goal";

import {SchemaService} from "../services/service.schemas";
import {AppService} from "../services/service.app";

type Store = ReturnType<typeof initializeStore>['store'];

// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<Store['getState']>;
type AppDispatch = Store['dispatch'];

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const useAppDispatch = () => useDispatch<AppDispatch>();

interface NavThunkApiConfig {
    extra: {
        navigator: Navigator;
        user: UserService
        sessions: SessionService
        goal: GoalService
        schemas: SchemaService
        app: AppService
    };
}
type AsyncThunkOptions = {
    dispatch: AppDispatch;
    state: RootState;
} & NavThunkApiConfig;


export {useAppDispatch, useAppSelector};
export type {RootState, AppDispatch, AsyncThunkOptions, Store};
