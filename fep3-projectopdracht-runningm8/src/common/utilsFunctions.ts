import {UserPosition} from "../store/location/location.types";
import {SessionExercise, TrainingSession} from "../store/session/session.types";
import {LineDataFormat} from "../containers/analysis/analysis.types";
import {t} from "i18next";
import {GoalStorageState} from "../store/goal/goal.reducer";

export function calcDistanceBetweenTwoPoints({lat1, lng1, lat2, lng2}: {lat1: number,lat2: number,lng1: number,lng2: number}) {
    const pi = Math.PI / 180
    const cos = Math.cos

    // this formula comes from stackoverflow. My knowledge of cosinus and such does not go so far.
    // let alone understand what it does. So i copied the code! * Crying in Math T_T *
    // https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
    const a = 0.5 - cos((lat2 - lat1) * pi)/2 +
        cos(lat1 * pi) * cos(lat2 * pi) *
        (1 - cos((lng2 - lng1) * pi))/2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}
export function calcSessionDistance({positions}:{positions:Array<UserPosition>}){
    let distance = 0
    for(let position of positions){
        if(positions.indexOf(position) > 0){
            let pointA = positions.at(positions.indexOf(position)) as UserPosition
            let pointB = positions.at(positions.indexOf(position)-1) as UserPosition
            distance +=  calcDistanceBetweenTwoPoints(
                {lat1:pointA?.coords[0], lng1:pointA?.coords[1],
                    lat2:pointB?.coords[0], lng2:pointB?.coords[1]
                }
            )
        }
    }
    return distance;
}
export function calcSessionAverageDistance({positions}:{positions:Array<UserPosition>}){
    let totalDistance = calcSessionDistance({positions})
    return totalDistance / positions.length
}
export function calcRecordDistance({sessions}: {sessions: Array<TrainingSession>}){
    let total = 0;
    for(let session of sessions){
        if(calcSessionDistance({ positions: session.recordedPositions}) > total){
            total = calcSessionDistance({ positions: session.recordedPositions})
        }
    }
    return total;
}
export function calcTotalDistance({sessions}: {sessions: Array<TrainingSession>}){
    let distance = 0
    for(let session of sessions){
        let positions = session.recordedPositions
        distance += calcSessionDistance({positions})
    }
    return distance;
}


export function calcSessionAverageSpeed({positions}:{positions:Array<UserPosition>}) {
    let avgSpeed = [];
    let totalSpeed = 0;
    for(let position of positions){
        avgSpeed.push(position.speed)
        totalSpeed += position.speed
    }
    return totalSpeed / avgSpeed.length
}
export function calcRecordAvgSpeeds({sessions}: {sessions: Array<TrainingSession>}){
    let total = 0;
    for(let session of sessions){
        let speed = 0;
        let positionCount = 0;
        for(let position of session.recordedPositions){
            speed += position.speed
            positionCount += 1;
        }
        if(speed / positionCount > total){
            total += (speed / positionCount);
        }
    }
    return total
}
export function calcTotalAverageSpeed({sessions}:{sessions:Array<TrainingSession>}) {
    let avgSpeed = [];
    let totalSpeed = 0;
    for(let session of sessions){
        for(let position of session.recordedPositions){
            avgSpeed.push(position.speed)
            totalSpeed += position.speed
        }
    }

    return totalSpeed / avgSpeed.length
}

export function calcExerciseTime(exercises: Array<SessionExercise>){
    let total = 0;
    for(let exercise of exercises){
        total += exercise.exercise.duration
    }
    return total;
}
export function calcTotalExerciseTime({sessions}: {sessions: Array<TrainingSession>}){
    let total = 0;
    for(let session of sessions){
        if(session.schema?.exercisesDone)
        total += calcExerciseTime(session.schema?.exercisesDone as SessionExercise[])
    }
    return total * 60000
}
export function calcTotalExerciseCount({sessions}: {sessions: Array<TrainingSession>}){
    let total = 0;
    for(let session of sessions){
        if(session.schema?.exercisesDone){
            total += session.schema.exercisesDone.length;
        }
    }
    return total;
}
export function calcRecordExerciseTime({sessions}:{sessions:Array<TrainingSession>}){
    let total = 0;
    for(let session of sessions){
        if(session.schema?.exercisesDone){
            let sessionTotal = calcExerciseTime(session.schema?.exercisesDone as SessionExercise[])
            if(sessionTotal > total) total = sessionTotal
        }
    }
    return total * 60000
}
export function calcRecordExerciseCount({sessions}:{sessions:Array<TrainingSession>}){
    let total = 0;
    for(let session of sessions){
        if(session.schema?.exercisesDone){
            if(session.schema.exercisesDone.length > total)
                total = session.schema.exercisesDone.length;
        }
    }
    return total;
}

export function calcSessionTime({session}: {session: TrainingSession}){
    if(session.endPosition && session.startPosition)
        return session.endPosition?.timestamp - session.startPosition?.timestamp;
    else return 0;
}
export function calcRecordTime({sessions}: {sessions: Array<TrainingSession>}){
    let total = 0;
    for(let session of sessions){
        if(session.totalTime && session.totalTime > total){
            total = session.totalTime;
        }
    }
    return total;
}
export function calcTotalTime({sessions}: {sessions: Array<TrainingSession>}){
    let time = 0
    for(let session of sessions){
        if(session.totalTime){
            time += session.totalTime
        }
    }
    return time;
}

export function calcChartData({sessions}: {sessions: Array<TrainingSession>}) {
    let selectedLines = []
    let selectedRadar = [
        {
            exercise: 'walking',
            duration: 0

        },
        {
            exercise: 'pause',
            duration: 0

        },
        {
            exercise: 'jogging',
            duration:0

        },
        {
            exercise: 'running',
            duration: 0

        },
        {
            exercise: 'sprinting',
            duration: 0
        }
    ]
    for(let session of sessions){
        if(session.startPosition){
            selectedLines.push({
                time:( calcSessionTime({session:session}) / 60000),
                speed: calcSessionAverageSpeed({positions: session.recordedPositions}),
                distance: calcSessionDistance({positions: session.recordedPositions}),
                timestamp: new Date(session.startPosition.timestamp as number).toISOString().split("T")[0].substring(5)
            } as LineDataFormat)
        }
        if(session.schema && session.schema.exercisesDone){
            for(let exercise of session.schema.exercisesDone){
                for(let radar of selectedRadar){
                    if(radar.exercise === exercise.exercise.text){
                        radar.duration += exercise.exercise.duration
                    }
                }
            }
        }
    }
    for(let radarLine of selectedRadar){
        radarLine.exercise = t('common:'+radarLine.exercise)
    }
    return {selectedLines, selectedRadar}
}
export function calcWeeklyGoalProgression({sessions, goal}: {sessions: Array<TrainingSession>, goal: GoalStorageState}){
    let weekly = filterWeeklySessions({sessions, date: goal.goalDateSet as number})
    let total = 0;
    if(goal.goalType === 'distance'){
        total += calcTotalDistance({sessions:weekly})
    }else{
        total += calcTotalTime({sessions:weekly}) / 60000
    }
    return total
}
export function filterWeeklySessions({sessions, date}:{sessions: Array<TrainingSession>, date: number}){
    let filteredSessions:Array<TrainingSession> = []
    for(let session of sessions){
        if(session.startPosition && session.startPosition.timestamp){
            if(0 > (session.startPosition.timestamp - date) || (session.startPosition.timestamp - date) > 604800000){
                continue
            }
            filteredSessions.push(session)
        }
    }
    return filteredSessions
}
export function filterSessionsOnDate({sessions, date, timeFrame}:{sessions: Array<TrainingSession>, date: Date, timeFrame: string}){
    let selectedList = []
    // this loop filteres the sessions needed according to the timeframe and selected date.
    for(let session of sessions){
        let sessionDate
        if(session.startPosition){
            sessionDate = new Date(session.startPosition?.timestamp)
            if(timeFrame === 'day'){
                if(sessionDate.getDate() === date.getDate()
                    && sessionDate.getMonth() === date.getMonth()
                    && sessionDate.getFullYear() === date.getFullYear()
                ){
                    selectedList.push(session)
                }
            }else if(timeFrame ==='month'){
                if(sessionDate.getMonth() === date.getMonth()
                    && sessionDate.getFullYear() === date.getFullYear()){
                    selectedList.push(session)
                }
            }else if(timeFrame ==='year'){
                if(sessionDate.getFullYear() === date.getFullYear()){
                    selectedList.push(session)
                }
            }
        }
    }
    return selectedList;
}
export function formatTimeToHumanText(time: number) {
    // calculating the time into a string because the functions return a timestamp either way
    let date = new Date(time)
    //doing - 1 because GMT is butthurt for not being invited.
    let hours = date.getHours() - 1
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    return (hours > 9 ? hours : "0" + hours)+":"+(minutes > 9 ? minutes : "0" + minutes) + ":" + (seconds > 9 ? seconds : "0" + seconds)
}

export function numberInputCheck(num:string){
    let formatted: string;
    formatted = numStringRecursive(num) as string

    return formatted
}
function numStringRecursive(num:string){
    if(num.substring(0,1) === '0'){
        numStringRecursive(num.substring(1))
    }else{
        return num
    }
}
