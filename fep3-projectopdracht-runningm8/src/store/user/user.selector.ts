import type {RootState} from '../store.types';

const getUser = (state:RootState) => state.user


const UserSelectors = {
    getUser
};

export {UserSelectors};
