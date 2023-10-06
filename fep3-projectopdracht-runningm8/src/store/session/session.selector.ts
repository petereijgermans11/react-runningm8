import type {RootState} from '../store.types';
import {
    calcRecordAvgSpeeds,
    calcRecordDistance, calcRecordExerciseCount, calcRecordExerciseTime,
    calcRecordTime,
    calcTotalAverageSpeed,
    calcTotalDistance, calcTotalExerciseCount,
    calcTotalExerciseTime,
    calcTotalTime, filterWeeklySessions
} from "../../common/utilsFunctions";

const getStartLocation = (state: RootState) => state.session.current.startPosition
const getSchema = (state:RootState) => state.session.current.schema
const getEndLocation = (state: RootState) => state.session.current.endPosition
const getRecordedLocations = (state:RootState) => state.session.current.recordedPositions
const getRecordingStatus = (state:RootState) => state.session.current.recording
const getPausedStatus = (state:RootState) => state.session.current.paused
const getTotalTime = (state:RootState) => state.session.current.totalTime
const getAllSessions = (state: RootState) => state.session.allSessions

const getAverageProgress = (state:RootState) => {
    let sessionCount = state.session.allSessions.length
    let time = calcTotalTime({sessions: state.session.allSessions});
    let distance = calcTotalDistance({sessions: state.session.allSessions});
    let speed = calcTotalAverageSpeed({sessions: state.session.allSessions});
    let workoutTime = calcTotalExerciseTime({sessions: state.session.allSessions});
    let workouts = calcTotalExerciseCount({sessions: state.session.allSessions});

    return {
        time: time/sessionCount || 0,
        distance: distance/sessionCount || 0,
        speed: speed/sessionCount || 0,
        workoutTime: workoutTime/sessionCount || 0,
        workouts: workouts/sessionCount || 0
    }
}
const getRecordProgress = (state:RootState) => {
    let time = calcRecordTime({sessions: state.session.allSessions});
    let distance = calcRecordDistance({sessions: state.session.allSessions});
    let speed = calcRecordAvgSpeeds({sessions: state.session.allSessions});
    let workoutTime = calcRecordExerciseTime({sessions: state.session.allSessions});
    let workouts = calcRecordExerciseCount({sessions: state.session.allSessions});

    return {
        time: time || 0,
        distance: distance|| 0,
        speed: speed || 0,
        workoutTime: workoutTime || 0,
        workouts: workouts || 0
    }
}
const getTotalProgress = (state:RootState) => {
    let time = calcTotalTime({sessions: state.session.allSessions});
    let distance = calcTotalDistance({sessions: state.session.allSessions});
    let speed = calcTotalAverageSpeed({sessions: state.session.allSessions});
    let workoutTime = calcTotalExerciseTime({sessions: state.session.allSessions});
    let workouts = calcTotalExerciseCount({sessions: state.session.allSessions});

    return {
        time: time || 0,
        distance: distance || 0,
        speed: speed || 0,
        workoutTime: workoutTime || 0,
        workouts: workouts || 0
    }
}
const getWeeklyProgress = (state:RootState) => {
    let filteredSessions = filterWeeklySessions(
        {sessions: state.session.allSessions,
            date: state.goal.goalDateSet as number
        }
    )
    let time = calcTotalTime({sessions: filteredSessions});
    let distance = calcTotalDistance({sessions: filteredSessions});
    let speed = calcTotalAverageSpeed({sessions: filteredSessions});
    let workoutTime = calcTotalExerciseTime({sessions: filteredSessions});
    let workouts = calcTotalExerciseCount({sessions: filteredSessions});

    return {
        time: time || 0,
        distance: distance || 0,
        speed: speed || 0,
        workoutTime: workoutTime || 0,
        workouts: workouts || 0
    }
}

const SessionSelectors = {
    getSchema,
    getStartLocation,
    getEndLocation,
    getRecordedLocations,
    getRecordingStatus,
    getPausedStatus,
    getTotalTime,
    getAllSessions,
    getAverageProgress,
    getTotalProgress,
    getRecordProgress,
    getWeeklyProgress
};

export {SessionSelectors};
