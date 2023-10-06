import {combineReducers} from "redux";
import {StopwatchStorageReducer} from "./stopwatch";
import {LocationStorageReducer} from "./location";
import {SessionStorageReducer} from "./session/session.reducer";
import {AudioStorageReducer} from "./audio/audio.reducer";
import {UserStorageReducer} from "./user";
import {GoalStorageReducer} from "./goal";
import {SchemaStorageReducer} from "./schemas";
import {AppStorageReducer} from "./app";

const RootReducer = combineReducers({
    // theme: ThemeReducer,
    stopwatch: StopwatchStorageReducer,
    location: LocationStorageReducer,
    session: SessionStorageReducer,
    audio: AudioStorageReducer,
    app: AppStorageReducer,
    user: UserStorageReducer,
    goal: GoalStorageReducer,
    schema: SchemaStorageReducer
});

export {RootReducer};
