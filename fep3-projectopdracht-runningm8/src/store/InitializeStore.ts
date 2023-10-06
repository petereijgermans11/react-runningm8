import {configureStore} from '@reduxjs/toolkit';
import {RootReducer} from "./root.reducer";
import {UserService} from "../services/service.user.js";
import {SessionService} from "../services/service.session";
import {GoalService} from "../services/service.goal";
import {SchemaService} from "../services/service.schemas";
import {AppService} from "../services/service.app";
import {AppThunks} from "./app";

export function initializeStore() {
    // Initialize store
    const store = configureStore({
        reducer: RootReducer,
        middleware: getDefaultMiddleware => {
            return getDefaultMiddleware({
                serializableCheck: false,
                thunk: {
                    extraArgument: {
                        navigator: window.navigator,
                        user: new UserService(),
                        sessions: new SessionService(),
                        goal: new GoalService(),
                        schemas: new SchemaService(),
                        app: new AppService()
                    },
                },
            });
        },
    });
    store.dispatch(AppThunks.loadAppSettings())
    return {store}
}
