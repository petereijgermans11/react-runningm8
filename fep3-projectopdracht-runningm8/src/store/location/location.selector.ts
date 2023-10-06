import type {RootState} from '../store.types';

const getWatcher = (state: RootState) => state.location.watcherID
const getCurrentLocation = (state: RootState) => state.location.currentPosition
const getLastLocation = (state: RootState) => state.location.lastPosition

const LocationSelectors = {
    getWatcher,
    getCurrentLocation,
    getLastLocation,
};

export {LocationSelectors};
