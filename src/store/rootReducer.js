import { combineReducers } from '@reduxjs/toolkit';

import baseReducer from './baseReducer';

const rootReducer = combineReducers({
  base: baseReducer
});

export default rootReducer;
