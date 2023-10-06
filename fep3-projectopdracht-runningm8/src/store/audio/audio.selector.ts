import type {RootState} from '../store.types';

const getAudioMode = (state: RootState) => state.audio.audioOn

const AudioSelectors = {
    getAudioMode,
};

export {AudioSelectors};
