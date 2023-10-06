import type {RootState} from '../store.types';

const getTime = (state: RootState) =>{
    let time = state.stopwatch.elapsed
    if(state.stopwatch.breakTime !== 0){
        time -= state.stopwatch.breakTime
    }
    time -= state.stopwatch.start
    return time;
}


const StopwatchSelectors = {
    getTime
};

export {StopwatchSelectors};
