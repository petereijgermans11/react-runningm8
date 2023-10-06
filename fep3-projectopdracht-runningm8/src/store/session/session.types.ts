import {UserPosition} from "../location/location.types";
import {Exercise, TrainingSchema} from "../schemas/schema.types";

export interface SessionExercise {
    started?: number
    done?: number
    exercise: Exercise
}
export interface SessionSchema{
    schema: TrainingSchema
    selectedExercise?: SessionExercise
    exercisesDone: Array<SessionExercise>
}
export interface TrainingSession {
    recording: boolean
    paused: boolean
    recordedPositions: Array<UserPosition>
    startPosition: UserPosition | undefined
    endPosition:UserPosition | undefined,
    schema?: SessionSchema
    totalTime: number | undefined
}
export interface SessionStorageState {
    current:TrainingSession
    allSessions: Array<TrainingSession>
}
