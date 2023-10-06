import type {RootState} from '../store.types';

const getFirstUse = (state: RootState) => state.app.firstUse
const getAppLanguage = (state: RootState) => state.app.language

const AppSelectors = {
    getFirstUse,
    getAppLanguage
};

export {AppSelectors};
