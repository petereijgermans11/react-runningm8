import type {RootState} from '../store.types';


const getGoal = (state:RootState) => state.goal


const GoalSelectors = {
    getGoal
};

export {GoalSelectors};
