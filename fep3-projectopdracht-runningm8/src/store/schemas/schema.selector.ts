import {RootState} from "../store.types";

const getAll = (state: RootState) => state.schema
const SchemaSelectors = {
    getAll
};

export {SchemaSelectors};
